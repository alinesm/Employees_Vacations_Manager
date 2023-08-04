import Image from "next/image";
import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Employee Vacation's Management",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="body">
        <Image
          src="/images/wmlogo.png"
          width={200}
          height={200}
          alt="loader"
          className="object-contain"
        />
        <main className="app">{children}</main>
      </body>
    </html>
  );
}
