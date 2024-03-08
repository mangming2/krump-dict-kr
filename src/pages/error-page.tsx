import tw from "twin.macro";
import Logo from "../assets/logo-color.png";

export const ErrorPage = () => {
  return (
    <Wrapper>
      <ErrorBox>
        <LogoImg src={Logo} alt="logo" />
        <ErrorText>
          Please use a Mobile device to access this Service.
        </ErrorText>
      </ErrorBox>
    </Wrapper>
  );
};

export default ErrorPage;

const Wrapper = tw.div`
  w-screen h-screen
  flex-center bg-white relative
`;

const ErrorBox = tw.div`
  absolute absolute-center w-full h-full flex-center flex-col
`;

const LogoImg = tw.img`
  w-300 h-300
`;

const ErrorText = tw.div`
 w-200 font-xxl-b text-black text-center
`;
