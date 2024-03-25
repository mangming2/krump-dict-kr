import tw from "twin.macro";
import { IconSearch } from "../icons";
import { useEffect, useRef, useState } from "react";

const dummy = ["What is Krump?", "Krump Word Culture", "Krump Word Dance"];

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [isDropdown, setIsDropdown] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

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
          {dummy
            .filter((item) => item.toLowerCase().includes(search.toLowerCase()))
            .map((item) => (
              <DropdownItem key={item}>{item}</DropdownItem> // key 추가
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
