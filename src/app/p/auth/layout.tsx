import React from "react";

export const metadata = {
  title: "Authentication",
  description: "Page for authentication",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
