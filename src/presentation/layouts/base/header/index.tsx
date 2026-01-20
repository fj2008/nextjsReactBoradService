// src/presentation/layouts/base/header/index.tsx
import React from 'react';
import {
  HeaderWrapper,
  LeftSection,
  MenuButton,
  Logo,
  RightSection,
  UserInfo,
  UserAvatar,
  UserName,
} from './styles';
import { HeaderProps } from './types';

export const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  userName = '사용자',
}) => {
  // 이름의 첫 글자 추출
  const initial = userName.charAt(0).toUpperCase();

  return (
    <HeaderWrapper>
      <LeftSection>
        <MenuButton onClick={onMenuClick} aria-label="메뉴 토글">
          {/* 햄버거 아이콘 (간단히 텍스트로) */}
          ☰
        </MenuButton>
        <Logo>게시판</Logo>
      </LeftSection>

      <RightSection>
        <UserInfo>
          <UserAvatar>{initial}</UserAvatar>
          <UserName>{userName}</UserName>
        </UserInfo>
      </RightSection>
    </HeaderWrapper>
  );
};

export type { HeaderProps } from './types';