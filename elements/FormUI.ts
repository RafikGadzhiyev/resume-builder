import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { Input } from "./Inputs";
import { StepRadio } from "./StepsUI";

export const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: auto auto 2.5rem auto;
  text-align: center;
  position: relative;
      
  &::before {
    content: "";
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(
      to right,
      transparent 5%,
      rgb(61 61 65 / 1),
      ${(styles: any) => styles.theme.textColor},
      rgb(61 61 65 / 1),
      transparent 95%
    );
    width: 100%;
    display: block;
    height: 1px;
  }
`;

export const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
`;

export const FormText = styled.span`
  color: rgb(255 255 255 / 0.5);
  font-size: 0.75rem;
  @media screen and (max-width: 300px){
        display: flex;
        flex-direction: column;
  }
`;

export const FormTypeIcon = styled.img`
  width: 100%;
  height: 100%;
`;

export const PasswordContainer = styled.div`
  position: relative;
  &:not(:last-of-type) {
    margin-bottom: 0.8rem;
  }
`;
export const FormTypeIconContainer = styled.div`
  display: flex;
  max-width: 27.5rem;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.3rem;
  background-color: rgb(255 255 255 / 0.1);
  width: fit-content;
  height: 100px;
  border-radius: 105px;
  margin: auto;
  transform: matrix(1, -0.14, 0.1, 1, 0, 0);
`;

export const LanguageInput = styled(Input)`
  background-color: ${(styles: any) => styles.theme.secondaryColor};
`;

export const LanguageRadio = styled(StepRadio)`
  color: ${(styles: any) => styles.theme.secondaryColor};
`;

export const StepForm = styled(Form)`
  margin-bottom: 0;
  display: grid;
  width: 100%;
  padding: 0 5rem 0.5rem;
  align-items: center;
  grid-template-columns: 0.5fr 1.5fr;
  grid-template-rows: repeat(auto-fill, 1fr);
  &::before {
    display: none;
  }
`;
