import {Dispatch, FC, PropsWithChildren, SetStateAction, SyntheticEvent, useRef} from 'react';
import styled from "@emotion/styled";
import ResumePalette from "./../assets/pallets/pallete-1.svg";
import {Tooltip} from "@mui/material";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../state/store";
import {
	DeleteResume as DeleteResumeReducer,
	DuplicateResume as DuplicateResumeReducer,
} from "../state/reducers/resume.reducer";
import {motion} from "framer-motion";
import {ConvertOpacityToHEXRepresentation} from "../utils/convert";
import {BaseButton} from "../elements/Buttons";
import {useRouter} from "next/navigation";
import {FaBars} from 'react-icons/fa'
import {useFocus} from "../hooks/useFocus";

const Wrapper = styled(motion.div)`
  border-radius: 5px;
  background-color: ${(styles: any) =>
          styles.theme.textColor + ConvertOpacityToHEXRepresentation(10)};
  box-shadow: 0 0 15px -7px ${(styles: any) => styles.theme.textColor};
  height: var(--resumeHeight);
  background-image: url("${ResumePalette.src}");
  display: flex;
  flex-direction: column;
  width: var(--maxResumeWidth);
  align-items: flex-end;
  justify-content: space-between;
  padding: 1.5rem 0.5rem;
  position: relative;
  overflow: hidden;
  isolation: isolate;
`;

const Options = styled.div`
  background-color: ${(styles: any) =>
          styles.theme.primaryColor + ConvertOpacityToHEXRepresentation(75)};
  border-radius: 10px;
  z-index: -10;
  opacity: 0;
  display: flex;
  flex-direction: column;
  position: absolute;
  transition: 300ms linear 100ms;
  top: 1.5rem;
  right: .5rem;
  backdrop-filter: blur(5px);
`;

const OptionButton = styled(BaseButton)`
  --shadowColor: transparent;
  --backgroundColor: ${(styles: any) =>
          styles.theme.primaryColor + ConvertOpacityToHEXRepresentation(0)};
  font-size: 1rem;
  color: ${(styled: any) => styled.theme.textColor};
  padding: .3rem 1rem;
  border-radius: 0;
  width: 100%;
  box-sizing: border-box;

  &:first-of-type {
    border-radius: 10px 10px 0 0;
  }

  &:last-of-type {
    border-radius: 0 0 10px 10px;
  }

  &:hover {
    --backgroundColor: ${(styles: any) =>
            styles.theme.primaryColor + ConvertOpacityToHEXRepresentation(35)};
  }

`

const DeleteResume = styled(OptionButton)`
  --shadowColor: #ff3c3c;
  --backgroundColor: transparent;

  color: #ff5e5e;

  &:hover {
    --backgroundColor: #ff5e5e;
    color: #fff;
  }

`;

const OpenOptionButton = styled.button`
  all: unset;
  cursor: pointer;
  background-color: ${(styles: any) =>
          styles.theme.primaryColor + ConvertOpacityToHEXRepresentation(75)};
  box-sizing: border-box;
  border-radius: 10px;
  padding: .25rem;
  font-size: 1.5rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center
`

const TextBlock = styled.div`
  border-radius: 5px;
  backdrop-filter: blur(5px);
  display: flex;
  flex-direction: column;
  background-color: ${(styles: any) =>
          styles.theme.secondaryColor + ConvertOpacityToHEXRepresentation(75)};
  padding: 0.75rem 1rem;
  width: 100%;
`;

const ResumeTitle = styled.h2`
  border-bottom: 0.5px solid ${(styles: any) =>
          styles.theme.textColor + ConvertOpacityToHEXRepresentation(25)};
  white-space: pre;
  text-overflow: ellipsis;
  overflow: hidden;
`;


const Text = styled.span`
  font-size: 0.75rem;
`;

interface IProps extends PropsWithChildren {
	id: string;
	title: string;
	name: string;
	surname: string;
	created: string;
	setSuccessState: Dispatch<SetStateAction<string | null>>;
	setErrorState: Dispatch<SetStateAction<string | null>>;
}

export const UserResume: FC<IProps> = ({
   id,
   title,
   name,
   surname,
   created,
   setSuccessState,
   setErrorState,
}) => {
	const OptionButtonRef = useRef<HTMLButtonElement | null>(null);
	const isOpened = useFocus(OptionButtonRef);
	const dispatch = useDispatch<AppDispatch>();
	const user = useSelector((store: RootState) => store.authReducer.user);
	const resumes = useSelector(
		(store: RootState) => store.resumeReducer.resumes
	);
	const resumeIndex = resumes.findIndex((resume) => resume._id === id);
	const router = useRouter();

	const dispatchAction = (
		e: SyntheticEvent<HTMLButtonElement>,
		action: string
	): Promise<any> => {
		e.preventDefault();
		if (!user)
			return new Promise((_, reject) => reject("User does not exist!"));
		switch (action) {
			case "DELETE_RESUME":
				return dispatch(DeleteResumeReducer({userId: user.id, resumeId: id}));
			case "DUPLICATE_RESUME":
				return dispatch(
					DuplicateResumeReducer({
						userId: user.id,
						resume: {
							resume: resumes[resumeIndex],
							title: resumes[resumeIndex].title,
							owner: user.id,
						},
					})
				);
			default:
				return new Promise((_, reject) => reject("Action was not found!"));
		}
	};

	return (
		<Wrapper layout>
			<OpenOptionButton ref={OptionButtonRef}>
				<FaBars/>
			</OpenOptionButton>
				<Options style = {isOpened ? {zIndex: 10, opacity: 1, transitionDelay: '0ms'} : {}}>
					<OptionButton onClick={() => router.push("/p/resume/view/" + id)}>
						Open
					</OptionButton>
					<OptionButton onClick={() => router.push("/p/resume/edit/" + id)}>
						Edit
					</OptionButton>
					<OptionButton
						onClick={(e) => {
							dispatchAction(e, "DUPLICATE_RESUME")
								.then(() => setSuccessState(() => "Successfully duplicated!"))
								.catch(() =>
									setErrorState(() => "Something went wrong during duplicating!")
								);
						}}
					>
						Duplicate
					</OptionButton>
					<DeleteResume
						onClick={(e) => {
							dispatchAction(e, "DELETE_RESUME")
								.then(() => setSuccessState(() => "Successfully deleted!"))
								.catch(() =>
									setErrorState(() => "Something went wrong during deleting!")
								);
						}}
					>
						Delete
					</DeleteResume>
				</Options>
			<TextBlock>
				<Tooltip title={<h2>{title}</h2>} followCursor>
					<ResumeTitle>{title}</ResumeTitle>
				</Tooltip>
				<div>
					<h4>
						{name} {surname}
					</h4>
					<Text>Created: {moment(created).format("LLL")}</Text>
				</div>
			</TextBlock>
		</Wrapper>
	);
};
