import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { KrumpInformation } from "../types";
import tw from "twin.macro";
import { useSupaBase } from "../hooks/use-supa-base";
import LoadingPage from "./loading-page";

const DetailPage = () => {
  const navigate = useNavigate();
  const { type, id } = useParams();
  const [contents, setContents] = useState<KrumpInformation>();

  const { getKrumpWordDetail } = useSupaBase({
    type: type,
    id: id ? +id : undefined,
  });

  useEffect(() => {
    const fetchKrumpWordDetail = async () => {
      const krumpWordDetail = (await getKrumpWordDetail()) || [];

      if (id === undefined) {
        navigate("/");
      } else {
        setContents(krumpWordDetail[0]);
      }
    };

    fetchKrumpWordDetail();
  }, [id, getKrumpWordDetail, navigate]);

  if (!contents) {
    return <LoadingPage />;
  }

  return (
    <Wrapper key={contents?.id}>
      <StyledImage src={contents?.image} alt={contents?.title} />

      <TextWrapper>
        <TitleWrapper>
          <Title>{contents?.title}</Title>
        </TitleWrapper>
        <DescriptionWrapper>
          <Description>{contents?.description}</Description>
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

const StyledImage = tw.img`
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

export default DetailPage;
