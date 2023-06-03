import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "@emotion/styled";
import {FormControlLabel, RadioGroup} from "@mui/material";
import {useDebounce} from "../../hooks/useDebounce";
import {updateResume} from "../../state/slices/resume.slice";
import {StepRadio} from "../../elements/StepsUI";
import type {Genders as TGenders} from "../../types";
import type {AppDispatch, RootState} from "../../state/store";

const CustomRadioGroup = styled(RadioGroup)`
  flex-direction: row;
  grid-column: 2/-1;

  @media screen and (max-width: 480px) {
    grid-column: 1/-1;
  }

`

export const Genders = () => {
	const resume = useSelector((store: RootState) => store.resumeReducer.currentResume);
	const dispatch = useDispatch<AppDispatch>();
	const [gender, setGender] = useState<TGenders>(resume.personalData.gender);

	const debouncedGenderValue = useDebounce(gender, 500, false);

	useEffect(() => {
		dispatch(
			updateResume({
				...resume,
				personalData: {
					...resume.personalData,
					gender: debouncedGenderValue,
				},
			})
		);
	}, [dispatch, debouncedGenderValue]);

	return (
		<CustomRadioGroup
			onChange={(e) => {
				let value: TGenders = e.target.value as TGenders;

				setGender(() => value);
			}}
			value={gender}
		>
			<FormControlLabel value="male" control={<StepRadio/>} label="Male"/>
			<FormControlLabel value="female" control={<StepRadio/>} label="Female"/>
			<FormControlLabel value="other" control={<StepRadio/>} label="Other"/>
		</CustomRadioGroup>
	);
};
