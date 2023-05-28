import React from "react";
import styled from "@emotion/styled";

const VerificationFieldsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const VerificationField = styled.input`
  all: unset;
  cursor: text;
  color: #f1f1f1;
  border-radius: 5px;
  background-color: rgb(43 43 47 / 0.5);
  padding: 1.75rem 0.75rem;
  font-size: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  text-align: center;
  border: 2.5px solid rgb(241 241 241 / 0.1);
  transition: 300ms ease;

  &:hover {
    border-color: rgb(241 241 241 / 0.5);
  }

  &:focus {
    border-color: rgb(241 241 241 / 0.75);
  }
`;

interface IBlock {
  changeHandler: (e: React.FormEvent<HTMLInputElement>) => void;
}

export const VerificationCodeBlock: React.FC<IBlock> = ({ changeHandler }) => {
  return (
    <VerificationFieldsContainer>
      <VerificationField
        autoComplete="off"
        tabIndex={0}
        type="text"
        aria-autocomplete="none"
        maxLength={1}
        autoFocus={true}
        name="cell-1"
        onInput={(e) => changeHandler(e)}
      />
      <VerificationField
        autoComplete="off"
        type="text"
        aria-autocomplete="none"
        maxLength={1}
        name="cell-2"
        onInput={(e) => changeHandler(e)}
      />
      <VerificationField
        autoComplete="off"
        type="text"
        aria-autocomplete="none"
        maxLength={1}
        name="cell-3"
        onInput={(e) => changeHandler(e)}
      />
      <VerificationField
        autoComplete="off"
        type="text"
        aria-autocomplete="none"
        maxLength={1}
        name="cell-4"
        onInput={(e) => changeHandler(e)}
      />
      <VerificationField
        autoComplete="off"
        type="text"
        aria-autocomplete="none"
        maxLength={1}
        name="cell-5"
        onInput={(e) => changeHandler(e)}
      />
      <VerificationField
        type="text"
        autoComplete="off"
        aria-autocomplete="none"
        maxLength={1}
        name="cell-6"
        onInput={(e) => changeHandler(e)}
      />
    </VerificationFieldsContainer>
  );
};
