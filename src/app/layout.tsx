import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: '--font-dm-sans'
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: '--font-space-grotesk'
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pureplanet.net.au';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Pure Planet | Solar & Energy Solutions",
    template: "%s | Pure Planet"
  },
  description: "Customized Solar & Energy Solutions for Every Melbourne Home. Get expert advice on solar panels, batteries, and heat pumps.",
  keywords: ["solar panels", "home battery", "heat pumps", "energy solutions", "Melbourne solar", "solar rebate victoria"],
  authors: [{ name: "Pure Planet Team" }],
  creator: "Pure Planet",
  publisher: "Pure Planet",
  verification: {
    google: "77n3_X_i6jb7Yb-DNorc-CyYyAqH-H1u7JbzSF5IHm0",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Pure Planet | Solar & Energy Solutions",
    description: "Customized Solar & Energy Solutions for Every Melbourne Home",
    url: baseUrl,
    siteName: "Pure Planet",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pure Planet | Solar & Energy Solutions",
    description: "Customized Solar & Energy Solutions for Every Melbourne Home",
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${spaceGrotesk.variable} antialiased font-sans bg-white text-secondary`}>
        {/* We might need to conditionally render Header/Footer if we are completely redesigning. 
            For now, let's assume the page handles its own layout or we replace these components later. 
            To be safe and match the design exactly, I will comment them out here and include them in the page
            OR I will update them. Let's keep them and see. actually, the design has a header. 
            Ill assume the existing header component needs to be updated or replaced. */}
        {children}
      </body>
    </html>
  );
}
