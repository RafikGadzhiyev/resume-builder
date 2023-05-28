import { ILanguage } from "../interfaces/resume.interface";
import React from "react";
import styled from "@emotion/styled";
import { Column } from "../elements/Layouts";
import { ExtraText } from "../elements/Typography";

const Container = styled(Column)`
  margin-top: 2rem;
`;

const Language = styled.div`
  margin-top: 0.6rem;
`;
const BoldText = styled.b`
  font-weight: 900;
`;
interface IProps {
  languages: ILanguage[];
}
export const LanguagesView: React.FC<IProps> = ({ languages }) => {
  return (
    <Container>
      <h2>Languages</h2>
      <div>
        {languages.map((language: ILanguage) => (
          <React.Fragment key={language.id}>
            <Language>{language.language}</Language>
            <BoldText>
              <ExtraText>{language.level}</ExtraText>
            </BoldText>
          </React.Fragment>
        ))}
      </div>
    </Container>
  );
};
