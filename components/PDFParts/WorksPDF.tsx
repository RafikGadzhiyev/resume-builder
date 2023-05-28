import { Text, View } from "@react-pdf/renderer";
import { PDFViewStyles } from "../../styles/PDFStyles";
import { IWork } from "../../interfaces/resume.interface";
import moment from "moment/moment";
import React from "react";

interface IProps {
  works: IWork[];
}

export const WorksPDF: React.FC<IProps> = ({ works }) => {
  return (
    <View
      style={{
        ...PDFViewStyles.column,
      }}
    >
      <Text
        style={{
          ...PDFViewStyles.title,
          marginTop: "20px",
        }}
      >
        Work experience
      </Text>
      {works.map((work: IWork) => (
        <View
          style={{ ...PDFViewStyles.column, marginBottom: "10px" }}
          key={work.id}
        >
          <Text style={{ ...PDFViewStyles.dataTitle }}>{work.company}</Text>
          <Text
            style={{
              ...PDFViewStyles.italicText,
              ...PDFViewStyles.text,
            }}
          >
            {work.position}
          </Text>
          <View style={{ ...PDFViewStyles.row }}>
            <Text
              style={{
                ...PDFViewStyles.extraText,
                ...PDFViewStyles.italicText,
              }}
            >
              {moment(work.work_period.start).format("LL")} -{" "}
              {moment(work.work_period.end).format("LL")}
            </Text>
            <Text
              style={{
                ...PDFViewStyles.extraText,
                ...PDFViewStyles.italicText,
              }}
            >
              {work.location}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};
