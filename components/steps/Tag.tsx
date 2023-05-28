import React from "react";
import { FaTimes } from "react-icons/fa";
import { DeleteDescriptionButton } from "../../elements/Buttons";
import { TagWrapper } from "../../elements/TagUI";
import { FadeInOutTop } from "../../variants/animation.variants";

interface IProps extends React.PropsWithChildren {
  id: string;
  value: string;
  removeTag: (id: string) => void;
}

export const Tag: React.FC<IProps> = ({ id, value, removeTag }) => {
  return (
    <TagWrapper
      variants={FadeInOutTop}
      initial="initial"
      animate="active"
      exit="exit"
      layout
      transition={{
        ease: "linear",
      }}
    >
      {value}
      <DeleteDescriptionButton onClick={() => removeTag(id)}>
        <FaTimes />
      </DeleteDescriptionButton>
    </TagWrapper>
  );
};
