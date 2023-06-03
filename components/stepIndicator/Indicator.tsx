import {FC, PropsWithChildren} from "react";
import {useSelector} from "react-redux";
import {STEPS} from "../../consts/steps";
import {IndicatorBlock} from "./IndicatorBlock";
import {IndicatorContainer, Wrapper} from "../../elements/IndicatorUI";
import type {RootState} from "../../state/store";

interface IProps extends PropsWithChildren {
	totalSteps: number;
}

export const StepIndicator: FC<IProps> = ({totalSteps}) => {
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
					/>
				))}
			</Wrapper>
			<span>
        {currentStep + 1} / {totalSteps}
      </span>
		</IndicatorContainer>
	);
};
