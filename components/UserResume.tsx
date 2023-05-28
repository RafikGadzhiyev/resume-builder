import React from "react";
import styled from "@emotion/styled";
import ResumePalette from "./../assets/pallets/pallete-1.svg";
import { Tooltip } from "@mui/material";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import {
  DeleteResume as DeleteResumeReducer,
  DuplicateResume as DuplicateResumeReducer,
} from "../state/reducers/resume.reducer";
import { motion } from "framer-motion";
import { SuccessSnackBar } from "./SnackBars";
import { ConvertOpacityToHEXRepresentation } from "../utils/convert";
import { BaseButton } from "../elements/Buttons";
import { useRouter } from "next/navigation";

const Wrapper = styled(motion.div)`
  border-radius: 5px;
  background-color: ${(styles: any) =>
    styles.theme.textColor + ConvertOpacityToHEXRepresentation(10)};
  box-shadow: 0 0 15px -7px ${(styles: any) => styles.theme.textColor};
  height: var(--resumeHeight);
  background-image: url("${ResumePalette.src}");
  display: flex;
  width: var(--maxResumeWidth);
  align-items: flex-end;
  padding: 1.5rem 0.5rem;
  position: relative;
  overflow: hidden;

  &:hover > div {
    opacity: 1;
  }
`;

const Options = styled.div`
  --optionWidth: 80px;

  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: 300ms ease-in;
  background-color: ${(styles: any) =>
    styles.theme.primaryColor + ConvertOpacityToHEXRepresentation(75)};
  backdrop-filter: blur(5px);
  z-index: 4;
  opacity: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
`;

const DeleteResume = styled(BaseButton)`
  --shadowColor: #ff3c3c;
  --backgroundColor: #ff5e5e;
  color: #fff;

  margin: 0;
  width: var(--optionWidth);
`;

const DuplicateResume = styled(BaseButton)`
  --shadowColor: #b73cff;
  --backgroundColor: #bf5eff;
  color: #fff;

  margin: 0;
  width: var(--optionWidth);
`;
const OpenResume = styled(BaseButton)`
  --shadowColor: #555eff;
  --backgroundColor: #8475ff;

  color: #fff;
  margin: 0;
  width: var(--optionWidth);
`;

const EditResume = styled(BaseButton)`
  width: var(--optionWidth);
`;

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
  border-bottom: 0.5px solid
    ${(styles: any) =>
      styles.theme.textColor + ConvertOpacityToHEXRepresentation(25)};
  white-space: pre;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const OwnerDataBlock = styled.div``;
const OwnerName = styled.h4``;

const Text = styled.span`
  font-size: 0.75rem;
`;
interface IProps extends React.PropsWithChildren {
  id: string;
  title: string;
  name: string;
  surname: string;
  created: string;
  setSuccessState: React.Dispatch<React.SetStateAction<string | null>>;
  setErrorState: React.Dispatch<React.SetStateAction<string | null>>;
}

export const UserResume: React.FC<IProps> = ({
  id,
  title,
  name,
  surname,
  created,
  setSuccessState,
  setErrorState,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((store: RootState) => store.authReducer.user);
  const resumes = useSelector(
    (store: RootState) => store.resumeReducer.resumes
  );
  const resumeIndex = resumes.findIndex((resume) => resume._id === id);
  const router = useRouter();

  const dispatchAction = (
    e: React.SyntheticEvent<HTMLButtonElement>,
    action: string
  ): Promise<any> => {
    e.preventDefault();
    if (!user)
      return new Promise((_, reject) => reject("User does not exist!"));
    switch (action) {
      case "DELETE_RESUME":
        return dispatch(DeleteResumeReducer({ userId: user.id, resumeId: id }));
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
      <Options>
        <OpenResume onClick={() => router.push("/p/resume/view/" + id)}>
          Open
        </OpenResume>
        <EditResume onClick={() => router.push("/p/resume/edit/" + id)}>
          Edit
        </EditResume>
        <DuplicateResume
          onClick={(e) => {
            dispatchAction(e, "DUPLICATE_RESUME")
              .then(() => setSuccessState(() => "Successfully duplicated!"))
              .catch(() =>
                setErrorState(() => "Something went wrong during duplicating!")
              );
          }}
        >
          Duplicate
        </DuplicateResume>
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
        <OwnerDataBlock>
          <OwnerName>
            {name} {surname}
          </OwnerName>
          <Text>Created: {moment(created).format("LLL")}</Text>
        </OwnerDataBlock>
      </TextBlock>
    </Wrapper>
  );
};
