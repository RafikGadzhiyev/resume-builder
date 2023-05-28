import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { v4 as uuid4 } from "uuid";
import { FormControlLabel, RadioGroup } from "@mui/material";
import { useDebounce } from "../hooks/useDebounce";
import { updateResume } from "../state/slices/resume.slice";
import { RootState } from "../state/store";
import { FaTimes } from "react-icons/fa";
import { StepRadio, StepTitle } from "../elements/StepsUI";
import { Input } from "../elements/Inputs";
import { DeleteDescriptionButton } from "../elements/Buttons";
import type { Degrees } from "../types";
import { Scale } from "../variants/animation.variants";

const EducationWrapper = styled(motion.div)`
  margin-bottom: 1.5rem;
  position: relative;
  width: 100%;
  padding: 1.5rem 1rem 1rem;
  border-radius: 10px;
  border: 1px solid #fff;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
const EducationInput = styled(Input)`
  min-width: 0;
`;

const DEGREES: { id: string; degree: Degrees }[] = [
  {
    id: uuid4(),
    degree: "High School Diploma / G.E.D.",
  },
  {
    id: uuid4(),
    degree: "A.A. / A.S.",
  },
  {
    id: uuid4(),
    degree: "B.A. / B.S.",
  },
  {
    id: uuid4(),
    degree: "M.A. / M.S.",
  },
  {
    id: uuid4(),
    degree: "M.D. / Ph.D.",
  },
];

interface IProps extends React.PropsWithChildren {
  university: string;
  index: number;
  faculty: string;
  startYear: number;
  endYear: number;
  degree: Degrees;
}

export const Education: React.FC<IProps> = ({
  university,
  degree,
  endYear,
  faculty,
  startYear,
  index,
}) => {
  const dispatch = useDispatch();
  const resume = useSelector(
    (store: RootState) => store.resumeReducer.currentResume
  );
  const [uni, setUni] = React.useState(university);
  const [facultyData, setFacultyData] = React.useState(faculty);
  const [sYear, setSYear] = React.useState(startYear);
  const [eYear, setEYear] = React.useState(endYear);
  const [deg, setDeg] = React.useState<Degrees>(degree);

  const [debouncedUni, debouncedFaculty, debouncedSYear, debouncedEYear] = [
    useDebounce(uni, 500, true),
    useDebounce(facultyData, 500, true),
    useDebounce(sYear, 500, true),
    useDebounce(eYear, 500, true),
  ];

  const DeleteEducation = (deleteIndex: number) => {
    dispatch(
      updateResume({
        ...resume,
        education: resume.education.filter((_, i) => i !== deleteIndex),
      })
    );
  };

  React.useEffect(() => {
    dispatch(
      updateResume({
        ...resume,
        education: resume.education.map((e, i) =>
          i !== index - 1
            ? e
            : {
                ...e,
                university: debouncedUni,
                faculty: debouncedFaculty,
                year: {
                  start: debouncedSYear,
                  end: debouncedEYear,
                },
                degree: deg,
              }
        ),
      })
    );
  }, [
    debouncedEYear,
    debouncedFaculty,
    debouncedSYear,
    debouncedUni,
    deg,
    dispatch,
    index,
  ]);

  return (
    <EducationWrapper
      data-description_type="Education"
      data-item_index={index}
      variants={Scale}
      initial="initial"
      animate="active"
      exit="exit"
      layout
    >
      <EducationInput
        placeholder="University"
        style={{
          width: "100%",
          gridColumn: "1/-1",
        }}
        value={uni}
        onChange={(e) => setUni(e.target.value)}
      />
      <EducationInput
        placeholder="Faculty"
        value={facultyData}
        onChange={(e) => setFacultyData(e.target.value)}
      />
      <EducationInput
        placeholder="Start year"
        type="number"
        value={sYear}
        onChange={(e) => setSYear(() => parseInt(e.target.value))}
      />
      <EducationInput
        placeholder="Graduation year"
        type="number"
        value={eYear}
        onChange={(e) =>
          setEYear(() => {
            let current = parseInt(e.target.value);
            if (current < sYear) {
              current = sYear;
            }
            return current;
          })
        }
      />
      <RadioGroup
        value={deg}
        onChange={(e) => setDeg(() => e.target.value as Degrees)}
      >
        {DEGREES.map((degree) => (
          <FormControlLabel
            key={degree.id}
            label={degree.degree}
            value={degree.degree}
            control={<StepRadio />}
          />
        ))}
      </RadioGroup>
      <DeleteDescriptionButton onClick={() => DeleteEducation(index - 1)}>
        <FaTimes />
      </DeleteDescriptionButton>
    </EducationWrapper>
  );
};
