import React from "react";
import { useSelector } from "react-redux";
import { STEPS } from "../../states/steps.state";
import { IndicatorBlock } from "./IndicatorBlock";
import { IndicatorContainer, Wrapper } from "../../elements/IndicatorUI";
import type { RootState } from "../../state/store";

interface IProps extends React.PropsWithChildren {
  totalSteps: number;
}

export const StepIndicator: React.FC<IProps> = ({ totalSteps }) => {
  const currentStep = useSelector(
    (store: RootState) => store.resumeReducer.currentStep
  );
  return (
    <IndicatorContainer>
      <Wrapper>
        {STEPS.map((_, index) => (
          <IndicatorBlock
            key={_.id}
            step={index}
            state={index === currentStep ? "active" : "inactive"}
            // state={index === currentStep ? 'active' : index - 1 === currentStep ? 'next' : index + 1 === currentStep ? 'previous' : 'inactive'}
          />
        ))}
      </Wrapper>
      <span>
        {currentStep + 1} / {totalSteps}
      </span>
    </IndicatorContainer>
  );
};
