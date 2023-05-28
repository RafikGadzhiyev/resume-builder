import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const IndicatorContainer = styled.div`
  text-align: center;
  font-size: 0.75rem;
  color: rgb(10 255 20 / 1);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Wrapper = styled.div`
  border-radius: 10px;
  background-color: rgb(10 255 20 / 0.1);
  display: flex;
  padding: 0.5rem;
  gap: 0.25rem;
`;

export const Container = styled(motion.div)`
  background-color: #0fff13;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: 300ms ease;
`;
