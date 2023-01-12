// import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from 'next-themes'

import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';
import Navbar from '../comps/navbar';
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [walletAddress,setWalletAddress] = useState();
  const [userName,setUserName]= useState();
  const [provider,setProvider] = useState();
  

  const getAddress =  (address: any,data: any) => {
     setWalletAddress(address);
     
    
    // router.push("/userBlog")
   
    setUserName(data.userName);
    console.log(data.userName,"---OK");
    
  }

  const getProvider = (provider: any) =>{
    setProvider(provider)
  }


 
  return (
   
    <ThemeProvider >
      <Navbar getWallet={getAddress} getProvider={getProvider}  />

      <Component  walletAddress={walletAddress} userName={userName} provider={provider} {...pageProps} />

    </ThemeProvider>
   
    
  )

}
