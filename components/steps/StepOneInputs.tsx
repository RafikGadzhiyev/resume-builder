import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useDebounce} from "../../hooks/useDebounce";
import styled from "@emotion/styled";
import {isInputEmpty} from "../../utils/isValid";
import {AppDispatch, RootState} from "../../state/store";
import {updateResume} from "../../state/slices/resume.slice";
import {Input} from "../../elements/Inputs";

const StepInputWrapper = styled.div`
  --backgroundColor: rgb(118 118 128 / 0.25);
  --boxShadowHoverState: 0 0 0 2px rgb(15 255 19 / 0.25);
  --boxShadowFocusState: 0 0 0 2px rgb(15 255 19 / 0.5);
  --placeholderColor: rgb(235 235 245 / 0.6);

  width:100%;
  
  &.error {
    --boxShadowHoverState: 0 0 0 3px red;
    --boxShadowFocusState: 0 0 0 3px red;
    --backgroundColor: #e94c44;

    position: relative;

    &::before {
      --fontSize: 0.6rem;
      content: attr(data-field_name) " field must be filled";
      position: absolute;
      bottom: calc(var(--fontSize) * -1.3);
      font-size: var(--fontSize);
      left: 10px;
      color: red;
    }
  }

  &.step_one-fields-first_row {
    @media screen and (max-width: 710px) {
      grid-column: 1/3;
    }
  }
  &.step_one-fields-first_row-last_input {
    @media screen and (max-width: 710px) {
      grid-column: 3/5;
    }
  }
  &.step_one-fields-second_row-input {
    @media screen and (max-width: 485px) {
		grid-column: 5/7;
    }
  }
`;

export const Inputs = () => {
	const resumeData = useSelector(
		(store: RootState) => store.resumeReducer.currentResume
	);
	const dispatch = useDispatch<AppDispatch>();
	const [inputErrors, setInputErrors] = useState([false, false, false]);
	const [nameInput, setNameInput] = useState("");
	const [lastName, setLastName] = useState("");
	const [age, setAge] = useState(0);

	const debouncedNameValue = useDebounce(nameInput, 500, false);
	const debouncedLastnameValue = useDebounce(lastName, 500, false);
	const debouncedAgeValue = useDebounce(age, 500, false);

	const InputChangeHandler = (
		e: React.FormEvent<HTMLInputElement>,
		dispatcher: React.Dispatch<React.SetStateAction<string>>
	) => {
		let {value} = e.target as HTMLInputElement;
		if (value[value.length - 1] === " " && value[value.length - 2] === " ")
			return;
		dispatcher(() => value);
	};
	const CheckIsInputFilled = (
		e: React.FocusEvent<HTMLInputElement>,
		inputId: number
	) => {
		let eventTarget = e.target;
		const errors = inputErrors;
		if (isInputEmpty(eventTarget)) {
			errors[inputId] = true;
		}
		setInputErrors(() => [...errors]);
	};

	useEffect(() => {
		setNameInput(() => resumeData.personalData.name);
		setLastName(() => resumeData.personalData.surname);
	}, [resumeData.personalData.name, resumeData.personalData.surname]);

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>;
		if (inputErrors.some((element) => element)) {
			timer = setTimeout(() => {
				setInputErrors((prev) => Array(prev.length).fill(false));
			}, 2500);
		}
		return () => clearTimeout(timer);
	}, [inputErrors]);

	useEffect(() => {
		dispatch(
			updateResume({
				...resumeData,
				personalData: {
					...resumeData.personalData,
					name: debouncedNameValue,
					surname: debouncedLastnameValue,
					age: debouncedAgeValue,
				},
			})
		);
	}, [dispatch, debouncedLastnameValue, debouncedNameValue, debouncedAgeValue]);

	return (
		<>
			<StepInputWrapper
				className={`${inputErrors[0] ? "error" : ""} step_one-fields-first_row`}
				data-field_name="Name"
			>
				<Input
					placeholder="Your first name"
					value={nameInput}
					onInput={(e) => InputChangeHandler(e, setNameInput)}
					onBlur={(e) => CheckIsInputFilled(e, 0)}
				/>
			</StepInputWrapper>
			<StepInputWrapper
				className={`${inputErrors[1] ? "error" : ""} step_one-fields-first_row-last_input`}
				data-field_name="Last name"
			>
				<Input
					placeholder="Your last name"
					value={lastName}
					onInput={(e) => InputChangeHandler(e, setLastName)}
					onBlur={(e) => CheckIsInputFilled(e, 1)}
				/>
			</StepInputWrapper>
			<StepInputWrapper
				className={`${inputErrors[2] ? "error" : ""} step_one-fields-second_row-input` }
				data-field_name="Age"
			>
				<Input
					placeholder="Age"
					min={0}
					max={140}
					type="number"
					value={age ? age : ""}
					onInput={(e) =>
						setAge(() => parseInt((e.target as HTMLInputElement).value))
					}
					onBlur={(e) => CheckIsInputFilled(e, 2)}
				/>
			</StepInputWrapper>
		</>
	);
};
