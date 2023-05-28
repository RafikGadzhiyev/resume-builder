import React from "react";
import styled from "@emotion/styled";
import { IDescription } from "../interfaces/steps.interface";
import { Column, Row } from "../elements/Layouts";
import { ExtraText } from "../elements/Typography";

interface IProps {
  awards: IDescription[];
}

const Container = styled(Column)`
  margin-top: 2rem;
`;

const Award = styled(Column)`
  margin-block: 1rem 0.5rem;
`;

export const AwardsView: React.FC<IProps> = ({ awards }) => {
  return (
    <Container>
      <h2>Awards</h2>
      {awards.map((award: IDescription) => (
        <Award key={award.id}>
          <b>{award.title}</b>
          <Row>
            <i>
              <ExtraText>{award.from}</ExtraText>
            </i>
            <i>
              <ExtraText>{award.year}</ExtraText>
            </i>
          </Row>
          <ExtraText>{award.description}</ExtraText>
        </Award>
      ))}
    </Container>
  );
};
