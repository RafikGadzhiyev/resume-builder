import {KeyboardEvent, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Tooltip } from "@mui/material";
import { useDebounce } from "../hooks/useDebounce";
import { RootState } from "../state/store";
import { updateResume } from "../state/slices/resume.slice";
import { Input } from "../elements/Inputs";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  max-width: 500px;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;
export const ResumeTitle = () => {
  const dispatch = useDispatch();
  const resume = useSelector(
    (store: RootState) => store.resumeReducer.currentResume
  );
  const [title, setTitle] = useState(resume.title);
  const [editModeEnabled, setEditModeEnabled] = useState(false);

  const debouncedTitleValue = useDebounce(title, 500, true);
  const keyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    if (key === "Enter") {
      setEditModeEnabled(() => false);
    }
  };

  useEffect(() => {
    setTitle(() => resume.title);
  }, [resume.title]);

  useEffect(() => {
    dispatch(
      updateResume({
        ...resume,
        title: debouncedTitleValue,
      })
    );
  }, [debouncedTitleValue, dispatch]);

  return (
    <Container>
      {editModeEnabled ? (
        <Input
          value={title}
          onChange={(e) => setTitle(() => e.target.value)}
          maxLength={100}
          onBlur={() => setEditModeEnabled(() => false)}
          autoFocus
          onKeyDown={(e) => keyHandler(e)}
        />
      ) : (
        <Tooltip
          title={<h3 style={{ textAlign: "center" }}>{title}</h3>}
          arrow
          followCursor
          sx={{ typography: { fontSize: 30 } }}
        >
          <Title onClick={() => setEditModeEnabled(() => true)}>{title}</Title>
        </Tooltip>
      )}
    </Container>
  );
};
