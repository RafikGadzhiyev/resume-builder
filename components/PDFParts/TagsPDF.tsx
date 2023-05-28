import React from "react";
import { PDFViewStyles } from "../../styles/PDFStyles";
import { Text, View } from "@react-pdf/renderer";
import { IHobby, ISkill } from "../../interfaces/resume.interface";

interface IProps {
  // skills: ISkill[];
  tags: ISkill[] | IHobby[];
  type: "skills" | "hobbies";
}
export const TagsPDF: React.FC<IProps> = ({ tags, type }) => {
  return (
    <React.Fragment>
      <View style={PDFViewStyles.dataBlock}>
        <Text style={PDFViewStyles.title}>{type}</Text>
        <View style={PDFViewStyles.tags}>
          {tags.map((skill: ISkill | IHobby) => (
            <View key={skill.id} style={PDFViewStyles.tag}>
              <Text>{skill.value}</Text>
            </View>
          ))}
        </View>
      </View>
    </React.Fragment>
  );
};
