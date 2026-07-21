import type { Metadata } from "next";
import "../src/styles/index.css";
import { appConfig } from "@/lib/app-config";

export const metadata: Metadata = {
  title: appConfig.productName,
  description: "Bangladesh-focused life management platform.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
