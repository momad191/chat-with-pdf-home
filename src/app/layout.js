import { Inter } from "next/font/google";

import "./globals.css";

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   icons: {
//     icon: "/chatbot.png",
//     apple: "/chatbot.png",
//   },
//   title: "FaizBot Ai solutions for productivity",
//   description: "Ai solutions for productivity",
// };

export const metadata = {
  title: "FaizBot Ai solutions for productivity",

  icons: "/chatbot.png", // Update with your icon path
};

export default async function RootLayout({ children }) {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
