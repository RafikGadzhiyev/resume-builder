"use client";

import {
  FaChevronLeft,
  FaEnvelope, FaFilePdf,
  FaLocationArrow,
  FaPhone,
} from "react-icons/fa";
import { SkillsView } from "../../../../../../components/SkillsView";
import { AwardsView } from "../../../../../../components/AwardsView";
import { CertificatesView } from "../../../../../../components/CertificatesView";
import { LanguagesView } from "../../../../../../components/LanguagesView";
import {
  IEducation,
  IHobby,
  IResume,
  IWork,
} from "../../../../../../interfaces/resume.interface";
import { TagWrapper } from "../../../../../../elements/TagUI";
import { ExtraText } from "../../../../../../elements/Typography";
import { WorkExperience } from "../../../../../../components/WorkExperience";
import { EducationExperience } from "../../../../../../components/EducationExperience";
import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../state/store";
import { SERVER_BASE_URL } from "../../../../../../consts/request_data";
import { Loading } from "../../../../../../components/Loading";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const Container = styled.div`
  padding: 1rem;
  display: grid;
  height: 100vh;
  max-height: 100vh;
  grid-template-columns: 20% auto;
  gap: 1rem;
  overflow-x: hidden;
  color: ${(styles: any) => styles.theme.textColor};
  
  @media screen and (max-width: 900px){
    grid-template-columns: 30% auto;
  } 
  @media screen and (max-width: 625px){
    //grid-template-columns: 40% auto;
    grid-template-columns: 1fr;
  }
  
`;

const PersonalDataBlock = styled(motion.div)`
  background-color: ${(styles: any) => styles.theme.secondaryColor};
  border-radius: 10px;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  max-height: inherit;
  overflow-y: auto;
  position: relative;
`;
const MainDataBlock = styled(motion.div)`
  background-color: ${(styles: any) => styles.theme.secondaryColor};
  border-radius: 10px;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  max-height: inherit;
  overflow-y: auto;
  @media screen and (max-width: 625px) {
    grid-row: 1;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-bottom: .5rem
`;

const GoBackLink = styled(Link)`
  all: unset;
  cursor: pointer;
  position: sticky;
  z-index: 101;
  background-color: ${(styles: any) => styles.theme.secondaryColor};
  width: 100%;
  display: block;
  top: -0.5rem;
  left: 0;
  font-size: 1.2rem;
`;

const DataBlock = styled.div`
  margin-block: 1rem;
`;

const Row = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
  align-items: flex-end;
`;

const BlockTitle = styled.h2`
  //margin-bottom: 1rem;
`;
const Languages = styled.div``;

const OwnerData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Wrapper = styled.div``;
const Contacts = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;
  //justify-content: space-around;
  margin-top: 2rem;
`;

const Contact = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DPI = styled.div`
  width: 1in;
  height: 1in;
  position: absolute;
  left: -100%;
  top: -100%;
`;

const PDFButton = styled.button`
  all: unset;
  cursor: pointer;
  font-size: 2rem;
`

