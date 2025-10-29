import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Purple SaaS",
  description: "Analytics, Chatting & Marketing for creators",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
