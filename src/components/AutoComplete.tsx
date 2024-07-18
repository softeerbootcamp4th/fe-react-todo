import { css } from "@emotion/react";

interface AutoCompleteProps {
  items: string[];
  onSelect: (item: string) => void;
  rect?: DOMRect;
}

const autoCompleteStyle = css`
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #6d6d6d;
  }
`;
export const AutoComplete = ({ items, onSelect, rect }: AutoCompleteProps) => {
  const top = rect?.height ?? 0;

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        position: absolute;
        background-color: #ffffff;
        border: 1px solid #000000;
        width: 100%;
        z-index: 1;
        top: ${top}px;
      `}
    >
      {items.map((item, index) => (
        <div
          key={index}
          onMouseDown={() => {
            onSelect(item);
          }}
          css={autoCompleteStyle}
        >
          {item}
        </div>
      ))}
    </div>
  );
};
