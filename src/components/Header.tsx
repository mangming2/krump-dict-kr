import tw from "twin.macro";
import Logo from "../assets/logo-color.png";
import { IconHambuger } from "./icons";
import { useEffect, useRef, useState } from "react";
import { Lnb } from "./lnb";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  const wrapperRef = useRef<HTMLDivElement>(null); // Ref for the wrapper
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Close LNB if click is outside
      }
    }

    // Add click event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
  return (
    <Wrapper>
      <LnbWrapper ref={wrapperRef}>
        <Lnb isOpen={isOpen} setIsOpen={setIsOpen} />
      </LnbWrapper>
      <IconWrapper onClick={handleOpen}>
        <IconHambuger />
      </IconWrapper>
      <LogoImg src={Logo} alt="logo" onClick={() => navigate("/")} />
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

const LnbWrapper = tw.div`
  transition-all duration-1000
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
