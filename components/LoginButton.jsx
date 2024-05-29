import { signIn , signOut , useSession , getProviders } from 'next-auth/react';
import { useState , useEffect } from 'react';
import { FaGoogle } from 'react-icons/fa';


const LoginButton = () => {

    const { data : session } = useSession();
    const [providers , setProviders] = useState();
    useEffect(() => {
        const setAuthProvider = async () => {
             const res = await getProviders()
             setProviders(res);
        }
        setAuthProvider()
    },[])
        return (
            <>
            { !session && providers && Object.values(providers).map((provider , index) => (
                <div key={index} className='container py-10 px-10 mx-0 min-w-full flex flex-col items-center'>
                <button onClick={() => signIn(provider.id)}    className='flex items-center text-white bg-green-700 hover:bg-green-600 hover:text-white rounded-md px-3 py-2 my-4'>
                <FaGoogle  className='text-white mr-2' />
                <span>Login or Register</span>
              </button>
                </div>
          ))}
          </>
        )
};
export default LoginButton;