import {FC, useEffect, useRef, useState} from "react";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import { useFocus } from "../hooks/useFocus";
import { RootState } from "../state/store";
import { IResume } from "../interfaces/resume.interface";
import { CompareTwoDates } from "../utils/Date";
import { FaAngleDown } from "react-icons/fa";

const FilterBlock = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const FilterButton = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FilterSelect = styled(motion.ul)`
  position: absolute;
  bottom: -15%;
  transform: translateY(100%);
  right: 10%;
  list-style: none;
  background-color: ${(styles: any) => styles.theme.primaryColor};
  box-shadow: 0 0 10px -4px ${(styles: any) => styles.theme.textColor};
  border-radius: 5px;
  width: max-content;
  overflow: hidden;
  z-index: 101;
  color: ${(styles: any) => styles.theme.textColor};
`;

const SelectItem = styled.li`
  width: 100%;
  font-size: 0.8rem;
`;

const SelectButton = styled.button`
  all: unset;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0.5rem;
  cursor: pointer;
  transition: 300ms ease;

  &:hover {
    background-color: ${(styles: any) => styles.theme.secondaryColor};
  }
`;

interface IProps {
  sort: (callBack: (a: IResume, b: IResume) => boolean) => void;
  reset: () => void;
  updateState: (newData: IResume[]) => void;
}
export const Filter: FC<IProps> = ({ sort, updateState, reset }) => {
  const [currentSort, setCurrentSort] = useState("Select sort");
  const resumes = useSelector(
    (store: RootState) => store.resumeReducer.resumes
  );
  const SelectRef = useRef<HTMLButtonElement>(null);
  const currentFocusResult = useFocus(SelectRef);

  const applySort = (sortType: string) => {
    let sortCallback = (__: IResume, _: IResume) => false;
    switch (sortType) {
      case "select_sort":
        reset();
        break;
      case "from_newest":
        sortCallback = (a: IResume, b: IResume) =>
          CompareTwoDates(a.createdAt, b.createdAt);
        break;
      case "from_oldest":
        sortCallback = (a: IResume, b: IResume) =>
          CompareTwoDates(b.createdAt, a.createdAt);
        break;
      case "alphabetical":
        sortCallback = (a: IResume, b: IResume) =>
          a.title.toLowerCase() > b.title.toLowerCase();
        break;
    }
    sort(sortCallback);
  };

  useEffect(() => {
    updateState(resumes);
    setCurrentSort(() => "Select sort");
  }, [resumes]);

  return (
    <FilterBlock>
      <FilterButton ref={SelectRef}>
        {currentSort}
        <FaAngleDown
          className={currentFocusResult ? "up" : ""}
          style={{ transition: "300ms ease" }}
        />
      </FilterButton>
      <AnimatePresence>
        {currentFocusResult && (
          <FilterSelect
            initial={{
              opacity: 0,
              y: "95%",
            }}
            animate={{
              opacity: 1,
              y: "100%",
            }}
            exit={{
              opacity: 0,
              y: "95%",
            }}
            transition={{
              delay: 0.1,
            }}
          >
            <SelectItem>
              <SelectButton
                onClick={() => {
                  setCurrentSort(() => "Select sort");
                  applySort("select_sort");
                }}
              >
                Select sort
              </SelectButton>
            </SelectItem>
            <SelectItem>
              <SelectButton
                onClick={() => {
                  setCurrentSort(() => "From newest");
                  applySort("from_newest");
                }}
              >
                From newest
              </SelectButton>
            </SelectItem>
            <SelectItem>
              <SelectButton
                onClick={() => {
                  setCurrentSort(() => "From oldest");
                  applySort("from_oldest");
                }}
              >
                From oldest
              </SelectButton>
            </SelectItem>
            <SelectItem>
              <SelectButton
                onClick={() => {
                  setCurrentSort(() => "Alphabetical");
                  applySort("alphabetical");
                }}
              >
                Alphabetical
              </SelectButton>
            </SelectItem>
          </FilterSelect>
        )}
      </AnimatePresence>
    </FilterBlock>
  );
};
