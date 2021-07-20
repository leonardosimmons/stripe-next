

import '../styles';
import '../styles/css/global.css';
import '../styles/css/normalize.css';
import type { AppProps } from 'next/app';


export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
};
