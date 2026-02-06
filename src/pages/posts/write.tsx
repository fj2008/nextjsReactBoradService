// src/pages/posts/write.tsx
import type { ChangeEvent, FormEvent, ReactElement } from 'react';
import { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { BaseLayout } from '@layouts/index';
import { Button } from '@components/atoms';
import { FormField } from '@components/molecules';
import { useCreatePost } from '@hooks/api';
import { useToast } from '@hooks/common';

export default function PostWrite(): ReactElement {
  const router = useRouter();
  const { showSuccess, showError } = useToast();

  // TanStack Query Mutation
  const { mutate: createPost, isPending } = useCreatePost();

  // 폼 상태
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '홍길동',
  });

  // 입력 핸들러
  const handleChange = useCallback(
    (field: 'title' | 'content') =>
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setFormData((prev) => ({
          ...prev,
          [field]: e.target.value,
        }));
      },
    []
  );

  // 제출 핸들러
  const handleSubmit = useCallback(
    (e: FormEvent): void => {
      e.preventDefault();

      if (!formData.title.trim()) {
        showError('제목을 입력해주세요.');
        return;
      }

      if (!formData.content.trim()) {
        showError('내용을 입력해주세요.');
        return;
      }

      createPost(formData, {
        onSuccess: (response) => {
          showSuccess(response.message);
          router.push('/posts');
        },
        onError: (error) => {
          showError(`등록 실패: ${error.message}`);
        },
      });
    },
    [formData, createPost, router, showSuccess, showError]
  );

  // 취소 핸들러
  const handleCancel = useCallback((): void => {
    if (formData.title || formData.content) {
      if (confirm('작성 중인 내용이 있습니다. 취소하시겠습니까?')) {
        router.push('/posts');
      }
    } else {
      router.push('/posts');
    }
  }, [formData, router]);

  return (
    <BaseLayout userName="홍길동">
      <PageHeader>
        <Title>글쓰기</Title>
        <Description>새 게시글을 작성합니다.</Description>
      </PageHeader>

      <FormCard>
        <Form onSubmit={handleSubmit}>
          <FormField
            id="title"
            label="제목"
            required
            placeholder="제목을 입력하세요"
            value={formData.title}
            onChange={handleChange('title')}
            fullWidth
            disabled={isPending}
          />

          <ContentField>
            <label htmlFor="content">
              내용 <Required>*</Required>
            </label>
            <Textarea
              id="content"
              placeholder="내용을 입력하세요"
              value={formData.content}
              onChange={handleChange('content')}
              rows={15}
              disabled={isPending}
            />
          </ContentField>

          <ButtonGroup>
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
              disabled={isPending}
            >
              취소
            </Button>
            <Button type="submit" variant="primary" isLoading={isPending}>
              {isPending ? '등록 중...' : '등록'}
            </Button>
          </ButtonGroup>
        </Form>
      </FormCard>
    </BaseLayout>
  );
}

// Styled Components (이전과 동일)
const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.neutral[900]};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

const FormCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[6]};
  max-width: 800px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};
`;

const ContentField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};

  label {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.neutral[700]};
  }
`;

const Required = styled.span`
  color: ${({ theme }) => theme.colors.error[500]};
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  resize: vertical;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary[100]};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral[400]};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.neutral[100]};
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing[2]};
  padding-top: ${({ theme }) => theme.spacing[4]};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;