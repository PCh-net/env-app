import type { Metadata } from "next";
import { Inter, Russo_One } from "next/font/google";
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

const inter = Inter({ subsets: ["latin"] });
const russo_one = Russo_One({ weight: ['400'],subsets: ['latin'] });

export const metadata: Metadata = {
  title: "envapp",
  description: "Next app by PCh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <html lang="en">
        <body className={russo_one.className}>{children}</body>
      </html>
    </ThemeProvider>
  );
}
