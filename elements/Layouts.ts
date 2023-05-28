import styled, { StyledComponent } from "@emotion/styled";
import { IWrapRowProps } from "../interfaces/components.interface";
import { Theme } from "@emotion/react/dist/emotion-react.cjs";
import React from "react";
import { IAddDescriptionButtonProps } from "../interfaces/componentProps.interface";
import { motion } from "framer-motion";

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const WrapRow: StyledComponent<
  {
    theme?: Theme | undefined;
    as?: React.ElementType | undefined;
  },
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >,
  IWrapRowProps
> = styled(Row)`
  width: 100%;
  flex-wrap: wrap;
  justify-content: ${(props: IWrapRowProps) =>
    props.px === "left"
      ? "flex-start"
      : props.px === "right"
      ? "flex-start"
      : "center"};
  align-items: ${(props: IWrapRowProps) =>
    props.py === "top"
      ? "flex-start"
      : props.py === "bottom"
      ? "flex-start"
      : "center"};
  gap: ${(props: IWrapRowProps) => props.gap}px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Block = styled.div`
  width: 35%;
  height: fit-content;
  min-height: 170px;
  border-radius: 10px;
`;

//////
export const LanguageWrapper = styled(motion.div)`
  width: 35%;
  height: 385px;
  border-radius: 10px;
`;
