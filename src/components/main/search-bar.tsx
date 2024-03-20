import tw from "twin.macro";
import { IconSearch } from "../icons";
import { useState } from "react";

const dummy = ["What is Krump?", "Krump Word Culture", "Krump Word Dance"];

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [isDropdown, setIsDropdown] = useState(false);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
  };
  return (
    <Wrapper>
      <Input
        placeholder="Search"
        value={search}
        onChange={handleSearch}
        onFocus={handleDropdown}
      />
      <IconWrapper>
        <IconSearch />
      </IconWrapper>
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
  bg-white rounded-md
  p-4 border-solid border-2 border-gray-200
`;

const Input = tw.input`
  w-300
  outline-none
  border-none
  bg-transparent
`;

const IconWrapper = tw.div`
  w-20 h-20 
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
