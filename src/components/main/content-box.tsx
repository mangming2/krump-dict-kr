import tw from "twin.macro";
import { KrumpInformation } from "../../types";
import { IconArrowRight } from "../icons";

interface ContentBoxProps extends KrumpInformation {
  key: number;
  hasChildren: boolean;
  onClick: () => void;
}

export const ContentBox = ({
  key,
  hasChildren,
  title,
  description,
  onClick,
}: ContentBoxProps) => {
  return (
    <Wrapper key={key} onClick={onClick}>
      {!hasChildren && (
        <IconWrapper>
          <IconArrowRight />
        </IconWrapper>
      )}
      <StyledImage />

      <TextWrapper>
        <TitleWrapper>
          <Title>{title}</Title>
        </TitleWrapper>
        <DescriptionWrapper>
          <Description>{description}</Description>
        </DescriptionWrapper>
      </TextWrapper>

      <FootNoteWrapper>
        <FootNote>📌</FootNote>
        <Review>리뷰</Review>
        <CreatedAt>2021.10.10</CreatedAt>
      </FootNoteWrapper>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex flex-col bg-white gap-8
  border-solid border-2 border-gray-200
  p-16 rounded-md cursor-pointer
  hover:(shadow-xl bg-gray-100)
`;

const IconWrapper = tw.div`
  w-20 h-20 
  flex items-center justify-center
  text-gray-400
`;

const StyledImage = tw.div`
  w-300 h-300 bg-gray-200
`;

const TitleWrapper = tw.div`
  flex gap-12 items-center
`;

const Title = tw.div`
    font-xxl-b text-black
`;

const DescriptionWrapper = tw.div`
    flex gap-12 items-center
`;

const Description = tw.div`
    font-xl-m text-black
`;

const TextWrapper = tw.div`
    flex flex-col
`;

const FootNoteWrapper = tw.div`
    flex gap-12 items-center
`;

const FootNote = tw.div`
    font-xl-m text-black
`;

const Review = tw.div`
    font-xl-m text-black
`;

const CreatedAt = tw.div`
    font-xl-m text-black
`;
