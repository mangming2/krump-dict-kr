import tw from "twin.macro";
import { IconSearch } from "../icons";
import { useEffect, useRef, useState } from "react";
import { useSupaBase } from "../../hooks/use-supa-base";
import { KrumpInformation } from "../../types";
import { useNavigate } from "react-router-dom";

interface SearchProps {
  type: string;
  title: string;
  id: number;
}

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [isDropdown, setIsDropdown] = useState(false);
  const { getAllKrumpWords } = useSupaBase({});
  const [krumpWords, setKrumpWords] = useState<SearchProps[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchDebounceRef = useRef<NodeJS.Timeout | null>(null); // 디바운스를 위한 ref 추가
  const navigate = useNavigate();

  // const dummyData = [
  //   { type: "culture", title: "크럼프 문화", id: 1 },
  //   { type: "dance", title: "크럼프 댄스", id: 2 },
  //   { type: "music", title: "크럼프 음악", id: 3 },
  //   { type: "history", title: "크럼프 역사", id: 4 },
  //   { type: "history", title: "크럼프 역사", id: 5 },
  //   {
  //     type: "history",
  //     title:
  //       "크럼프 역사크럼프 역사크럼프 역사크럼프 역사크럼프 역사크럼프 역사크럼프 역사크럼프 역사",
  //     id: 6,
  //   },
  //   { type: "history", title: "크럼프 역사", id: 7 },
  // ];

  useEffect(() => {
    //   setKrumpWords(dummyData);
    // }, []);

    const fetchData = async () => {
      const data = await getAllKrumpWords();
      data &&
        setKrumpWords(
          data.map((item: KrumpInformation) => ({
            type: item.type,
            title: item.title,
            id: item.id,
          }))
        );
    };
    fetchData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setIsDropdown(false);
    }
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.trim() !== "") {
      // 검색어가 있고, 엔터 키가 눌렸을 때 실행
      const filteredData = krumpWords?.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      if (filteredData.length > 0) {
        // 필터링된 데이터가 있으면 첫 번째 항목으로 이동
        navigate(`/detail/${filteredData[0].type}/${filteredData[0].id}`);
      }
    }
  };

  useEffect(() => {
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current); // 이전 타이머가 있다면 취소
    }
    searchDebounceRef.current = setTimeout(() => {}, 300);
  }, [search]); // search 상태가 변경될 때마다 실행

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
      <InputWrapper>
        <Input
          placeholder="Search"
          value={search}
          onChange={handleSearch}
          onFocus={handleDropdown}
          onKeyDown={handleEnterPress}
        />
        <IconWrapper>
          <IconSearch />
        </IconWrapper>

        {isDropdown && (
          <Dropdown>
            {krumpWords
              ?.filter((item) =>
                item.title.toLowerCase().includes(search.toLowerCase())
              )
              .slice(0, 5).length > 0 ? (
              krumpWords
                .filter((item) =>
                  item.title.toLowerCase().includes(search.toLowerCase())
                )
                .slice(0, 5)
                .map((item) => (
                  <DropdownItem
                    key={item.id}
                    onClick={() => navigate(`/detail/${item.type}/${item.id}`)}
                  >
                    {item.title}
                  </DropdownItem>
                ))
            ) : (
              <DropdownItem>관련된 단어가 없습니다!</DropdownItem>
            )}
          </Dropdown>
        )}
      </InputWrapper>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex items-center
  min-w-200
  bg-white rounded-md
  py-4 border-solid border-2 border-gray-200
`;

const InputWrapper = tw.div`
  flex flex-grow
  relative
`;

const Input = tw.input`
  flex flex-grow
  outline-none
  border-none
  bg-transparent relative
`;

const IconWrapper = tw.div`
  w-20 h-20 absolute right-4 
  flex items-center justify-center
  text-gray-400
`;

const Dropdown = tw.div`
  absolute left-[-2px] top-23
  w-full
  flex flex-col
  bg-white
  border-solid border-2 border-gray-200
  rounded-md
  shadow-lg
  overflow-hidden
`;

const DropdownItem = tw.div`
  p-4
  cursor-pointer
  hover:bg-gray-100
`;
