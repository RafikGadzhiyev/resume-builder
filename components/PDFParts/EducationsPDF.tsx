import React from "react";
import { PDFViewStyles } from "../../styles/PDFStyles";
import { Text, View } from "@react-pdf/renderer";
import { IEducation } from "../../interfaces/resume.interface";

interface IProps {
  educations: IEducation[];
}

export const EducationsPDF: React.FC<IProps> = ({ educations }) => {
  return (
    <View
      style={{
        ...PDFViewStyles.column,
        marginTop: "10px",
      }}
    >
      <Text style={PDFViewStyles.title}>Education</Text>
      {educations.map((education: IEducation) => (
        <View key={education.id} style={{ marginBottom: "10px" }}>
          <Text
            style={{
              ...PDFViewStyles.dataTitle,
            }}
          >
            {education.university}
          </Text>
          <View
            style={{
              ...PDFViewStyles.row,
              ...PDFViewStyles.italicText,
            }}
          >
            <Text style={PDFViewStyles.text}>{education.faculty}</Text>
            <Text
              style={{
                ...PDFViewStyles.extraText,
                ...PDFViewStyles.text,
              }}
            >
              {education.degree}
            </Text>
          </View>
          <Text
            style={{
              ...PDFViewStyles.text,
              ...PDFViewStyles.italicText,
              ...PDFViewStyles.extraText,
            }}
          >
            {education.year.start}-{education.year.end}
          </Text>
        </View>
      ))}
    </View>
  );
};
