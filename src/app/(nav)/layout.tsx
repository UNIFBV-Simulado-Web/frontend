"use client";

import { useAuthStore } from "@/store/authStore";
import {
  GlobalStyle,
  HeaderContent,
  Logo,
  Nav,
  SignUpButton,
  StyledHeader,
} from "../styles";
import Link from "next/link";
import { Toaster } from "@/components/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, logout } = useAuthStore();

  return (
    <>
      <GlobalStyle />
      <Toaster />
      <StyledHeader>
        <HeaderContent>
          <Link href={"/home"}>
            <Logo>
              Quiz <span className="text-yellow-400">Aprende+</span>
            </Logo>
          </Link>
          <Nav>
            {user ? (
              <>
                Olá, {user?.nomeCompleto}!<Link href="/home">Menu</Link>
                <Link href="/historico">Histórico</Link>
                <a style={{ cursor: "pointer" }} onClick={() => logout()}>
                  Logout
                </a>
              </>
            ) : (
              <>
                <Link href="/login">Login</Link>
                <Link href={"/register"}>
                  <SignUpButton>Cadastre-se</SignUpButton>
                </Link>
              </>
            )}
          </Nav>
        </HeaderContent>
      </StyledHeader>
      {children}
    </>
  );
}
