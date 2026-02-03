// src/app/feed/layout.tsx
import Container from "@/src/components/Container";
import LatestNew from "@/src/components/LatestNews";
import UserHeader from "@/src/components/User/UserHeader";
import { ReactNode } from "react";
// Supondo que você criou esse componente

interface FeedLayoutProps {
  children: ReactNode;
}

export default function FeedLayout({ children }: FeedLayoutProps) {
  return (
    <div className="min-h-screen ">
      <UserHeader />
      <Container>
        <main className="container mx-auto p-4">{children}</main>
      </Container>
    </div>
  );
}
