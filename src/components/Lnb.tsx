import tw from "twin.macro";
import styled from "@emotion/styled/macro";
import { css } from "@emotion/react";
import { useEffect } from "react";

interface LnbProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Lnb = ({ isOpen, setIsOpen }: LnbProps) => {
  return (
    <>
      <Dim isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <LnbWrapper isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <p>LNB 내용이 여기에 들어갑니다.</p>
      </LnbWrapper>
    </>
  );
};

// 나머지 코드는 변경 없음...

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
  //   css`
  //     @keyframes fadeIn {
  //       from {
  //         opacity: 0;
  //       }
  //       to {
  //         opacity: 1;
  //       }
  //     }
  //     @keyframes fadeOut {
  //       from {
  //         opacity: 1;
  //       }
  //       to {
  //         opacity: 0;
  //       }
  //     }
  //     animation: ${isOpen ? "fadeIn" : "fadeOut"} 1s forwards;
  //   `,
]);

interface LnbWrapperProps {
  isOpen: boolean;
}

const LnbWrapper = styled.div<LnbWrapperProps>(({ isOpen }) => [
  tw`
    absolute top-0 left-0 h-screen bg-white z-20
    `,

  css`
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

export default Lnb;
