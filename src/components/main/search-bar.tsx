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
  useEffect(() => {
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
  useEffect(() => {
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current); // 이전 타이머가 있다면 취소
    }
    searchDebounceRef.current = setTimeout(() => {
      // 사용자 입력 후 300ms 후에 실행
      // 여기에 검색 로직을 추가
      console.log("검색 실행: ", search);
    }, 300);
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
        />
        <IconWrapper>
          <IconSearch />
        </IconWrapper>
      </InputWrapper>
      {isDropdown && (
        <Dropdown>
          {krumpWords
            .filter((item) =>
              item.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((item) => (
              <DropdownItem
                key={item.id}
                onClick={() => navigate(`/detail/${item.type}/${item.id}`)}
              >
                {item.title}
              </DropdownItem> // key 추가
            ))}
        </Dropdown>
      )}
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex items-center
  min-w-200
  bg-white rounded-md
  p-4 border-solid border-2 border-gray-200
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
  absolute top-70 left-32
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
