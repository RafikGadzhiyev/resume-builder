import {FC, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { Descriptions } from "../types";
import { AppDispatch, RootState } from "../state/store";
import { updateResume } from "../state/slices/resume.slice";
import { useDebounce } from "../hooks/useDebounce";
import { DeleteButton } from "../elements/Buttons";
import { Input } from "../elements/Inputs";
import { StepDescription } from "../elements/StepsUI";

const Award = styled(motion.li)`
  margin-bottom: 2.5rem;
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

const AwardLabel = styled.label`
  text-transform: capitalize;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &.title,
  &.description {
    grid-column: 1/-1;
  }
`;

const DeleteAward = styled(DeleteButton)`
  position: absolute;
  top: -1.5rem;
  right: 0;
  font-size: 1rem;
`;

interface IProps {
  descriptionType: Descriptions;
  index: number;
  itemId: string;
}

interface IData {
  title: string;
  from: string;
  year: string;
  description: string;
}

export const Description: FC<IProps> = ({
  index,
  itemId,
  descriptionType,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const resume = useSelector(
    (store: RootState) => store.resumeReducer.currentResume
  );
  const TYPE: "awards" | "certificates" =
    descriptionType === "award" ? "awards" : "certificates";
  const description = resume[TYPE];
  const [data, setData] = useState<IData>({
    title: "",
    from: "",
    year: "",
    description: "",
  });

  const [
    debouncedTitleValue,
    debouncedFromValue,
    debouncedYearValue,
    debouncedDescriptionValue,
  ] = [
    useDebounce(data.title, 500, true),
    useDebounce(data.from, 500, true),
    useDebounce(data.year, 500, true),
    useDebounce(data.description, 500, true),
  ];

  const deleteDescription = (removeId: string) => {
    dispatch(
      updateResume({
        ...resume,
        [TYPE]: description.filter((d) => d.id !== removeId),
      })
    );
  };

  useEffect(() => {
    dispatch(
      updateResume({
        ...resume,
        [TYPE]: resume[TYPE].map((e) =>
          e.id === itemId
            ? {
                ...e,
                title: debouncedTitleValue,
                from: debouncedFromValue,
                year: debouncedYearValue,
                description: debouncedDescriptionValue,
              }
            : e
        ),
      })
    );
  }, [
    debouncedDescriptionValue,
    debouncedFromValue,
    debouncedTitleValue,
    debouncedYearValue,
    TYPE,
    dispatch,
    itemId,
  ]);

  return (
    <Award
      data-item_index={index}
      data-description_type={
        descriptionType[0].toUpperCase() + descriptionType.slice(1)
      }
      initial={{
        opacity: 0,
        y: 100,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0,
        overflow: "hidden",
        height: 0,
      }}
      transition={{
        ease: "linear",
      }}
    >
      <AwardLabel className="title">
        Title
        <Input
          value={data.title}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />
      </AwardLabel>
      <AwardLabel>
        From
        <Input
          value={data.from}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              from: e.target.value,
            }))
          }
        />
      </AwardLabel>
      <AwardLabel>
        Year
        <Input
          type="number"
          min={1}
          value={data.year}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              year: e.target.value,
            }))
          }
        />
      </AwardLabel>
      <AwardLabel className="description">
        Description
        <StepDescription
          className="default"
          value={data.description}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        ></StepDescription>
      </AwardLabel>
      <DeleteAward onClick={() => deleteDescription(itemId)}>X</DeleteAward>
    </Award>
  );
};
