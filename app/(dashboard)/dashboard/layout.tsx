import "@/app/globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import Footer from "@/components/globals/footer";
import { TailwindIndicator } from "@/components/globals/tailwind-indicator";
import AuthProvider from "@/components/providers/auth";
import ModalProvider from "@/components/providers/modal";
import { QueryProvider } from "@/components/providers/query";
import { ThemeProvider } from "@/components/providers/theme";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/constant";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/favicon/site.webmanifest",
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/assets/og.png`,
        width: 3000,
        height: 1000,
        alt: SITE_DESCRIPTION,
      },
    ],
  },
  openGraph: {
    url: SITE_URL,
    type: "website",
    title: SITE_TITLE,
    siteName: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en-US",
    images: [
      {
        url: `${SITE_URL}/assets/og.png`,
        width: 3000,
        height: 1000,
        alt: SITE_DESCRIPTION,
        type: "image/png",
      },
    ],
  },
  icons: {
    icon: "/favicon/favicon.svg",
    shortcut: "/favicon/favicon.svg",
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon/favicon-16x16.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon/favicon-32x32.png",
      },
    ],
  },
};
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AuthProvider>
                <div className="">
                  <SidebarProvider>
                    <Suspense fallback={null}>
                      <AppSidebar />
                    </Suspense>
                    <div className="flex-1">
                      {children}
                    </div>
                  </SidebarProvider>
                  {/* <Footer /> */}
                  <ModalProvider/>
                  <TailwindIndicator />
                </div>
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
