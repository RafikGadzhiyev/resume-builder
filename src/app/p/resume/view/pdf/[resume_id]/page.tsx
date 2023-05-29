"use client";

import React from "react";
import {
  Document,
  Page,
  PDFViewer,
  Text,
  View,
  Font,
} from "@react-pdf/renderer";
import styled from "@emotion/styled";
import {
  IEducation,
  IResume,
  IWork,
} from "../../../../../../../interfaces/resume.interface";
import { Loading } from "../../../../../../../components/Loading";
import { SERVER_BASE_URL } from "../../../../../../../consts/request_data";
import { PDFViewStyles } from "../../../../../../../styles/PDFStyles";
import { TagsPDF } from "../../../../../../../components/PDFParts/TagsPDF";
import { DescriptionsPDF } from "../../../../../../../components/PDFParts/DescriptionsPDF";
import { LanguagesPDF } from "../../../../../../../components/PDFParts/LanguagesPDF";
import { SVG_PDF } from "../../../../../../../components/PDFParts/SVG_PDF";
import { SVG_AS_STRING } from "../../../../../../../consts/SVG";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../../../state/store";
import moment from "moment";
import { WorksPDF } from "../../../../../../../components/PDFParts/WorksPDF";
import { EducationsPDF } from "../../../../../../../components/PDFParts/EducationsPDF";
import { useParams, useSearchParams } from "next/navigation";
import { ReadAllUserResumes } from "../../../../../../../state/reducers/resume.reducer";

const PDFContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

// TODO: create async thunk
// TODO: Register font
export default function PDFView() {
  const { resume_id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((store: RootState) => store.authReducer.user);
  const resumes = useSelector(
    (store: RootState) => store.resumeReducer.resumes
  );
  const [resume, setResume] = React.useState<null | IResume>(null);
  const queries = useSearchParams();
  const one = React.useRef(1);

  React.useEffect(() => {
    if (one.current) {
      one.current--;
      fetch(`${SERVER_BASE_URL}/resume?id=${resume_id}`).then((response) => {
        response.json().then((data) => setResume(() => data.resume));
      });
    }
  }, [resume_id]);

  React.useEffect(() => {
    if (resumes.length) {
      for (let i = 0; i < resumes.length; ++i) {
        if (resumes[i]._id === resume_id) {
          setResume(() => resumes[i]);
          break;
        }
      }
    }
  }, [resumes, resume_id]);
  if (resume_id === undefined)
    return <h1>Resume is not defined! Please, try to open another resume!</h1>;
  if (resume === null) return <Loading>Parsing resume</Loading>;
  return (
    <PDFContainer>
      <PDFViewer height="100%" width="100%" showToolbar={true}>
        <Document title={resume.title} author={user?.given_name}>
          <Page size="A4" wrap style={PDFViewStyles.view}>
            <View
              style={{
                ...PDFViewStyles.personalDataBlock,
                height: queries.get("height") + "px",
              }}
            >
              <TagsPDF tags={resume.skills} type="skills" />
              <DescriptionsPDF descriptions={resume.awards} type="award" />
              <DescriptionsPDF
                descriptions={resume.certificates}
                type="certification"
              />
              <LanguagesPDF languages={resume.languages} />
              <TagsPDF tags={resume.hobbies} type="hobbies" />
            </View>
            <View
              style={{
                ...PDFViewStyles.mainDataBlock,
                height: queries.get("height") + "px",
              }}
            >
              <Text
                style={{
                  ...PDFViewStyles.title,
                  textAlign: "center",
                }}
              >
                {resume.title} 123
              </Text>
              <Text>
                {resume.personalData.surname + " " + resume.personalData.name}
              </Text>
              <Text style={PDFViewStyles.extraText}>
                {resume.personalData.age + " years old"}
              </Text>
              <Text
                style={{
                  ...PDFViewStyles.text,
                  marginTop: "20px",
                }}
              >
                {resume.extraData.bio}
              </Text>
              <View
                style={{
                  ...PDFViewStyles.row,
                  alignItems: "center",
                  gap: "25px",
                }}
              >
                <SVG_PDF
                  icon={SVG_AS_STRING.envelope}
                  data={resume.personalData.email}
                />
                <SVG_PDF
                  icon={SVG_AS_STRING.phone}
                  data={resume.personalData.phoneNumber}
                />
                <SVG_PDF
                  icon={SVG_AS_STRING.location}
                  data={resume.extraData.location}
                />
              </View>
              <WorksPDF works={resume.works} />
              <EducationsPDF educations={resume.education} />
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </PDFContainer>
  );
}

// A4 - 821px
