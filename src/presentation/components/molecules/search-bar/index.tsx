// src/presentation/components/molecules/search-bar/index.tsx
import React, { useCallback, KeyboardEvent } from 'react';
import { Button, Input } from '@components/atoms';
import { SearchWrapper, InputWrapper } from './styles';
import { SearchBarProps } from './types';

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = '검색어를 입력하세요',
  fullWidth = false,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === 'Enter') {
        onSearch(value);
      }
    },
    [onSearch, value]
  );

  const handleSearchClick = useCallback((): void => {
    onSearch(value);
  }, [onSearch, value]);

  return (
    <SearchWrapper $fullWidth={fullWidth}>
      <InputWrapper $fullWidth={fullWidth}>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          fullWidth
        />
      </InputWrapper>
      <Button variant="primary" onClick={handleSearchClick}>
        검색
      </Button>
    </SearchWrapper>
  );
};

export type { SearchBarProps } from './types';