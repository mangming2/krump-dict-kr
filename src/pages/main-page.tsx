import tw from "twin.macro";
import { RouterBox } from "../components/main/router-box";
import { SearchBar } from "../components/main/search-bar";
import { useNavigate } from "react-router-dom";
import LogoImage from "../assets/logo-color.png";
import { useDictTable } from "../hooks/use-dict-table";
import { fetchDictTable } from "../api";

const RouterContents = [
  {
    title: "What is Krump?",
    icon: <span>👼</span>,
    subTitle: "크럼프의 시작과 역사를 알아보세요.",
    path: "/krump",
  },
  {
    title: "크럼프 기본 용어 / 문화",
    icon: <span>💬</span>,
    subTitle: "크럼프 문화의 기본 용어를 알아보세요.",
    path: "/krump-word-culture",
  },
  {
    title: "크럼프 기본 용어 / 댄스",
    icon: <span>🕺🏼</span>,
    subTitle: "크럼프 댄스의 기본 용어를 알아보세요.",
    path: "/krump-word-dance",
  },
  {
    title: "국내 댄서분들의 정리",
    icon: <span>🇰🇷</span>,
    subTitle: "국내 댄서분들의 크럼프 관련 정보 입니다.",
    path: "/krump-tips-domestic",
  },
  // {
  //   title: "해외 댄서분들의 정리",
  //   icon: <span>🌏</span>,
  //   subTitle: "해외 댄서분들의 크럼프 관련 정보 입니다.",
  //   path: "/",
  // },
];

const MainPage = () => {
  const navigate = useNavigate();

  const onClickPath = (path: string) => {
    navigate(path);
  };

  const data = fetchDictTable();
  console.log(data);

  // const { error } = useDictTable();
  // console.log(error);

  return (
    <Wrapper>
      <SearchBar />
      <TitleWrapper>
        <Title>Korea Krump Dictionary</Title>
        <Subtitle>
          크럼프 문화 / 기본 용어 / 댄서분들의 정보를 정리한 사이트입니다.
        </Subtitle>
        <Subtitle>
          오역 및 왜곡된 정보가 있다면 수정 요청 부탁드립니다.
        </Subtitle>
      </TitleWrapper>

      <BoxWrapper>
        {RouterContents.map((content, index) => (
          <RouterBox
            key={index}
            title={content.title}
            icon={content.icon}
            subTitle={content.subTitle}
            onClick={() => onClickPath(content.path)}
          />
        ))}
      </BoxWrapper>

      <LogoWrapper>
        <StyledLogoImage src={LogoImage} alt="logo" />
      </LogoWrapper>

      <ThanksToWrapper>
        <ThanksToTitle>
          많은 단어들을 검수 및 정리를 해주신 분들에게 감사드립니다.
        </ThanksToTitle>
        <ThanksToDescription>
          1차 검수 : Spark / Damage / Groovy
        </ThanksToDescription>
      </ThanksToWrapper>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex flex-1 flex-col bg-white px-32 py-40

`;

const TitleWrapper = tw.div`
  flex flex-center flex-col
  gap-8 p-16
`;

const Title = tw.div`
  font-xxl-b text-black text-center
`;

const Subtitle = tw.div`
  font-xl-m text-gray-500 text-center   
`;

const BoxWrapper = tw.div`
  grid grid-cols-1 gap-8
`;

const LogoWrapper = tw.div`
  flex flex-center
`;

const StyledLogoImage = tw.img`
  w-200 h-200
`;

const ThanksToWrapper = tw.div`
  flex flex-col gap-8 items-center p-16
`;

const ThanksToTitle = tw.div`
  font-xxl-b text-black text-center
`;

const ThanksToDescription = tw.div`
  font-xl-m text-black
`;

export default MainPage;
