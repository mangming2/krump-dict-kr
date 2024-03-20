import { useEffect, useState } from "react";
import { ContentBox } from "../components/main/content-box";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "./loading-page";
import { KrumpInformation } from "../types";
import { useSupaBase } from "../hooks/use-supa-base";

const KrumpWordCulturePage = () => {
  const { getKrumpWords } = useSupaBase({ type: "culture" });
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
  }, [id, getKrumpWords]);

  if (!contents) {
    return <LoadingPage />;
  }

  const handleClick = (content: KrumpInformation) => {
    if (content.childrenId === null) {
      navigate(`/detail/${content.type}/${content.id}`);
    } else {
      navigate(`/krump-word-culture/${content.id}`);
    }
  };

  return (
    <div>
      <h1>Krump Word Culture</h1>

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
    </div>
  );
};

export default KrumpWordCulturePage;
