'use client';
import PropertyForm from "@/components/PropertyForm";
import { useSession, getSession } from "next-auth/react"
import LoginButton from "@/components/LoginButton";

const addProperty = ( ) => {
  const { data : session} = useSession();

  if(session){
    return (
      <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div
          className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
         <PropertyForm />
        </div>
      </div>
    </section>

     )
  }else{
        return (
             <LoginButton />
        )
  }
    
}

export default addProperty; 