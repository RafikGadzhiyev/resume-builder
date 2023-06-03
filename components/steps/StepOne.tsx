import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Inputs } from "./StepOneInputs";
import { Genders } from "./Gender";
import { useDebounce } from "../../hooks/useDebounce";
import { RootState } from "../../state/store";
import { updateResume } from "../../state/slices/resume.slice";
import {
  StepContainer,
  StepDescription,
  StepTitle,
} from "../../elements/StepsUI";
import { StepForm } from "../../elements/FormUI";

export const StepOne = () => {
  const resume = useSelector(
    (store: RootState) => store.resumeReducer.currentResume
  );
  const dispatch = useDispatch();
  const [bio, setBio] = useState("");
  const debouncedBio = useDebounce(bio, 500, true);

  useEffect(() => {
    dispatch(
      updateResume({
        ...resume,
        extraData: {
          ...resume.extraData,
          bio: debouncedBio,
        },
      })
    );
  }, [debouncedBio, dispatch]);

  return (
    <StepContainer>
      <StepTitle>Let us to know a little bit about you and your life</StepTitle>
      <StepForm>
        <Inputs />
        <Genders />
        <StepDescription
          placeholder="Write a little description about your life....."
          value={bio}
          onChange={(e) => setBio(() => e.target.value)}
        ></StepDescription>
      </StepForm>
    </StepContainer>
  );
};
