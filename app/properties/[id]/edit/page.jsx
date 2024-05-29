"use client";
import PropertyEditForm from "@/components/PropertyEditForm"
import { useSession } from "next-auth/react"
import LoginButton from "@/components/LoginButton"

export default function PropertyEditPage(){

     const { data : session } = useSession();

    if(session){
        return (
          <section className="bg-blue-50">
          <div className="container m-auto max-w-2xl py-24">
            <div
              className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
             <PropertyEditForm />
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