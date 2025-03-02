import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import { Index } from "@upstash/vector"
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import md5 from "md5";
import { 
  Document,  
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { getEmbeddings } from "./embeddings";
import { convertToAscii } from "./utils";
import { auth } from "@/auth";

export const getPineconeClient = () => {
  return new Pinecone({
    // environment: process.env.PINECONE_ENVIRONMENT!,
    apiKey: process.env.PINECONE_API_KEY!,
  });
};

// const upstashIndex = new Index({
//   url: "https://outgoing-cod-10155-us1-vector.upstash.io",
//   token: "ABYFMG91dGdvaW5nLWNvZC0xMDE1NS11czFhZG1pbk5EUTNZMlExWkRrdE5EYzJNUzAwWWpkakxXRTBaV0l0Tm1KbFlXRTBOR0k0TUdGaQ==",
// })
 
type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
}; 
    
export async function loadS3IntoPineconePDF(fileKey: string) {
 const session = await auth();

  // 1. obtain the pdf -> downlaod and read from pdf
  console.log("downloading s3 into file system");

  const file_name = `\public/uploads/${session?.user?.email}/${fileKey}`;
  if (!file_name) {
    throw new Error("could not download the file ");
  }
  console.log("loading pdf into memory" + file_name);
  const loader = new PDFLoader(file_name); 
  
  const pages = (await loader.load()) as PDFPage[];

  // 2. split and segment the pdf
  const documents = await Promise.all(pages.map(prepareDocument));

  // 3. vectorise and embed individual documents
  const vectors = await Promise.all(documents.flat().map(embedDocument));

 
  // 4. upload to pinecone
  const client = await getPineconeClient();
  const pineconeIndex = await client.index("chatpdf");
  const namespace = pineconeIndex.namespace(convertToAscii(fileKey));
  await namespace.upsert(vectors);
  console.log("inserted vectors into pinecone");

   // 4. upload to upstash
  //  await upstashIndex.upsert(vectors);
  //  console.log("inserted vectors into upstash");

  return documents[0];
}
  
async function embedDocument(doc: Document) {
  try {
    const embeddings = await getEmbeddings(doc.pageContent);
    const hash = md5(doc.pageContent);

    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    } as any;
  } catch (error) {
    console.log("error embedding document", error);
    throw error;
  }
}
 
export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

async function prepareDocument(page: PDFPage) {
  let { pageContent, metadata } = page;
  pageContent = pageContent.replace(/\n/g, "");
  // split the docs
  // const splitter = new RecursiveCharacterTextSplitter();
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: pageContent,
      },
    }),
  ]);
  return docs;
}