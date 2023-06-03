import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { v4 as uuid4 } from "uuid";
import { Work } from "../Work";
import { RootState } from "../../state/store";
import { updateResume } from "../../state/slices/resume.slice";
import { AddDescriptionButton } from "../../elements/Buttons";
import { DescriptionContainer, StepTitle } from "../../elements/StepsUI";

export const StepNine = () => {
  const dispatch = useDispatch();
  const resume = useSelector((store: RootState) => store.resumeReducer.currentResume);

  const createNewWork = () => {
    dispatch(
      updateResume({
        ...resume,
        works: [
          ...resume.works,
          {
            id: uuid4(),
            position: "",
            company: "",
            location: "",
            work_period: {
              start: "",
              end: null,
            },
            achievements: [],
          },
        ],
      })
    );
  };

  return (
    <DescriptionContainer>
      <StepTitle>Last step - Your work experience</StepTitle>
      <AnimatePresence>
        {resume.works.map((work, index) => (
          <Work key={work.id} index={index} />
        ))}
      </AnimatePresence>
      <AddDescriptionButton variant="solid" onClick={() => createNewWork()}>
        Add new work place
      </AddDescriptionButton>
    </DescriptionContainer>
  );
};
