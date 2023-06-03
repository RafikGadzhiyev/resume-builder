import {FC} from 'react';
import styled from "@emotion/styled";
import moment from "moment/moment";
import { Column, Row } from "../elements/Layouts";

const Container = styled(Column)`
  gap: 0.5rem;
  margin-bottom: 2.5rem;
`;

const WorkPeriodAndLocation = styled(Row)`
  gap: 2rem;
`;

const ExtraData = styled.span`
  font-style: italic;
  color: rgb(255 255 255 / 0.5);
  font-size: 0.8rem;
`;

const Position = styled.span`
  font-size: 0.9rem;
  font-style: italic;
`;

interface IProps {
  company: string;
  position: string;
  work_start: string;
  work_end: null | string;
  location: string;
}
export const WorkExperience: FC<IProps> = ({
  company,
  work_end,
  work_start,
  location,
  position,
}) => {
  return (
    <Container>
      <Column>
        <b>{company}</b>
        <Position>{position}</Position>
      </Column>
      <WorkPeriodAndLocation>
        <ExtraData>
          {moment(work_start, "YYYY-MM-DD").format("LL")} -{" "}
          {work_end !== null
            ? moment(work_end, "YYYY-MM-DD").format("LL")
            : "Present"}
        </ExtraData>
        <ExtraData>{location}</ExtraData>
      </WorkPeriodAndLocation>
    </Container>
  );
};
