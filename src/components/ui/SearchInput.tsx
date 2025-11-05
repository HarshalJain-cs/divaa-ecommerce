import React from 'react';
import styled from 'styled-components';

/**
 * SearchInput Component
 *
 * @description Animated search input with focus effects
 * @param {string} placeholder - Placeholder text
 * @param {string} value - Input value
 * @param {Function} onChange - Change handler
 *
 * @example
 * ```tsx
 * <SearchInput
 *   placeholder="Search..."
 *   value={query}
 *   onChange={(e) => setQuery(e.target.value)}
 * />
 * ```
 */
interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  value,
  onChange
}) => {
  return (
    <StyledWrapper>
      <input
        className="input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type="text"
      />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .input {
    border: 2px solid transparent;
    width: 15em;
    height: 2.5em;
    padding-left: 0.8em;
    outline: none;
    overflow: hidden;
    background-color: #F3F3F3;
    border-radius: 10px;
    transition: all 0.5s;
  }

  .input:hover,
  .input:focus {
    border: 2px solid #4A9DEC;
    box-shadow: 0px 0px 0px 7px rgb(74, 157, 236, 20%);
    background-color: white;
  }
`;

export default SearchInput;
