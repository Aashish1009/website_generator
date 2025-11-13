"use client";

import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {userDetailContext} from "../context/UserDetailcontext"

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userDetail,setUserDetail] = useState<any>();
  const user = useUser();

   useEffect(()=>{
    user &&createNewUser();
   },[user])

    const createNewUser = async () =>{
           const result = await axios.post('/api/users',{});
           console.log(result.data);

    }

  return (
    <div>
      <userDetailContext.Provider value={{userDetail,setUserDetail}}>
     {children} 
     </userDetailContext.Provider>
    </div>
  )
}

export default Provider
