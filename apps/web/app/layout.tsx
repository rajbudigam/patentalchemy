import "./globals.css";
import * as React from "react";
export const metadata = { title: "PatentAlchemy", description: "Patent → Passport in minutes" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-sugar">{children}</body>
    </html>
  );
}
