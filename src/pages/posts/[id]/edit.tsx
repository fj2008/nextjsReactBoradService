// src/pages/posts/[id]/edit.tsx
import type { ChangeEvent, FormEvent, ReactElement } from 'react';
import { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { BaseLayout } from '@layouts/index';
import { Button } from '@components/atoms';
import { FormField } from '@components/molecules';
import { useGetPost, useUpdatePost } from '@hooks/api';
import { useToast } from '@hooks/common';

interface PostFormData {
  title: string;
  content: string;
}

interface PostEditFormProps {
  initialTitle: string;
  initialContent: string;
  isUpdating: boolean;
  onSubmit: (data: PostFormData) => void;
  onCancel: () => void;
}

export default function PostEdit(): ReactElement {
  const router = useRouter();
  const { id } = router.query;
  const postId = Number(id);

  const { showSuccess, showError } = useToast();

  // 기존 데이터 조회
  const { data, isLoading: isLoadingPost } = useGetPost(postId);

  // 수정 Mutation
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost();

  const handleSubmit = useCallback(
    (formData: PostFormData): void => {
      if (!formData.title.trim()) {
        showError('제목을 입력해주세요.');
        return;
      }

      if (!formData.content.trim()) {
        showError('내용을 입력해주세요.');
        return;
      }

      updatePost(
        {
          id: postId,
          data: formData,
        },
        {
          onSuccess: (response) => {
            showSuccess(response.message);
            router.push(`/posts/${postId}`);
          },
          onError: (error) => {
            showError(`수정 실패: ${error.message}`);
          },
        }
      );
    },
    [postId, updatePost, router, showSuccess, showError]
  );

  // 취소 핸들러
  const handleCancel = useCallback((): void => {
    router.push(`/posts/${postId}`);
  }, [router, postId]);

  // 로딩 상태
  if (isLoadingPost) {
    return (
      <BaseLayout userName="홍길동">
        <LoadingMessage>게시글을 불러오는 중...</LoadingMessage>
      </BaseLayout>
    );
  }

  // 데이터 없음
  if (!data?.post) {
    return (
      <BaseLayout userName="홍길동">
        <ErrorMessage>게시글을 찾을 수 없습니다.</ErrorMessage>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout userName="홍길동">
      <PageHeader>
        <Title>게시글 수정</Title>
        <Description>게시글 내용을 수정합니다.</Description>
      </PageHeader>

      <PostEditForm
        key={postId}
        initialTitle={data.post.title}
        initialContent={data.post.content}
        isUpdating={isUpdating}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </BaseLayout>
  );
}

const PostEditForm = ({
  initialTitle,
  initialContent,
  isUpdating,
  onSubmit,
  onCancel,
}: PostEditFormProps): ReactElement => {
  const [formData, setFormData] = useState<PostFormData>({
    title: initialTitle,
    content: initialContent,
  });

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

  const handleSubmit = useCallback(
    (e: FormEvent): void => {
      e.preventDefault();
      onSubmit(formData);
    },
    [formData, onSubmit]
  );

  return (
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
          disabled={isUpdating}
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
            disabled={isUpdating}
          />
        </ContentField>

        <ButtonGroup>
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isUpdating}
          >
            취소
          </Button>
          <Button type="submit" variant="primary" isLoading={isUpdating}>
            {isUpdating ? '수정 중...' : '수정 완료'}
          </Button>
        </ButtonGroup>
      </Form>
    </FormCard>
  );
};

// Styled Components
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

const LoadingMessage = styled.div`
  padding: ${({ theme }) => theme.spacing[8]};
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[500]};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

const ErrorMessage = styled.div`
  padding: ${({ theme }) => theme.spacing[8]};
  text-align: center;
  color: ${({ theme }) => theme.colors.error[500]};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;