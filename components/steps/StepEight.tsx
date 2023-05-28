import { v4 as uuid4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { RootState } from "../../state/store";
import { Education } from "../Education";
import { updateResume } from "../../state/slices/resume.slice";
import { getCurrentYear } from "../../utils/Date";
import { DescriptionContainer, StepTitle } from "../../elements/StepsUI";
import { AddDescriptionButton } from "../../elements/Buttons";

export const StepEight = () => {
  const dispatch = useDispatch();
  const resume = useSelector(
    (store: RootState) => store.resumeReducer.currentResume
  );
  const educations = resume.education;

  return (
    <DescriptionContainer>
      <StepTitle>Tell us your education journey 😉</StepTitle>
      <AnimatePresence>
        {educations.map((education, educationIndex) => (
          <Education
            key={education.id}
            index={educationIndex + 1}
            university={education.university}
            degree={education.degree}
            startYear={education.year.start}
            endYear={education.year.end}
            faculty={education.faculty}
          />
        ))}
      </AnimatePresence>
      <AddDescriptionButton
        variant="solid"
        onClick={() =>
          dispatch(
            updateResume({
              ...resume,
              education: [
                ...resume.education,
                {
                  id: uuid4(),
                  degree: "High School Diploma / G.E.D.",
                  faculty: "",
                  university: "",
                  year: {
                    start: getCurrentYear(),
                    end: getCurrentYear(),
                  },
                },
              ],
            })
          )
        }
      >
        Add new education place
      </AddDescriptionButton>
    </DescriptionContainer>
  );
};
