// src/pages/posts/index.tsx
import type { ReactElement } from 'react';
import { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { BaseLayout } from '@layouts/index';
import { Button } from '@components/atoms';
import { SearchBar } from '@components/molecules';
import { Table, Pagination, TableColumn } from '@components/organisms';

// 게시글 타입
interface Post {
  id: number;
  title: string;
  author: string;
  createdAt: string;
  views: number;
}

// 샘플 데이터
const SAMPLE_POSTS: Post[] = [
  { id: 1, title: '첫 번째 게시글입니다', author: '홍길동', createdAt: '2024-01-15', views: 150 },
  { id: 2, title: '두 번째 게시글입니다', author: '김철수', createdAt: '2024-01-14', views: 89 },
  { id: 3, title: '세 번째 게시글입니다', author: '이영희', createdAt: '2024-01-13', views: 234 },
  { id: 4, title: 'React Hooks 사용법', author: '박민수', createdAt: '2024-01-12', views: 567 },
  { id: 5, title: 'Next.js 시작하기', author: '최지은', createdAt: '2024-01-11', views: 321 },
  { id: 6, title: 'TypeScript 기초', author: '정다운', createdAt: '2024-01-10', views: 445 },
  { id: 7, title: 'Emotion으로 스타일링하기', author: '강미래', createdAt: '2024-01-09', views: 198 },
  { id: 8, title: '상태관리 패턴 비교', author: '윤희망', createdAt: '2024-01-08', views: 276 },
];

export default function PostList(): ReactElement {
  const router = useRouter();

  // 상태 관리
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // 테이블 컬럼 정의
  const columns: TableColumn<Post>[] = [
    {
      key: 'id',
      header: '번호',
      width: '80px',
      align: 'center',
    },
    {
      key: 'title',
      header: '제목',
      render: (row) => <TitleText>{row.title}</TitleText>,
    },
    {
      key: 'author',
      header: '작성자',
      width: '120px',
      align: 'center',
    },
    {
      key: 'createdAt',
      header: '작성일',
      width: '120px',
      align: 'center',
    },
    {
      key: 'views',
      header: '조회수',
      width: '100px',
      align: 'center',
      render: (row) => <span>{row.views.toLocaleString()}</span>,
    },
  ];

  // 이벤트 핸들러
  const handleSearch = useCallback((value: string): void => {
    console.log('검색:', value);
    setCurrentPage(1);
  }, []);

  const handleRowClick = useCallback(
    (row: Post): void => {
      router.push(`/posts/${row.id}`);
    },
    [router]
  );

  const handlePageChange = useCallback((page: number): void => {
    setCurrentPage(page);
  }, []);

  const handleWriteClick = useCallback((): void => {
    router.push('/posts/write');
  }, [router]);

  return (
    <BaseLayout userName="홍길동">
      <PageHeader>
        <TitleRow>
          <Title>게시판</Title>
          <Button variant="primary" onClick={handleWriteClick}>
            글쓰기
          </Button>
        </TitleRow>
        <Description>전체 게시글 {SAMPLE_POSTS.length}개</Description>
      </PageHeader>

      {/* 검색 영역 */}
      <SearchSection>
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          onSearch={handleSearch}
          placeholder="제목, 작성자 검색..."
        />
      </SearchSection>

      {/* 테이블 */}
      <TableSection>
        <Table
          columns={columns}
          data={SAMPLE_POSTS}
          rowKey={(row) => row.id}
          onRowClick={handleRowClick}
        />
      </TableSection>

      {/* 페이지네이션 */}
      <PaginationSection>
        <Pagination
          currentPage={currentPage}
          totalPages={5}
          onPageChange={handlePageChange}
        />
      </PaginationSection>
    </BaseLayout>
  );
}

// Styled Components
const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.neutral[900]};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

const SearchSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const TableSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const PaginationSection = styled.div`
  display: flex;
  justify-content: center;
`;

const TitleText = styled.span`
  color: ${({ theme }) => theme.colors.neutral[900]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[600]};
    text-decoration: underline;
  }
`;