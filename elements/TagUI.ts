import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const TagsContainer = styled.div`
  max-width: 65%;
  margin: auto;
`;
export const TagWrapper = styled(motion.div)`
  border-radius: 5px;
  width: fit-content;
  padding: 0.25rem 0.5rem;
  background-color: ${(styles: any) => styles.theme.primaryColor};
  position: relative;
  font-size: 0.7rem;
  color: ${(styles: any) => styles.theme.textColor};
`;

export const Tags = styled.div`
  display: flex;
  gap: 0.5rem 1rem;
  flex-wrap: wrap;
  padding-top: 1rem;
  padding-right: 0.5rem;
  max-height: 400px;
  overflow: auto;
  overflow-x: hidden;
`;
