import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { v4 as uuid4 } from "uuid";
import { IDescription } from "../../interfaces/steps.interface";
import { Description } from "../Description";
import { updateResume } from "../../state/slices/resume.slice";
import {
  DescriptionContainer,
  DescriptionList,
  StepTitle,
} from "../../elements/StepsUI";
import { AddDescriptionButton } from "../../elements/Buttons";
import type { AppDispatch, RootState } from "../../state/store";

export const StepFour = () => {
  const dispatch: AppDispatch = useDispatch();
  const resume = useSelector(
    (store: RootState) => store.resumeReducer.currentResume
  );
  const { awards } = resume;

  const addNewAward = () => {
    dispatch(
      updateResume({
        ...resume,
        awards: [
          ...awards,
          {
            type: "award",
            id: uuid4(),
            title: "",
            description: "",
            year: 0,
            from: "",
          },
        ],
      })
    );
  };

  return (
    <DescriptionContainer>
      <StepTitle>Show us your awards</StepTitle>
      <DescriptionList>
        <AnimatePresence>
          {awards.map((e: IDescription, index) => (
            <Description
              descriptionType="award"
              key={e.id}
              index={index + 1}
              itemId={e.id}
            />
          ))}
        </AnimatePresence>
      </DescriptionList>
      <AddDescriptionButton onClick={() => addNewAward()} variant="solid">
        Add an award
      </AddDescriptionButton>
    </DescriptionContainer>
  );
};
