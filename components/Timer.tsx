import React from "react";
import styled from "@emotion/styled";
import { ConvertToMinutes, ConvertToSeconds } from "../utils/convert";

const TimerContainer = styled.div`
  border: 2.5px solid rgb(241 241 241 / 0.1);
  background-color: rgb(43 43 47 / 0.5);
  border-radius: 5px;
  display: flex;
  width: fit-content;
  padding: 0.1rem 0.25rem;
  font-size: 0.7rem;
`;
interface IProps {
  time: number; // Time in seconds
}
export const Timer: React.FC<IProps> = ({ time }) => {
  return (
    <TimerContainer>
      <span>{ConvertToMinutes(time / 1000)}</span>:
      <span>{ConvertToSeconds(time / 1000)}</span>
    </TimerContainer>
  );
};
