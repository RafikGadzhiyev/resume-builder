"use client";
import styled from "@emotion/styled";
import TestProfileImage from "./../../../../assets/icons/profile_test_image.svg";
import { BaseButton } from "../../../../elements/Buttons";
import { ConvertOpacityToHEXRepresentation } from "../../../../utils/convert";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../state/store";
import { useSort } from "../../../../hooks/useFilter";
import { IResume } from "../../../../interfaces/resume.interface";
import { useRouter } from "next/navigation";
import { useFocus } from "../../../../hooks/useFocus";
import { ReadAllUserResumes } from "../../../../state/reducers/resume.reducer";
import {
  ErrorSnackBar,
  SuccessSnackBar,
} from "../../../../components/SnackBars";
import React from "react";
import { AnimatePresence } from "framer-motion";
import { Palette } from "../../../../components/Palette";
import { Loading } from "../../../../components/Loading";
import { Filter } from "../../../../components/Filter";
import { UserResume } from "../../../../components/UserResume";

const Container = styled.div`
  --headerHeight: 4.5rem;
  display: grid;
  grid-template-rows: var(--headerHeight);
`;

const Header = styled.header`
  transition: 300ms ease;
  background-color: ${(styles: any) => styles.theme.secondaryColor};
  color: ${(styles: any) => styles.theme.textColor};
  padding-block: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;

const ProfileImageContainer = styled.div`
  width: 2.5rem;
  height: 100%;
  display: flex;
`;

const ProfileImage = styled.img`
  width: 100%;
  border-radius: 50%;
`;

const ProfileNameContainer = styled.div`
  font-size: 1.25rem;
`;
const ThemeSwitchBlock = styled.div`
  position: relative;
`;
const ThemeSwitch = styled(BaseButton)`
  padding: 0.5rem 0.25rem;
  transition: 300ms ease;
  position: relative;
  --backgroundColor: ${(styles: any) => styles.theme.accentColors.info};
  --shadowColor: ${(styles: any) =>
    styles.theme.accentColors.info + ConvertOpacityToHEXRepresentation(50)};
`;

const ContentContainer = styled.div`
  height: 100%;
  min-height: calc(100vh - var(--headerHeight));
  width: 100%;
  transition: 300ms ease;
  background-color: ${(styles: any) => styles.theme.primaryColor};
  padding: 2rem 8rem;
  display: flex;
  color: ${(styles: any) => styles.theme.textColor};
  flex-direction: column;

  @media screen and (max-width: 1250px) {
    padding: 2rem 4rem;
  }
  @media screen and (max-width: 775px) {
    padding: 2rem 1rem;
  }
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Resumes = styled.div`
  --resumeHeight: 20rem;
  --maxResumeWidth: 15rem;

  display: flex;
  gap: 1rem 0.5rem;
  width: fit-content;
  flex-wrap: wrap;
  margin-top: 1rem;
  justify-content: center;

  @media screen and (max-width: 660px) {
    --maxResumeWidth: 10rem;
    --resumeHeight: 15rem;
  }
`;
const CreateResumeButton = styled.button`
  all: unset;
  cursor: pointer;
  font-size: 0.75rem;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1.5px dashed
    ${(styles: any) =>
      styles.theme.textColor + ConvertOpacityToHEXRepresentation(50)};
  transition: 300ms ease;
  padding: 2rem;
  display: flex;
  max-width: var(--maxResumeWidth);
  align-items: center;
  justify-content: center;
  height: var(--resumeHeight);
  color: ${(styles: any) =>
    styles.theme.textColor + ConvertOpacityToHEXRepresentation(50)};
  letter-spacing: 2px;

  &:hover {
    border-color: ${(styles: any) =>
      styles.theme.textColor + ConvertOpacityToHEXRepresentation(75)};
    color: ${(styles: any) =>
      styles.theme.textColor + ConvertOpacityToHEXRepresentation(75)};
  }

  &:active {
    border-color: ${(styles: any) =>
      styles.theme.textColor + ConvertOpacityToHEXRepresentation(100)};
    color: ${(styles: any) =>
      styles.theme.textColor + ConvertOpacityToHEXRepresentation(100)};
  }
`;

const WelcomeText = styled.span`
  @media screen and (max-width: 650px) {
    display: none;
  }
`;
export default function Profile() {
  const [successState, setSuccessState] = React.useState<null | string>(null);
  const [errorState, setErrorState] = React.useState<null | string>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { resumes, isLoading } = useSelector(
    (store: RootState) => store.resumeReducer
  );
  const { state, sort, reset, updateState } = useSort<IResume>(resumes);
  const user = useSelector((store: RootState) => store.authReducer.user);
  const router = useRouter();
  const one = React.useRef(1);
  const PaletteRef = React.useRef<HTMLButtonElement | null>(null);
  const currentPaletteFocus = useFocus(PaletteRef);

  React.useEffect(() => {
    if (one.current && user) {
      one.current--;
      dispatch(ReadAllUserResumes(user.id))
        .then(() => setSuccessState(() => "Successful parsed all resumes!"))
        .catch(() =>
          setErrorState(() => "Something was wrong while parsing all records!")
        );
    }
  }, [user, dispatch]);

  return (
    <>
      <Container>
        <SuccessSnackBar message={"Test"} />
        {successState && <SuccessSnackBar message={successState} />}
        {errorState && <ErrorSnackBar error={errorState} />}
        <Header>
          <ProfileImageContainer>
            <ProfileImage src={TestProfileImage.src} />
          </ProfileImageContainer>
          <ProfileNameContainer>
            <WelcomeText>Welcome back, {user?.full_name}</WelcomeText>
          </ProfileNameContainer>
          <ThemeSwitchBlock>
            <ThemeSwitch ref={PaletteRef} as={ThemeSwitch}>
              Change theme
            </ThemeSwitch>
            <AnimatePresence>
              {currentPaletteFocus && <Palette />}
            </AnimatePresence>
          </ThemeSwitchBlock>
        </Header>
        <ContentContainer>
          <TopBar>
            <span>Your resumes:</span>
            <Filter updateState={updateState} sort={sort} reset={reset} />
          </TopBar>
          <Resumes>
            {isLoading ? (
              <Loading>Reading all resumes</Loading>
            ) : (
              <>
                {state.map((res: any) => (
                  <UserResume
                    key={res._id}
                    id={res._id}
                    title={res.title}
                    name={res.name}
                    surname={res.surname}
                    created={res.createdAt}
                    setErrorState={setErrorState}
                    setSuccessState={setSuccessState}
                  />
                ))}
                <CreateResumeButton
                  onClick={() => router.push("/p/resume/new")}
                >
                  Create new Resume
                </CreateResumeButton>
              </>
            )}
          </Resumes>
        </ContentContainer>
      </Container>
    </>
  );
}