export default function ResumeView() {
  const router = useRouter();
  const DPIRef = React.useRef<HTMLDivElement | null>(null);
  const personalRef = React.useRef<HTMLDivElement | null>(null);
  const mainRef = React.useRef<HTMLDivElement | null>(null);
  const { resume_id } = useParams();
  const resumes = useSelector(
    (store: RootState) => store.resumeReducer.resumes
  );
  const [openedResume, setOpenedResume] = React.useState<IResume | null>(null);
  const one = React.useRef(1);

  React.useEffect(() => {
    if (resumes.length === 0) {
      if (one.current) {
        one.current--;
        fetch(`${SERVER_BASE_URL}/resume?id=${resume_id}`).then((response) => {
          response.json().then((data) => setOpenedResume(() => data.resume));
        });
      }
    } else {
      setOpenedResume(
        () => resumes[resumes.findIndex((resume) => resume._id === resume_id)]
      );
    }
  }, [resumes, resume_id]);

  if (resume_id === undefined)
    return <h1>View cannot be due to invalid resume id</h1>;

  if (openedResume === null)
    return <Loading>Parsing your Resume!Please, wait!</Loading>;

  return (
    <Container>
      <DPI ref={DPIRef} />
      <>
        <PersonalDataBlock
          initial={{
            x: -75,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          ref={personalRef}
        >
          <GoBackLink href="/p/profile">
            <FaChevronLeft />
          </GoBackLink>
          <SkillsView skills={openedResume.skills} />
          <AwardsView awards={openedResume.awards} />
          <CertificatesView certificates={openedResume.certificates} />
          <LanguagesView languages={openedResume.languages} />
          <DataBlock>
            <BlockTitle>Hobbies</BlockTitle>
            <Row>
              {openedResume.hobbies.length ? (
                openedResume.hobbies.map((hobby: IHobby) => (
                  <TagWrapper
                    key={hobby.id}
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                  >
                    {hobby.value}
                  </TagWrapper>
                ))
              ) : (
                <ExtraText>
                  Ops! Resume owner does not have any hobbies!
                </ExtraText>
              )}
            </Row>
          </DataBlock>
        </PersonalDataBlock>
        <MainDataBlock
          ref={mainRef}
          initial={{
            x: 75,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
        >
          {/*Change styles*/}
          <PDFButton
            onClick={() => {
              let personalHeight = personalRef.current?.scrollHeight,
                mainHeight = mainRef.current?.scrollHeight;
              // !TMP CODE
              let max = Math.max(personalHeight || 0, mainHeight || 0),
                height = Math.round(max * 0.75);
              router.push(`/p/resume/view/pdf/${resume_id}?height=${height}`);
            }}
          >
            <FaFilePdf/>
          </PDFButton>
          <Title>{openedResume.title}</Title>
          <OwnerData>
            <Wrapper>
              <BlockTitle>
                {openedResume.personalData.name}{" "}
                {openedResume.personalData.surname}
              </BlockTitle>
              <ExtraText
                style={{
                  position: "relative",
                  top: "-10px",
                }}
              >
                {openedResume.personalData.age} years old
              </ExtraText>
            </Wrapper>
            <p>{openedResume.extraData.bio}</p>
            <Contacts>
              <Contact>
                <FaEnvelope />
                <span>{openedResume.personalData.email}</span>
              </Contact>
              <Contact>
                <FaPhone />
                {openedResume.personalData.phoneNumber}
              </Contact>
              <Contact>
                <FaLocationArrow />
                {openedResume.extraData.location}
              </Contact>
            </Contacts>
          </OwnerData>
          <DataBlock>
            <BlockTitle
              style={{
                marginBlock: "2rem 1rem",
              }}
            >
              Work experience
            </BlockTitle>
            {openedResume.works.length ? (
              openedResume.works.map((work: IWork) => (
                <WorkExperience
                  key={work.id}
                  position={work.position}
                  company={work.company}
                  work_start={work.work_period.start}
                  location={work.location}
                  work_end={work.work_period.end}
                />
              ))
            ) : (
              <ExtraText>No work experience</ExtraText>
            )}
          </DataBlock>
          <DataBlock>
            <BlockTitle
              style={{
                marginBottom: "1rem",
              }}
            >
              Education
            </BlockTitle>
            {openedResume.education.length ? (
              openedResume.education.map((education: IEducation) => (
                <EducationExperience
                  key={education.id}
                  degree={education.degree}
                  education_end={education.year.end}
                  education_start={education.year.start}
                  faculty={education.faculty}
                  university={education.university}
                />
              ))
            ) : (
              <ExtraText>Does not have education </ExtraText>
            )}
          </DataBlock>
        </MainDataBlock>
      </>
    </Container>
  );
}
