import styled from "@emotion/styled";
import { Radio } from "@mui/material";
import { motion } from "framer-motion";

export const StepContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding-bottom: 5rem;
  max-height: var(--maxHeight);
  overflow: auto;
  overflow-x: hidden;
`;

export const StepTitle = styled.h4`
  text-align: center;
  
  @media screen and (max-width: 480px){
	font-size: 15px;
  }
  
`;

export const StepDescription = styled.textarea`
  all: unset;
  grid-column: 1/-1;
  width: 100%;
  word-break: break-all;
  cursor: text;
  border-radius: 5px;
  background-color: ${(styles: any) => styles.theme.primaryColor};

  transition: 300ms ease;
  text-align: left;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  height: 10rem;

  &:hover {
    box-shadow: 0 0 0 2px rgb(15 255 19 / 0.25);
  }

  &:focus {
    box-shadow: 0 0 0 2px rgb(15 255 19 / 0.5);
  }

  &.default {
    text-transform: none;
  }

  &::placeholder {
    color: rgb(235 235 245 / 0.6);
  }
`;

export const StepRadio = styled(Radio)`
  margin: 0;
  color: ${(styles: any) => styles.theme.primaryColor};

  &.Mui-checked {
    color: #0fff13;
  }
`;
export const DescriptionContainer = styled(StepContainer)`
  padding: 0 1rem 6rem;
`;
export const DescriptionList = styled.ul`
  list-style: none;
  width: 100%;
`;
