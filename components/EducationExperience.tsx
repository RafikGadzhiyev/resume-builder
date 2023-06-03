import {FC} from "react";
import { Degrees } from "../types";
import styled from "@emotion/styled";
import { Column, Row } from "../elements/Layouts";

const Container = styled(Column)`
  gap: 0.2rem;
  margin-bottom: 2rem;
`;

const FacultyAndDegree = styled(Row)`
  gap: 2rem;
  align-items: flex-end;
`;

const Faculty = styled.span`
  font-size: 0.9rem;
  font-style: italic;
`;

const ExtraData = styled.span`
  font-style: italic;
  color: rgb(255 255 255 / 0.5);
  font-size: 0.8rem;
`;
interface IProps {
  university: string;
  degree: Degrees;
  faculty: string;
  education_start: number;
  education_end: number;
}

export const EducationExperience: FC<IProps> = ({
  education_start,
  education_end,
  degree,
  faculty,
  university,
}) => {
  return (
    <Container>
      <b>{university}</b>
      <FacultyAndDegree>
        <Faculty>{faculty}</Faculty>
        <ExtraData>{degree}</ExtraData>
      </FacultyAndDegree>
      <Row>
        <ExtraData>
          {education_start} - {education_end}
        </ExtraData>
      </Row>
    </Container>
  );
};
