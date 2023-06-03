import {KeyboardEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AnimatePresence} from "framer-motion";
import {v4 as uuid4} from "uuid";
import {updateResume} from "../../state/slices/resume.slice";
import {Tag} from "./Tag";
import {StepTitle} from "../../elements/StepsUI";
import {TagInput} from "../../elements/Inputs";
import {Tags, TagsContainer} from "../../elements/TagUI";
import type {AppDispatch, RootState} from "../../state/store";

export const StepSeven = () => {
	const dispatch: AppDispatch = useDispatch();
	const resume = useSelector((store: RootState) => store.resumeReducer.currentResume);

	const addNewTag = (e: KeyboardEvent<HTMLInputElement>) => {
		const {key} = e;
		const element = e.target as HTMLInputElement;
		if (key === "Enter") {
			let value = element.value.trim();
			if (value.length === 0) return;
			dispatch(
				updateResume({
					...resume,
					hobbies: [
						...resume.hobbies,
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
				hobbies: resume.hobbies.filter((hobby) => hobby.id !== removeId),
			})
		);
	};

	return (
		<TagsContainer>
			<StepTitle>Now I want to know What hobbies you have</StepTitle>
			<TagInput
				placeholder="Write your hobbie and hit enter to add it"
				onKeyDown={(e) => addNewTag(e)}
			/>
			<Tags>
				<AnimatePresence>
					{resume.hobbies.map((hobby) => (
						<Tag
							key={hobby.id}
							id={hobby.id}
							value={hobby.value}
							removeTag={removeTag}
						/>
					))}
				</AnimatePresence>
			</Tags>
		</TagsContainer>
	);
};
