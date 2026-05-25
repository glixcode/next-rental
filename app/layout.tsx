import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MovieDash - Movie Management Dashboard",
  description: "A modern movie management admin dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full">{children}</body>
    </html>
  );
}