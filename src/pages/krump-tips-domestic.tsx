import { useEffect, useState } from "react";
import { ContentBox } from "../components/main/content-box";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "./loading-page";
import { KrumpInformation } from "../types";
import { useSupaBase } from "../hooks/use-supa-base";
import tw from "twin.macro";

const KrumpTipsDomesticPage = () => {
  const { getKrumpWords } = useSupaBase({ type: "dance" });
  const [contents, setContents] = useState<KrumpInformation[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchKrumpWords = async () => {
      const krumpWordsCulture = (await getKrumpWords()) || [];

      if (id === undefined) {
        setContents(
          krumpWordsCulture.filter((content) => content.parentId === null)
        );
      } else {
        setContents(
          krumpWordsCulture.filter((content) => content.parentId === +id)
        );
      }
    };

    fetchKrumpWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (contents.length === 0) {
    return <LoadingPage />;
  }

  const handleClick = (content: KrumpInformation) => {
    navigate(`/detail/${content.type}/${content.id}`);
  };

  return (
    <Wrapper>
      <Title>Krump Word Culture</Title>

      {contents.map((krumpWord) => (
        <ContentBox
          key={krumpWord.id}
          id={krumpWord.id}
          type={krumpWord.type}
          title={krumpWord.title}
          description={krumpWord.description}
          image={krumpWord.image}
          link={krumpWord.link}
          reviewBy={krumpWord.reviewBy}
          createdAt={krumpWord.createdAt}
          onClick={() => handleClick(krumpWord)}
          hasChildren={krumpWord.childrenId !== null}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex
  flex-col
  gap-12
  px-32 py-40
`;

const Title = tw.div`
  text-2xl
  font-bold
  mb-5
`;

export default KrumpTipsDomesticPage;
