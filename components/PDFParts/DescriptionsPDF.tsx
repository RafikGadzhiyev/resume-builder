import React from "react";
import { PDFViewStyles } from "../../styles/PDFStyles";
import { Text, View } from "@react-pdf/renderer";
import { IDescription } from "../../interfaces/steps.interface";
import { Descriptions } from "../../types";

interface IProps {
  descriptions: IDescription[];
  type: Descriptions;
}

export const DescriptionsPDF: React.FC<IProps> = ({ descriptions, type }) => {
  return (
    <React.Fragment>
      <View style={PDFViewStyles.dataBlock}>
        <Text style={PDFViewStyles.title}>{type + "s"}</Text>
        {descriptions.map((description: IDescription) => (
          <View key={description.id}>
            <Text style={PDFViewStyles.dataTitle}>{description.title}</Text>
            <View style={PDFViewStyles.row}>
              <Text
                style={{
                  ...PDFViewStyles.extraText,
                  ...PDFViewStyles.italicText,
                }}
              >
                {description.from}
              </Text>
              <Text
                style={{
                  ...PDFViewStyles.extraText,
                  ...PDFViewStyles.italicText,
                }}
              >
                {description.year}
              </Text>
              <Text style={PDFViewStyles.extraText}>
                {description.description}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </React.Fragment>
  );
};
