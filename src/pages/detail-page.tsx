/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { KrumpInformation } from "../types";
import tw from "twin.macro";
import { useSupaBase } from "../hooks/use-supa-base";
import LoadingPage from "./loading-page";
import { ContentBox } from "../components/main/content-box";
import NoImageBox from "../components/main/no-image-box";

const DetailPage = () => {
  const navigate = useNavigate();
  const { type, id } = useParams();
  const [contents, setContents] = useState<KrumpInformation>();

  const [childContents, setChildContents] = useState<KrumpInformation[]>();

  const { getKrumpWordDetail, getChildrenWordsById } = useSupaBase({
    type: type,
    id: id ? +id : undefined,
  });

  const handleClick = (content: KrumpInformation) => {
    navigate(`/detail/${content.type}/${content.id}`);
  };

  useEffect(() => {
    const fetchKrumpWordDetail = async () => {
      const krumpWordDetail = (await getKrumpWordDetail()) || [];

      if (id === undefined) {
        navigate("/");
      } else {
        setContents(krumpWordDetail[0]);
        setChildContents([]);
      }
    };

    fetchKrumpWordDetail();
  }, [id, navigate]);

  useEffect(() => {
    if (contents?.childrenId && contents.childrenId.length > 0) {
      const childDetailsPromises = contents.childrenId.map(
        async (childId: number) => {
          return await getChildrenWordsById(childId);
        }
      );
      Promise.all(childDetailsPromises).then((childDetails) =>
        setChildContents(childDetails.flat())
      );
    }
  }, [contents]);

  if (!contents) {
    return <LoadingPage />;
  }

  return (
    <>
      <Wrapper key={contents?.id}>
        <ImageWrapper>
          {contents?.image ? (
            <StyledImage src={contents?.image} alt={contents?.title} />
          ) : (
            <NoImageBox />
          )}
        </ImageWrapper>
        <TextWrapper>
          <TitleWrapper>
            <Title>{contents?.title}</Title>
          </TitleWrapper>
          <DescriptionWrapper>
            <Description>{contents?.description}</Description>
          </DescriptionWrapper>
        </TextWrapper>

        <LinkWrapper>
          <LinkTitle>관련 링크</LinkTitle>
          <LinkDescription
            onClick={() => window.open(contents?.link, "_blank")}
          >
            {contents?.link}
          </LinkDescription>
        </LinkWrapper>

        <FootNoteWrapper>
          <FootNote>📌</FootNote>
          <Review>Reviewed At</Review>
          <CreatedAt>{contents?.createdAt}</CreatedAt>
        </FootNoteWrapper>
      </Wrapper>
      {childContents &&
        childContents.map((child) => (
          <ContentBox
            key={child.id}
            id={child.id}
            type={child.type}
            title={child.title}
            description={child.description}
            image={child.image}
            link={child.link}
            onClick={() => handleClick(child)}
            reviewBy={child.reviewBy}
            createdAt={child.createdAt}
            hasChildren={child.childrenId !== null}
          />
        ))}
    </>
  );
};

const Wrapper = tw.div`
  flex flex-col bg-white gap-16
  border-solid border-2 border-gray-200
  p-16 rounded-md
`;

const ImageWrapper = tw.div`
  flex gap-12 items-center justify-center
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
  flex gap-12 items-center px-12
`;

const Description = tw.div`
  font-xl-m text-black
  whitespace-pre-line
`;

const TextWrapper = tw.div`
  flex flex-col gap-12
`;

const LinkWrapper = tw.div`
    flex gap-12 items-center
`;

const LinkTitle = tw.div`
    font-xl-m text-black
`;

const LinkDescription = tw.a`
    font-l-m text-black
    overflow-hidden whitespace-nowrap text-ellipsis
`;

const FootNoteWrapper = tw.div`
    flex gap-12 items-center
`;

const FootNote = tw.div`
    font-xl-m text-black
`;

const Review = tw.div`
    font-l-m text-black
`;

const CreatedAt = tw.div`
    font-l-m text-black
`;

export default DetailPage;
