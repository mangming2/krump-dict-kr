import tw from "twin.macro";
import Logo from "../assets/logo-color.png";
import { IconHambuger } from "./icons";
import Lnb from "./Lnb";

const Header = () => {
  return (
    <Wrapper>
      <Lnb />
      <IconWrapper>
        <IconHambuger />
      </IconWrapper>
      <LogoImg src={Logo} alt="logo" />
      <Title>Korea Krump Dictionary</Title>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex
  h-60 bg-white 
  px-16 py-8
  gap-12 items-center
  border-solid border-x-0 border-t-0 border-b-2 border-gray-200
`;

const IconWrapper = tw.div`
  flex-center cursor-pointer
`;

const LogoImg = tw.img`
  w-40 h-40
`;

const Title = tw.h1`
  font-xxl-b text-black
`;

export default Header;
