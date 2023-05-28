import { IDescription } from "../interfaces/steps.interface";
import React from "react";
import styled from "@emotion/styled";
import { Column, Row } from "../elements/Layouts";
import { ExtraText } from "../elements/Typography";

interface IProps {
  certificates: IDescription[];
}

const Container = styled(Column)`
  margin-top: 2rem;
`;

const Certificate = styled(Column)`
  margin-block: 1rem 0.5rem;
`;
export const CertificatesView: React.FC<IProps> = ({ certificates }) => {
  return (
    <Container>
      <h2>Certificates</h2>
      {certificates.map((certificate: IDescription) => (
        <Certificate key={certificate.id}>
          <b>{certificate.title}</b>
          <Row>
            <i>
              <ExtraText>{certificate.from}</ExtraText>
            </i>
            <i>
              <ExtraText>{certificate.year}</ExtraText>
            </i>
          </Row>
          <ExtraText>{certificate.description}</ExtraText>
        </Certificate>
      ))}
    </Container>
  );
};
