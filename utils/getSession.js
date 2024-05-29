import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOption";


export const getSession = async  () => {
     try {
        const session = await getServerSession(authOptions);

        if(!session || !session.user){
             return null;
        }
        return {
            user: session.user, 
            userId : session.user.id
        }
     } catch (error) {
        console.error(error);
        return null; 
     }
}
