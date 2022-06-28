import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../app/common/libs/axios';
import { queryClient } from '../app/common/libs/query';
import '../styles/globals.css';

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
