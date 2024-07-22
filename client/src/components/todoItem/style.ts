import styled from '@emotion/styled';

export const TodoItem = styled.div<{ index: number; draggedIndex: number | null }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 12px;
  background-color: ${({ index, draggedIndex }) => (index === draggedIndex ? '#eee' : 'transparent')};
  cursor: pointer;
`;
