"use client";
import { useParams, usePathname, useRouter } from "next/navigation";
import { AppDispatch, RootState } from "../../../../../../state/store";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import {
  checkEmail,
  checkPhone,
  isPropertyEmpty,
} from "../../../../../../utils/isValid";
import { emailRegEx, phoneRegEx } from "../../../../../../consts/regexs";
import {
  ReadAllUserResumes,
  RecordResume,
  UpdateResume,
} from "../../../../../../state/reducers/resume.reducer";
import { IResume } from "../../../../../../interfaces/resume.interface";
import {
  __INIT__,
  changeResume,
  updateStep,
} from "../../../../../../state/slices/resume.slice";
import { Loading } from "../../../../../../components/Loading";
import { ErrorSnackBar } from "../../../../../../components/SnackBars";
import { ResumeTitle } from "../../../../../../components/ResumeTitle";
import { StepIndicator } from "../../../../../../components/stepIndicator/Indicator";
import { STEPS } from "../../../../../../states/steps.state";
import { FaTimes } from "react-icons/fa";
import { BaseButton } from "../../../../../../elements/Buttons";
import styled from "@emotion/styled";
import { ConvertOpacityToHEXRepresentation } from "../../../../../../utils/convert";

const Container = styled.div`
  --maxHeight: 75vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  flex-direction: column;
  padding: 1rem 17rem;
  gap: 1rem;
`;

const Steps = styled.div`
  background-color: ${(styles: any) => styles.theme.secondaryColor};
  width: 100%;
  border-radius: 5px;
  padding-block: 1rem;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  max-height: var(--maxHeight);
  overflow: hidden;
  position: relative;
  padding-bottom: 1.5rem;
`;

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  z-index: 100;
  padding-block: 0.5rem 1rem;
  background-color: ${(styles: any) => styles.theme.secondaryColor};
  position: absolute;
  justify-content: center;
  bottom: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 -5px 10px -2px ${(styles: any) => styles.theme.primaryColor};
`;
const BackButton = styled(BaseButton)`
  --backgroundColor: #ea4c44;
  --shadowColor: #c43e37;

  color: #fff;
`;

const StepsWrapper = styled.div`
  width: ${STEPS.length * 100}%;
  height: 100%;
  display: flex;
  transition: 300ms ease;
`;

const StepContainer = styled.div`
  width: ${100 / STEPS.length}%;
`;

const CreateResumeButton = styled(BaseButton)`
  --backgroundColor: #7f90ff;
  --shadowColor: #3f50c0;
  color: #fff;
`;

const CancelButton = styled(BaseButton)`
  --backgroundColor: ${(styles: any) => styles.theme.primaryColor};
  --shadowColor: ${(styles: any) =>
    styles.theme.primaryColor + ConvertOpacityToHEXRepresentation(50)};

  align-self: flex-start;
  margin: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  color: #fff;
  padding: 0.25rem;
  position: absolute;
  left: 0.5rem;
  font-size: 1.25rem;
  top: 0.5rem;
`;
export default function EditResume() {
  const { resume_id } = useParams();
  // const { pathname } = useLocation();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((store: RootState) => store.authReducer.user);
  const { currentStep, currentResume, error, isLoading, resumes } = useSelector(
    (store: RootState) => store.resumeReducer
  );
  const [validationError, setValidationError] = React.useState<null | string>(
    null
  );
  const createResume = () => {
    // name, surname, bio, location, gender, age, email, phoneNumber should not be empty and not valid
    if (
      isPropertyEmpty(currentResume.personalData.name) ||
      isPropertyEmpty(currentResume.personalData.surname) ||
      isPropertyEmpty(currentResume.personalData.phoneNumber) ||
      isPropertyEmpty(currentResume.personalData.gender) ||
      isPropertyEmpty(currentResume.personalData.email) ||
      isPropertyEmpty(currentResume.extraData.bio) ||
      isPropertyEmpty(currentResume.extraData.location)
    ) {
      setValidationError(
        () => "You have to write valida data on steps 1 and 2"
      );
      return false; // for right now
    }
    if (
      !checkEmail(currentResume.personalData.email, emailRegEx) ||
      !checkPhone(currentResume.personalData.phoneNumber, phoneRegEx)
    ) {
      setValidationError(() => "Invalid data");
      return false; // for right now
    }
    const constructedData = {};
    // console.log(JSON.stringify(resume, null, 4));
    if (user) {
      dispatch(
        RecordResume({
          resume: currentResume,
          title: currentResume.title,
          owner: user.id,
        })
      ).then(() => router.push("/p/profile"));
    }
  };

  const updateResume = (resumeId: string, newData: IResume, userId: string) => {
    dispatch(
      UpdateResume({
        resumeId: resumeId || "",
        newData: {
          resume: newData,
          title: newData.title,
          owner: userId,
        },
      })
    ).then(() => router.push("/p/profile"));
  };
  const preventTab = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.key;
    if (key === "Tab") {
      e.preventDefault();
      return;
    }
  };

  React.useEffect(() => {
    if (user) {
      if (resume_id === undefined) {
        dispatch(
          __INIT__({
            full_name: user.full_name,
            email: user.email,
          })
        );
      } else {
        if (resumes.length === 0) {
          dispatch(ReadAllUserResumes(user.id)).then(() =>
            dispatch(changeResume(resume_id))
          );
        } else {
          dispatch(changeResume(resume_id));
        }
      }
    }
  }, [user, dispatch, resumes.length, resume_id]);

  return (
    <Container>
      {isLoading && <Loading> Creating new resume</Loading>}
      <ErrorSnackBar error={error} />
      <ErrorSnackBar error={validationError} />
      <ResumeTitle />
      <StepIndicator totalSteps={STEPS.length} />
      <Steps>
        <CancelButton onClick={() => router.replace("/p/profile")}>
          <FaTimes />
        </CancelButton>
        <StepsWrapper
          onKeyDown={(e) => preventTab(e)}
          style={{
            marginLeft: `-${100 * currentStep}%`,
          }}
        >
          {STEPS.map(({ id, Component }) => (
            <StepContainer key={id}>
              <Component />
            </StepContainer>
          ))}
        </StepsWrapper>
        <Buttons>
          <BackButton
            onClick={() => dispatch(updateStep("prev"))}
            disabled={currentStep < 1}
          >
            Back
          </BackButton>
          {currentStep < STEPS.length - 1 ? (
            <BaseButton onClick={() => dispatch(updateStep("next"))}>
              Next
            </BaseButton>
          ) : pathname.includes("edit") ? (
            <CreateResumeButton
              onClick={() => {
                if (resume_id && user) {
                  updateResume(resume_id, currentResume, user.id);
                }
              }}
            >
              Update
            </CreateResumeButton>
          ) : (
            <CreateResumeButton onClick={() => createResume()}>
              Create
            </CreateResumeButton>
          )}
        </Buttons>
      </Steps>
    </Container>
  );
}
