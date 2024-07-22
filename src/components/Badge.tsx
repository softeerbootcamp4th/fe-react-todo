import { css, SerializedStyles } from "@emotion/react";
import { PropsWithChildren } from "react";

type BadgeType = "SUCCESS" | "WARNING" | "ERROR" | "INFO";
interface BadgeProps {
  type: BadgeType;
}

const badgeTypeStyles: Record<BadgeType, SerializedStyles> = {
  SUCCESS: css`
    background-color: green;
    color: white;
  `,
  INFO: css`
    background-color: blue;
    color: white;
  `,
  WARNING: css`
    background-color: yellow;
    color: white;
  `,

  ERROR: css`
    background-color: red;
    color: white;
  `,
};
export const Badge = ({ children, type }: PropsWithChildren<BadgeProps>) => {
  return (
    <span
      css={css`
        border-radius: 4px;
        font-weight: 700;
        padding: 4px 8px;
        ${badgeTypeStyles[type]}
      `}
    >
      {children}
    </span>
  );
};
