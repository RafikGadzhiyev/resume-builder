import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid4 } from "uuid";
import { AnimatePresence } from "framer-motion";
import { AppDispatch, RootState } from "../../state/store";
import { updateResume } from "../../state/slices/resume.slice";
import { Tag } from "./Tag";
import { StepTitle } from "../../elements/StepsUI";
import { TagInput } from "../../elements/Inputs";
import { Tags, TagsContainer } from "../../elements/TagUI";

export const StepThree = () => {
  const dispatch: AppDispatch = useDispatch();
  const resume = useSelector(
    (store: RootState) => store.resumeReducer.currentResume
  );
  const { skills } = resume;

  const addNewSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const element = e.target as HTMLInputElement;
    if (key === "Enter") {
      let value = element.value.trim();
      if (value.length === 0) return;
      dispatch(
        updateResume({
          ...resume,
          skills: [
            ...skills,
            {
              id: uuid4(),
              value,
            },
          ],
        })
      );
      element.value = "";
    }
  };

  const removeTag = (removeId: string) => {
    dispatch(
      updateResume({
        ...resume,
        skills: skills.filter((skill) => skill.id !== removeId),
      })
    );
  };

  return (
    <TagsContainer>
      <StepTitle>Now write your skills</StepTitle>
      <TagInput
        placeholder="Write your skill and hit enter to add it"
        onKeyDown={(e) => addNewSkill(e)}
      />
      <Tags>
        <AnimatePresence>
          {skills.map((skill) => (
            <Tag
              key={skill.id}
              id={skill.id}
              value={skill.value}
              removeTag={removeTag}
            />
          ))}
        </AnimatePresence>
      </Tags>
    </TagsContainer>
  );
};
