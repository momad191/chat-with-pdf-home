import Navbar from "@/components/navbar" 
import Home from "@/components/Home" 

import { auth } from "@/auth";
 
  
export default async function Page() {

  
  const session = await auth();
  return (
    <>
    <Navbar session={session} />

    <Home session={session} /> 
     
 
    </>
    
  );
}