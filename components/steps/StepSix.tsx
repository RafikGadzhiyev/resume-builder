import {useDispatch, useSelector} from "react-redux";
import {AnimatePresence} from "framer-motion";
import {v4 as uuid4} from "uuid";
import {updateResume} from "../../state/slices/resume.slice";
import {Language} from "../Language";
import {WrapRow} from "../../elements/Layouts";
import {DescriptionContainer, StepTitle} from "../../elements/StepsUI";
import {AddDescriptionButton, NewLanguage} from "../../elements/Buttons";
import type {AppDispatch, RootState} from "../../state/store";

export const StepSix = () => {
	const resume = useSelector(
		(store: RootState) => store.resumeReducer.currentResume
	);
	const dispatch = useDispatch<AppDispatch>();

	const AddLanguageDescription = () => {
		dispatch(
			updateResume({
				...resume,
				languages: [
					...resume.languages,
					{
						id: uuid4(),
						language: "",
						level: "A1 - Beginner",
					},
				],
			})
		);
	};

	return (
		<DescriptionContainer>
			<StepTitle>Let&apos;s add some languages which you know</StepTitle>
			<WrapRow px="center" py="middle" gap={25}>
				<AnimatePresence>
					{resume.languages.map((language) => (
						<Language
							key={language.id}
							id={language.id}
							initialLevel={language.level}
						/>
					))}
				</AnimatePresence>
				<NewLanguage>
					<AddDescriptionButton
						variant="transparent"
						onClick={() => AddLanguageDescription()}
					>
						Add a language
					</AddDescriptionButton>
				</NewLanguage>
			</WrapRow>
		</DescriptionContainer>
	);
};
