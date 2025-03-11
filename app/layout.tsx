
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { Roboto } from 'next/font/google';

import { StyledRoot } from './StyledRoot';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

 export default function RootLayout(props: any) {
   const { children } = props;
   return (
     <html lang="en">
      <title>Statuere</title>
      <body className={roboto.variable}>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <AppRouterCacheProvider>
      <CssBaseline />
           <StyledRoot>{children}</StyledRoot>
        </AppRouterCacheProvider>
       </body>
     </html>
   );
 }
