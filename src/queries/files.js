import { File } from "@/model/file-model";

export async function createFile(file) {
  try{
    await File.create(file);
  } catch(e){
    throw new Error(e)
  }
}