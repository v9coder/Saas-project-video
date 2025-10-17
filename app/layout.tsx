// import "./globals.css";
// import { Inter } from "next/font/google";
// import Providers from "./components/Providers";
// import Header from "./components/Header";
// import { NotificationProvider } from "./components/Notification"; // ✅ import this

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "ImageKit Next.js Integration",
//   description: "Demo of ImageKit integration with Next.js",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <Providers>
//           <NotificationProvider>   {/* ✅ wrap everything */}
//             <Header />
//             <main className="container mx-auto px-4 py-8">{children}</main>
//           </NotificationProvider>
//         </Providers>
//       </body>
//     </html>
//   );
// }
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./components/Providers";
import { NotificationProvider } from "./components/Notification";
import ClientHeader from "./components/ClientHeader"; // new wrapper

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Video Upload Platform | ImageKit Integration",
  description:
    "Upload, manage, and stream videos seamlessly using ImageKit + Next.js.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo2.jpg" />
      </head>
      <body className={`${inter.className} bg-[#0f0f0f] text-white`}>
        <Providers>
          <NotificationProvider>
            <ClientHeader /> 
            <main className="max-w-screen-xl mx-auto px-4 py-6 min-h-screen">
              {children}
            </main>
          </NotificationProvider>
        </Providers>
      </body>
    </html>
  );
}
