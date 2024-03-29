import tw from "twin.macro";
import { KrumpInformation } from "../../types";
import { IconArrowRight, IconInfo } from "../icons";

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
  createdAt,
  onClick,
}: ContentBoxProps) => {
  return (
    <Wrapper key={key} onClick={onClick}>
      <IconWrapper>
        {hasChildren ? (
          <IconArrowRight width="20" height="20" color="black" />
        ) : (
          <IconInfo width="20" height="20" color="black" />
        )}
      </IconWrapper>

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
        <Review>Reviewed At</Review>
        <CreatedAt>{createdAt}</CreatedAt>
      </FootNoteWrapper>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex flex-col bg-white gap-8
  border-solid border-2 border-gray-200
  p-16 rounded-md cursor-pointer
  hover:(shadow-xl bg-gray-100)
  relative
`;

const IconWrapper = tw.div`
  absolute top-20 right-20 
  w-20 h-20
  flex items-center justify-center
  
`;

const TitleWrapper = tw.div`
  flex gap-12 items-center
`;

const Title = tw.div`
    font-l-b text-black
`;

const DescriptionWrapper = tw.div`
    flex gap-12 items-center
`;

const Description = tw.div`
  font-l-m text-black
  overflow-hidden whitespace-nowrap text-ellipsis
`;

const TextWrapper = tw.div`
    flex flex-col gap-12
`;

const FootNoteWrapper = tw.div`
    flex gap-12 items-center
`;

const FootNote = tw.div`
  text-black
`;

const Review = tw.div`
    font-l-m text-black
`;

const CreatedAt = tw.div`
    font-l-m text-black
`;
