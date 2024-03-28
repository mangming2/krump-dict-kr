import tw from "twin.macro";
import styled from "@emotion/styled/macro";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

interface LnbProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const LnbBox = ({ isOpen, setIsOpen }: LnbProps) => {
  const navigate = useNavigate();

  const menus = [
    { name: "Main", path: "/" }, // Add "main" menu
    { name: "What is Krump?", path: "/krump" },
    { name: "krump Words - Dance", path: "/krump-word-dance" },
    { name: "krump Words - Culture", path: "/krump-word-culture" },
    { name: "krump Tips - Domestic", path: "/krump-tips-domestic" },
  ];

  const onClickPath = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <Wrapper>
      <Dim isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <LnbWrapper isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
          <Title>Korea Krump Dictionary</Title>
          {menus.map((menu) => (
            <NavigationItem
              key={menu.name}
              onClick={() => onClickPath(menu.path)}
              path={menu.path === window.location.pathname}
            >
              {menu.name}
            </NavigationItem>
          ))}
        </LnbWrapper>
      )}
    </Wrapper>
  );
};

// 나머지 코드는 변경 없음...
const Wrapper = tw.div`
 w-full h-full
  `;

interface DimProps {
  isOpen: boolean;
}

const Dim = styled.div<DimProps>(({ isOpen }) => [
  tw`
  w-screen h-screen
  bg-black bg-opacity-50
  fixed top-0 left-0
  z-10
  flex-center
`,
  isOpen ? tw`block` : tw`hidden`,
]);

interface LnbWrapperProps {
  isOpen: boolean;
}

const LnbWrapper = styled.div<LnbWrapperProps>(({ isOpen }) => [
  tw`
  flex flex-col gap-8 h-screen
  absolute top-0 left-0 bg-white z-20
  p-16
  `,
  css`
    width: 50%;
    @keyframes slideIn {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(0);
      }
    }
    @keyframes slideOut {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-100%);
      }
    }
    animation: ${isOpen ? "slideIn" : "slideOut"} 0.5s forwards;
  `,
]);

const Title = tw.div`
  font-xxl-b text-black
`;

interface NavigationItemProps {
  path: boolean;
}

const NavigationItem = styled.div<NavigationItemProps>((path) => [
  tw`
  cursor-pointer font-m-b
  `,
  css`
    &:hover {
      background-color: #f5f5f5;
      color: #333;
    }
  `,
  path.path ? tw`text-red-400` : tw`text-black`,
]);
