// import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from 'next-themes'

import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { useEffect } from 'react';

import Navbar from '../comps/navbar'
export default function App({ Component, pageProps }: AppProps) {

 
  return (
   
    <ThemeProvider >
      <Navbar />
      <Component {...pageProps} />

    </ThemeProvider>
   
    
  )

}
