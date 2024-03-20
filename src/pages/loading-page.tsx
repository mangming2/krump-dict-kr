import tw from "twin.macro";
import Logo from "../assets/logo-color.png";

export const LoadingPage = () => {
  return (
    <Wrapper>
      <ErrorBox>
        <LogoImg src={Logo} alt="logo" />
        <ErrorText>
          로딩중입니다.
          <br />
          잠시만 기다려주세요😀
        </ErrorText>
      </ErrorBox>
    </Wrapper>
  );
};

export default LoadingPage;

const Wrapper = tw.div`
  w-screen h-screen
  flex-center relative
  bg-gray-400
`;

const ErrorBox = tw.div`
  absolute absolute-center w-full h-full flex-center flex-col
`;

const LogoImg = tw.img`
  w-300 h-300 animate-bounce
`;

const ErrorText = tw.div`
 w-200 font-xxl-b text-white text-center
`;
