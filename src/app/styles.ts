import styled from "styled-components";

export const Header = styled.header`
  background-color: #e68a00;
  color: white;
  padding: 20px;
`;

export const Title = styled.h1`
  text-align: left;
`;

export const Navbar = styled.nav`
  padding: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 20px;
  font-weight: bold;
`;

export const NavLink = styled.a`
  color: black;
  text-decoration: none;
`;

export const CadastroLink = styled(NavLink)`
  color: #fff;
`;

export const Texto = styled.p`
  padding: 20px;
  font-weight: bold;
`;

export const Main = styled.main`
  background-color: #fdfdfd;
`;

export const Footer = styled.footer`
  background-color: #ffddba;
`;

export const FooterNav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
`;

export const FooterTitle = styled.h2`
  margin-top: 20px;
`;

export const SocialMediaIcon = styled.img`
  width: 30px;
  height: 30px;
  margin: 5px;
`;
