import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { FormControlLabel, RadioGroup } from "@mui/material";
import { FaTimes } from "react-icons/fa";
import { AppDispatch, RootState } from "../state/store";
import { updateResume } from "../state/slices/resume.slice";
import { LanguageLevels } from "../types";
import { useDebounce } from "../hooks/useDebounce";
import { Column, LanguageWrapper } from "../elements/Layouts";
import { DeleteDescriptionButton } from "../elements/Buttons";
import { LanguageInput, LanguageRadio } from "../elements/FormUI";
import { FadeInOutTop } from "../variants/animation.variants";

const MotionedWrapper = styled(LanguageWrapper)`
  position: relative;
  background-color: ${(props: any) => props.theme.primaryColor};
  border-radius: 10px;
  padding: 1rem;
`;

interface IProps extends React.PropsWithChildren {
  id: string;
  initialLevel: LanguageLevels;
}

export const Language: React.FC<IProps> = ({ id, initialLevel }) => {
  const [language, setLanguage] = React.useState("");
  const resume = useSelector(
    (store: RootState) => store.resumeReducer.currentResume
  );
  const dispatch = useDispatch<AppDispatch>();
  const debouncedLanguageValue = useDebounce(language, 500, true);
  const DeleteLanguage = (deleteId: string) => {
    dispatch(
      updateResume({
        ...resume,
        languages: resume.languages.filter(
          (language) => language.id !== deleteId
        ),
      })
    );
  };

  const updateLanguage = (updateLevel: LanguageLevels) => {
    dispatch(
      updateResume({
        ...resume,
        languages: resume.languages.map((language) =>
          language.id !== id
            ? language
            : {
                ...language,
                level: updateLevel,
              }
        ),
      })
    );
  };

  React.useEffect(() => {
    dispatch(
      updateResume({
        ...resume,
        languages: resume.languages.map((language) =>
          language.id !== id
            ? language
            : {
                ...language,
                language: debouncedLanguageValue,
              }
        ),
      })
    );
  }, [debouncedLanguageValue, dispatch, id]);

  return (
    <MotionedWrapper
      variants={FadeInOutTop}
      initial="initial"
      animate="active"
      exit="exit"
      layout
    >
      <Column>
        <LanguageInput
          style={{
            minWidth: 0,
          }}
          placeholder="Language"
          value={language}
          onChange={(e) => setLanguage(() => e.target.value)}
        />
        <RadioGroup
          value={initialLevel}
          onChange={(e) => {
            updateLanguage(e.target.value as LanguageLevels);
          }}
        >
          <FormControlLabel
            value="A1 - Beginner"
            label="A1 - Beginner"
            control={<LanguageRadio />}
          />
          <FormControlLabel
            value="A2 - Elementary"
            label="A2 - Elementary"
            control={<LanguageRadio />}
          />
          <FormControlLabel
            value="B1 - Intermediate"
            label="B1 - Intermediate"
            control={<LanguageRadio />}
          />
          <FormControlLabel
            value="B2 - Upper-intermediate"
            label="B2 - Upper-intermediate"
            control={<LanguageRadio />}
          />
          <FormControlLabel
            value="C1 - Advanced"
            label="C1 - Advanced"
            control={<LanguageRadio />}
          />
          <FormControlLabel
            value="C2 - Proficient"
            label="C2 - Proficient"
            control={<LanguageRadio />}
          />
        </RadioGroup>
      </Column>
      <DeleteDescriptionButton onClick={() => DeleteLanguage(id)}>
        <FaTimes />
      </DeleteDescriptionButton>
    </MotionedWrapper>
  );
};
