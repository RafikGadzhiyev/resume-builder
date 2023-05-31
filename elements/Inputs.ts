import styled from "@emotion/styled";

export const Input = styled.input`
  all: unset;
  border-radius: 10px;
  text-align: left;
  background-color: ${(styles: any) => styles.theme.primaryColor};
  text-indent: 1rem;
  padding: 0.5rem 1rem 0.5rem 0;
  width: 100%;
  box-sizing: border-box;
  transition: 300ms ease;
  color: ${(styles: any) => styles.theme.textColor};
  margin-bottom: 0.4rem;

  &:hover {
    box-shadow: 0 0 0 2px rgb(15 255 19 / 0.25);
  }

  &:focus {
    box-shadow: 0 0 0 2px rgb(15 255 19 / 0.5);
  }

  &::placeholder {
    color: rgb(235 235 245 / 0.6);
  }

  @media screen and (max-width: 360px) {
    min-width: 0;
    width: 100%;
  }

`;

export const StepInput = styled(Input)`
  margin: 0;
  width: 100%;
  background-color: var(--backgroundColor);
  &:hover {
    box-shadow: var(--boxShadowHoverState);
  }

  &:focus {
    box-shadow: var(--boxShadowFocusState);
  }
  &::placeholder {
    color: var(--placeholderColor);
  }
`;

export const TagInput = styled(Input)`
  width: 100%;
  margin-block: 1rem;
`;
