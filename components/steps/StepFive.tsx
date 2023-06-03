import {AnimatePresence} from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
import {v4 as uuid4} from "uuid";
import {updateResume} from "../../state/slices/resume.slice";
import {Description} from "../Description";
import {DescriptionContainer, DescriptionList, StepTitle} from "../../elements/StepsUI";
import {AddDescriptionButton} from "../../elements/Buttons";
import type {AppDispatch, RootState} from "../../state/store";

export const StepFive = () => {
	const dispatch: AppDispatch = useDispatch();
	const resume = useSelector((store: RootState) => store.resumeReducer.currentResume);
	const {certificates} = resume;

	const addNewCertificate = () => {
		dispatch(
			updateResume({
				...resume,
				certificates: [
					...certificates,
					{
						type: "certification",
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
			<StepTitle>What about certificates ?</StepTitle>
			<DescriptionList>
				<AnimatePresence>
					{certificates.map((certification, index) => (
						<Description
							descriptionType="certification"
							key={certification.id}
							index={index + 1}
							itemId={certification.id}
						/>
					))}
				</AnimatePresence>
			</DescriptionList>
			<AddDescriptionButton onClick={() => addNewCertificate()} variant="solid">
				Add a certification
			</AddDescriptionButton>
		</DescriptionContainer>
	);
};
