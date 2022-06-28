import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from 'react-toastify';
import { queryClient } from '../app/common/libs/query';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import axios from 'axios';

const toastOptions = {
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true
}

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  axios.interceptors.request.use(request => {
    console.log('Starting Request', JSON.stringify(request, null, 2))
    return request
  })
  
  axios.interceptors.response.use(response => {
    console.log('Response:', JSON.stringify(response, null, 2))
    return response
  })
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer {...toastOptions}/>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp
