import tw from "twin.macro";
import NoImage from "../../assets/no-image.jpeg";
import Logo from "../../assets/logo-color.png";

const NoImageBox = () => {
  const onClickLink = () => {
    window.open("https://open.kakao.com/o/g7wwn2Wf", "_blank");
  };
  return (
    <Wrapper>
      <TextWrapper>
        <Title>
          현재 단어에 대한 이미지가 없습니다. <br />
          추가 요청은 톡방에 남겨주세요.
        </Title>
        <StyledButton onClick={onClickLink}>
          <LogoImage src={Logo} alt={""} />
          톡방에서 요청하기
        </StyledButton>
      </TextWrapper>
      <StyledImage src={NoImage} alt={""} />
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex flex-col 
`;

const StyledImage = tw.img`
  w-300
`;

const TextWrapper = tw.div`
  bg-gray-200 w-300
  flex items-center
  justify-center p-4
`;

const Title = tw.div`
  font-m-b w-230
`;

const StyledButton = tw.button`
  flex items-center
  w-70 font-xxs-b
  p-3
  rounded-md
`;

const LogoImage = tw.img`
  w-20 h-20
`;

export default NoImageBox;
