import React from "react";
import { Theme } from "@emotion/react";
import styled, { StyledComponent } from "@emotion/styled";
import { IAddDescriptionButtonProps } from "../interfaces/componentProps.interface";
import { ConvertOpacityToHEXRepresentation } from "../utils/convert";
import { Block, LanguageWrapper } from "./Layouts";

export const ShowPasswordButton = styled.button`
  all: unset;
  right: 1.5rem;
  top: 50%;
  position: absolute;
  transform: translate(100%, -60%);
  cursor: pointer;
`;

export const RedirectButton = styled.button`
  all: unset;
  color: rgb(10 255 20 / 1);
  cursor: pointer;
  position: relative;

  &::before {
    content: "";
    width: 0;
    height: 2px;
    background-color: #0fff13;
    transition: 300ms ease;
    position: absolute;
    bottom: -2.5px;
    border-radius: 5px;
    left: 100%;
    transform: translateX(-100%);
  }

  &:hover {
    &::before {
      width: 100%;
      transform: translateX(0, 50%);
    }
  }
`;

export const BaseButton = styled.button`
  --shadowColor: #0bbf0e;
  --backgroundColor: #0aff14;

  all: unset;
  border-radius: 10px;
  background-color: var(--backgroundColor);
  color: #000;
  cursor: pointer;
  padding: 0.5rem 3rem;
  font-weight: 600;
  width: fit-content;
  text-align: center;
  transition: 300ms ease;

  &:not(:disabled):hover {
    box-shadow: 0 0 10px 2px var(--shadowColor);
  }

  &:active {
    box-shadow: none;
    background-color: var(--shadowColor);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const DeleteButton = styled(BaseButton)`
  color: #fff;
  padding: 0 0.3rem;
  --backgroundColor: #f77777;
  --shadowColor: #f84f4f;
`;

export const DeleteDescriptionButton = styled.button`
  all: unset;
  cursor: pointer;
  background-color: ${(styles: any) => styles.theme.primaryColor};
  box-sizing: border-box;
  padding: 0.1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: -7.5px;
  top: -7.5px;
  transition: 300ms;

  &:hover {
    background-color: #222225;
  }
`;

export const AddDescriptionButton: StyledComponent<
  {
    theme?: Theme | undefined;
    as?: React.ElementType | undefined;
  },
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  IAddDescriptionButtonProps
> = styled.button`
  all: unset;
  width: 100%;
  border-radius: 10px;
  ${(props: any) =>
    props.variant === "solid"
      ? `background-color: ${props.theme.primaryColor};`
      : ""};
  cursor: pointer;
  padding: 1.5rem 0;
  box-sizing: border-box;
  text-align: center;
  font-size: 1rem;
  transition: 300ms ease;

  ${(props: any) =>
    props.variant === "solid"
      ? `
        &:hover {
            background-color: ${
              props.theme.primaryColor + ConvertOpacityToHEXRepresentation(50)
            };
        }
    
        &:active {
            background-color: ${
              props.theme.primaryColor + ConvertOpacityToHEXRepresentation(30)
            };
        }
        `
      : ""};
`;

export const NewLanguage = styled(LanguageWrapper)`
  border: 1px dashed ${(styles: any) => styles.theme.textColor};
  display: flex;
  align-items: stretch;
  justify-content: center;
  color: ${(styles: any) => styles.theme.textColor};
  transition: 300ms ease;

  &:hover {
    background-color: ${(styles: any) => styles.theme.primaryColor};
  }
`;
