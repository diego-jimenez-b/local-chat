import { useRef } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  border: 2px solid black;
  border-radius: 5px;
  margin: 5px 0 10px;
  padding: 5px 10px;
  display: block;
`;

interface SearchInputProps {
  placeholder: string;
  onUserInput: (input: string) => void;
}

const SearchInput = ({ placeholder, onUserInput }: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const inputChangeHandler = () => {
    onUserInput(inputRef.current!.value);
  };

  return (
    <Input
      type='text'
      ref={inputRef}
      onChange={inputChangeHandler}
      placeholder={placeholder}
    />
  );
};

export default SearchInput;
