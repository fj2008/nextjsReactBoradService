// src/pages/index.tsx
import type { ReactElement } from 'react';
import { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { Button, Label } from '@components/atoms';
import { FormField, SearchBar } from '@components/molecules';
import { Pagination, Table, TableColumn } from '@components/organisms';

// 게시글 타입 정의
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
  { id: 4, title: '네 번째 게시글입니다', author: '박민수', createdAt: '2024-01-12', views: 56 },
  { id: 5, title: '다섯 번째 게시글입니다', author: '최지은', createdAt: '2024-01-11', views: 178 },
];

export default function Home(): ReactElement {
  // 상태 관리
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [formValues, setFormValues] = useState({
    title: '',
    content: '',
  });

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
      render: (row) => <TitleCell>{row.title}</TitleCell>,
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
    alert(`검색어: ${value}`);
  }, []);

  const handleRowClick = useCallback((row: Post): void => {
    console.log('행 클릭:', row);
    alert(`게시글 클릭: ${row.title}`);
  }, []);

  const handlePageChange = useCallback((page: number): void => {
    setCurrentPage(page);
    console.log('페이지 변경:', page);
  }, []);

  return (
    <Container>
      <Title>게시판 튜토리얼 - Molecules & Organisms</Title>

      {/* SearchBar 섹션 */}
      <Section>
        <SectionTitle>SearchBar (Molecule)</SectionTitle>
        <Description>Input + Button 조합</Description>

        <DemoArea>
          <SearchBar
            value={searchValue}
            onChange={setSearchValue}
            onSearch={handleSearch}
            placeholder="게시글 검색..."
          />
        </DemoArea>

        <DemoArea>
          <Label size="sm">Full Width</Label>
          <SearchBar
            value={searchValue}
            onChange={setSearchValue}
            onSearch={handleSearch}
            placeholder="전체 너비 검색바"
            fullWidth
          />
        </DemoArea>
      </Section>

      {/* FormField 섹션 */}
      <Section>
        <SectionTitle>FormField (Molecule)</SectionTitle>
        <Description>Label + Input 조합</Description>

        <FormArea>
          <FormField
            id="title"
            label="제목"
            required
            placeholder="제목을 입력하세요"
            value={formValues.title}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, title: e.target.value }))
            }
            helperText="최대 100자까지 입력 가능합니다"
          />

          <FormField
            id="content"
            label="내용"
            placeholder="내용을 입력하세요"
            value={formValues.content}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, content: e.target.value }))
            }
          />

          <FormField
            id="error-example"
            label="에러 예시"
            required
            placeholder="필수 입력 항목"
            value=""
            onChange={() => { }}
            errorMessage="이 필드는 필수입니다"
          />
        </FormArea>
      </Section>

      {/* Table 섹션 */}
      <Section>
        <SectionTitle>Table (Organism)</SectionTitle>
        <Description>게시판 목록 테이블</Description>

        <Table
          columns={columns}
          data={SAMPLE_POSTS}
          rowKey={(row) => row.id}
          onRowClick={handleRowClick}
        />

        <SubSection>
          <Label size="sm">로딩 상태</Label>
          <Table
            columns={columns}
            data={[]}
            rowKey={(row) => row.id}
            isLoading
          />
        </SubSection>

        <SubSection>
          <Label size="sm">빈 데이터</Label>
          <Table
            columns={columns}
            data={[]}
            rowKey={(row) => row.id}
            emptyMessage="검색 결과가 없습니다."
          />
        </SubSection>
      </Section>

      {/* Pagination 섹션 */}
      <Section>
        <SectionTitle>Pagination (Organism)</SectionTitle>
        <Description>현재 페이지: {currentPage}</Description>

        <DemoArea>
          <Label size="sm">기본 (10페이지)</Label>
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={handlePageChange}
          />
        </DemoArea>

        <DemoArea>
          <Label size="sm">많은 페이지 (50페이지)</Label>
          <Pagination
            currentPage={currentPage}
            totalPages={50}
            onPageChange={handlePageChange}
          />
        </DemoArea>

        <DemoArea>
          <Label size="sm">적은 페이지 (3페이지)</Label>
          <Pagination
            currentPage={Math.min(currentPage, 3)}
            totalPages={3}
            onPageChange={handlePageChange}
          />
        </DemoArea>
      </Section>

      {/* 완료 메시지 */}
      <SuccessMessage>
        ✅ 단계 3 완료: Molecules (FormField, SearchBar) & Organisms (Table, Pagination)
      </SuccessMessage>
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[8]};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary[600]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const Section = styled.section`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.neutral[800]};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutral[500]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const DemoArea = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[4]};

  > label {
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing[2]};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const FormArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  max-width: 500px;
`;

const SubSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing[6]};

  > label {
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing[2]};
  }
`;

const TitleCell = styled.span`
  color: ${({ theme }) => theme.colors.neutral[900]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &:hover {
    color: ${({ theme }) => theme.colors.primary[600]};
    text-decoration: underline;
  }
`;

const SuccessMessage = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.success[50]};
  border: 1px solid ${({ theme }) => theme.colors.success[500]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.success[600]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-align: center;
`;