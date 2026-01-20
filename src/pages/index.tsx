// src/pages/index.tsx
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button, Input, Label, Checkbox } from '@components/atoms';

export default function Home(): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingClick = (): void => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <Container>
      <Title>게시판 튜토리얼 - Atoms 컴포넌트</Title>

      {/* Button 섹션 */}
      <Section>
        <SectionTitle>Button 컴포넌트</SectionTitle>

        <SubSection>
          <Label size="sm">Variants</Label>
          <ButtonRow>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </ButtonRow>
        </SubSection>

        <SubSection>
          <Label size="sm">Sizes</Label>
          <ButtonRow>
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
          </ButtonRow>
        </SubSection>

        <SubSection>
          <Label size="sm">States</Label>
          <ButtonRow>
            <Button disabled>Disabled</Button>
            <Button isLoading={isLoading} onClick={handleLoadingClick}>
              {isLoading ? 'Loading...' : 'Click to Load'}
            </Button>
          </ButtonRow>
        </SubSection>

        <SubSection>
          <Label size="sm">Full Width</Label>
          <Button fullWidth>Full Width Button</Button>
        </SubSection>
      </Section>

      {/* Input 섹션 */}
      <Section>
        <SectionTitle>Input 컴포넌트</SectionTitle>

        <SubSection>
          <Label size="sm">Sizes</Label>
          <InputColumn>
            <Input size="small" placeholder="Small input" />
            <Input size="medium" placeholder="Medium input" />
            <Input size="large" placeholder="Large input" />
          </InputColumn>
        </SubSection>

        <SubSection>
          <Label size="sm">States</Label>
          <InputColumn>
            <Input
              placeholder="Normal input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Input placeholder="Disabled input" disabled />
            <Input
              placeholder="Error input"
              error
              errorMessage="This field is required"
            />
          </InputColumn>
        </SubSection>

        <SubSection>
          <Label size="sm">Full Width</Label>
          <Input fullWidth placeholder="Full width input" />
        </SubSection>
      </Section>

      {/* Label 섹션 */}
      <Section>
        <SectionTitle>Label 컴포넌트</SectionTitle>

        <SubSection>
          <LabelRow>
            <Label size="sm">Small Label</Label>
            <Label size="base">Base Label</Label>
            <Label size="lg">Large Label</Label>
            <Label size="xl">XL Label</Label>
          </LabelRow>
        </SubSection>

        <SubSection>
          <LabelRow>
            <Label required>Required Label</Label>
            <Label disabled>Disabled Label</Label>
          </LabelRow>
        </SubSection>
      </Section>

      {/* Checkbox 섹션 */}
      <Section>
        <SectionTitle>Checkbox 컴포넌트</SectionTitle>

        <SubSection>
          <CheckboxColumn>
            <Checkbox
              label="Normal checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <Checkbox label="Disabled checkbox" disabled />
            <Checkbox label="Disabled checked" disabled checked />
            <Checkbox label="Error state" error />
          </CheckboxColumn>
        </SubSection>
      </Section>

      {/* 완료 메시지 */}
      <SuccessMessage>
        ✅ 단계 2 완료: Atoms 컴포넌트 (Button, Input, Label, Checkbox)
      </SuccessMessage>
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  max-width: 900px;
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
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  padding-bottom: ${({ theme }) => theme.spacing[2]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const SubSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[4]};

  &:last-child {
    margin-bottom: 0;
  }

  > label:first-of-type {
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing[2]};
    color: ${({ theme }) => theme.colors.neutral[500]};
  }
`;

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const InputColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  max-width: 400px;
`;

const LabelRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const CheckboxColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
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