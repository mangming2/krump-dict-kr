import tw from "twin.macro";
import styled from "@emotion/styled/macro";

interface LnbProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Lnb = ({ isOpen, setIsOpen }: LnbProps) => {
  return (
    <>
      <Dim isOpen={isOpen} onClick={() => setIsOpen(false)}>
        <LnbWrapper isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
          <p>LNB 내용이 여기에 들어갑니다.</p>
        </LnbWrapper>
      </Dim>
    </>
  );
};

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
  tw`absolute top-0 left-0 h-screen bg-white transition-all ease-in-out`,
  isOpen ? tw`w-[300px] translate-x-0` : tw`w-0 translate-x-[-100%]`,
  tw`duration-500`, // 애니메이션 지속 시간을 500ms로 조정
]);

export default Lnb;
