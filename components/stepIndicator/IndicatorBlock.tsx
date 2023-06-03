import {FC, PropsWithChildren} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../../state/slices/resume.slice";
import { Container } from "../../elements/IndicatorUI";
import { IndicatorStyles } from "../../variants/indicator.variants";
import type { AppDispatch, RootState } from "../../state/store";
import type { IndicatorStates } from "../../types";

interface IProps extends PropsWithChildren {
  step: number;
  state: IndicatorStates;
}

export const IndicatorBlock: FC<IProps> = ({ step, state }) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentStep = useSelector(
    (store: RootState) => store.resumeReducer.currentStep
  );

  return (
    <Container
      initial="initial"
      animate={state}
      variants={IndicatorStyles}
      onClick={() => step !== currentStep && dispatch(setStep(step))}
      whileHover={step === currentStep ? "activeHover" : "hover"}
    ></Container>
  );
};
