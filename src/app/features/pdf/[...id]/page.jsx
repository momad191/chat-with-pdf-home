 
//import PdfUi4 from "../PdfUi4";
 import PdfUi2 from "../PdfUi2";
import { Redis } from '@upstash/redis' 
 


const redis = new Redis({
  url: 'https://suited-finch-58820.upstash.io',
  token: 'AeXEAAIjcDE5OGI2MDc1YTljMDg0MDFkYTZiMTk2MjkyYmRmNzBmM3AxMA',
})
export default async function Page({ params }) {  
    const id = (await params).id

    async function getAllListData(key) {
      const listData = await redis.lrange(key, 0, -1);
      console.log(`Data for key "${key}":`, listData);
      return listData.reverse();
    }
     
  // Usage
  const chat_data = await getAllListData([`${id}`])

 
   return ( 
    <div>
      {/* <PdfUi4 file_id={id}  chat_data={chat_data} />   */}
      <PdfUi2 file_id={id} chat_data={chat_data} />      
    </div>
  );
} 

 