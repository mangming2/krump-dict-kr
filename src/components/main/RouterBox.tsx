import tw from "twin.macro";

interface RouterBoxProps {
  title: string;
  icon: React.ReactNode;
  subTitle: string;
  onClick: () => void;
}

const RouterBox = ({ title, icon, subTitle, onClick }: RouterBoxProps) => {
  return (
    <Wrapper onClick={onClick}>
      <TitleWrapper>
        <Title>{title}</Title>
        <IconWrapper>{icon}</IconWrapper>
      </TitleWrapper>
      <SubTitle>{subTitle}</SubTitle>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex flex-col bg-white gap-8
  border-solid border-2 border-gray-200
  p-16 rounded-md cursor-pointer
  hover:(shadow-xl bg-gray-100)
`;

const TitleWrapper = tw.div`
  flex gap-12 items-center
`;

const Title = tw.div`
    font-xxl-b text-black
`;

const IconWrapper = tw.div`
    
`;

const SubTitle = tw.div`
    font-xl-m text-black
`;

export default RouterBox;
