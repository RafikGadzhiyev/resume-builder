import React from "react";
import { PDFViewStyles } from "../../styles/PDFStyles";
import { Text, View } from "@react-pdf/renderer";
import { ILanguage } from "../../interfaces/resume.interface";

interface IProps {
  languages: ILanguage[];
}

export const LanguagesPDF: React.FC<IProps> = ({ languages }) => {
  return (
    <React.Fragment>
      <View style={PDFViewStyles.dataBlock}>
        <Text style={PDFViewStyles.title}>Languages</Text>
        <View>
          {languages.map((language: ILanguage) => (
            <React.Fragment key={language.id}>
              <Text style={PDFViewStyles.language}>{language.language}</Text>
              <Text
                style={{
                  ...PDFViewStyles.extraText,
                  ...PDFViewStyles.boldText,
                }}
              >
                {language.level}
              </Text>
            </React.Fragment>
          ))}
        </View>
      </View>
    </React.Fragment>
  );
};
