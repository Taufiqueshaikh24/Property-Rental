import GoogleProvider from 'next-auth/providers/google';
import connectDB from '@/config/db';
import User from '@/models/User';

export const authOptions = {
    providers : [
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID, 
            clientSecret : process.env.GOOGLE_CLIENT_SECRET, 
            // we need this because when we click on login from google account it will give us the options of 
            // which account we have to choose and login with other wise it will take the current logged in account
            authorization:{
                params:{
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ], 
    callbacks: {
        // Invoked on successful sign in 
        async signIn({ profile }){
                // 1. connect to the database 
                await connectDB();
                // 2. check the users exists 
                let userExists = await User.findOne({email: profile.email })
                // 3. if user does not exists then create a user 
                if(!userExists){
                    const username = profile.name.slice(0 , 20 );

                    await User.create({
                        email : profile.email , 
                        username , 
                        image : profile.picture 
                    })
                }   
                // 4. return true to allow the sign in 
                return true ; 
        }, 
        async session({ session }){
            // 1. Get the user from the database
            let user  = await User.findOne({email: session.user.email})
            // 2. Assign the user id to the session 
            session.user.id = user._id.toString();
            // 3. return the session 
            return session ; 
        }
    }
}