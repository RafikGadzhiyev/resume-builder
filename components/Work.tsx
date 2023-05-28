import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { Tooltip } from "@mui/material";
import { FaTimes } from "react-icons/fa";
import { RootState } from "../state/store";
import { useDebounce } from "../hooks/useDebounce";
import { updateResume } from "../state/slices/resume.slice";
import { Input } from "../elements/Inputs";
import { DeleteDescriptionButton } from "../elements/Buttons";
import { Scale } from "../variants/animation.variants";

const WorkWrapper = styled(motion.div)`
  margin-bottom: 1.5rem;
  position: relative;
  width: 100%;
  padding: 1.5rem 1rem 1rem;
  border-radius: 10px;
  border: 1px solid ${(styles: any) => styles.theme.textColor};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  &::after {
    content: attr(data-description_type) " #" attr(data-item_index);
    top: -0.5rem;
    left: 1rem;
    font-size: 0.75rem;
    position: absolute;
    background-color: ${(styles: any) => styles.theme.secondaryColor};
  }
`;

const WorkInput = styled(Input)`
  min-width: 0;

  &.full_width {
    grid-column: 1/-1;
  }
`;

interface IProps extends React.PropsWithChildren {
  index: number;
}

export const Work: React.FC<IProps> = ({ index }) => {
  const dispatch = useDispatch();
  const resume = useSelector(
    (store: RootState) => store.resumeReducer.currentResume
  );
  const work = React.useMemo(() => resume.works[index], [resume.works, index]);
  const [company, setCompany] = React.useState(work.company);
  const [position, setPosition] = React.useState(work.position);
  const [location, setLocation] = React.useState(work.location);
  const [startDate, setStartDate] = React.useState(work.work_period.start);
  const [endDate, setEndDate] = React.useState(work.work_period.end);

  const [
    debouncedCompany,
    debouncedPosition,
    debouncedLocation,
    debouncedStartDate,
    debouncedEndDate,
  ] = [
    useDebounce(company, 500, true),
    useDebounce(position, 500, true),
    useDebounce(location, 500, true),
    useDebounce(startDate, 500, true),
    useDebounce(endDate, 500, true),
  ];

  const deleteWork = (deleteIndex: number) => {
    dispatch(
      updateResume({
        ...resume,
        works: resume.works.filter((_, idx) => deleteIndex !== idx),
      })
    );
  };

  React.useEffect(() => {
    dispatch(
      updateResume({
        ...resume,
        works: resume.works.map((e, i) =>
          i !== index
            ? e
            : {
                ...e,
                company: debouncedCompany,
                location: debouncedLocation,
                position: debouncedPosition,
                work_period: {
                  start: debouncedStartDate,
                  end: debouncedEndDate,
                },
              }
        ),
      })
    );
  }, [
    debouncedCompany,
    debouncedEndDate,
    debouncedLocation,
    debouncedPosition,
    debouncedStartDate,
    dispatch,
    index,
  ]);

  return (
    <WorkWrapper
      data-description_type="Work"
      data-item_index={index + 1}
      variants={Scale}
      initial="initial"
      animate="active"
      exit="exit"
      layout
    >
      <WorkInput
        placeholder="Position"
        className="full_width"
        value={position}
        onChange={(e) => setPosition(() => e.target.value)}
      />
      <WorkInput
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(() => e.target.value)}
      />
      <WorkInput
        placeholder="Country, City"
        value={location}
        onChange={(e) => setLocation(() => e.target.value)}
      />
      <WorkInput
        placeholder="Start date"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      {/*<DatePicker*/}
      {/*    sx={InputSxProps}*/}
      {/*/>*/}
      <WorkInput
        placeholder="End data"
        type="date"
        value={endDate || ""}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <Tooltip title="Separate achievements with ;" followCursor>
        <WorkInput placeholder="Achievements" className="full_width" />
      </Tooltip>
      <DeleteDescriptionButton onClick={() => deleteWork(index)}>
        <FaTimes />
      </DeleteDescriptionButton>
    </WorkWrapper>
  );
};
