import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';
import '../styles/global.css';

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <AppCacheProvider {...props}>
      <Head>
        <title>Statuere</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
        <CssBaseline />
        <Component {...pageProps} />
    </AppCacheProvider>
  );
}