import {FC} from 'react';
import {ISkill} from "../interfaces/resume.interface";
import styled from "@emotion/styled";
import {Column, WrapRow} from "../elements/Layouts";
import {TagWrapper} from "../elements/TagUI";

interface IProps {
	skills: ISkill[];
}

const SkillsRow = styled(WrapRow)`
  margin-top: 0.5rem;
  gap: 0.5rem;
`;

export const SkillsView: FC<IProps> = ({skills}) => {
	return (
		<Column>
			<h2>Skills</h2>
			<SkillsRow px="left" py="top" gap={0}>
				{skills.map((skill: ISkill) => (
					<TagWrapper
						key={skill.id}
						initial={{
							opacity: 0,
						}}
						animate={{
							opacity: 1,
						}}
					>
						{skill.value}
					</TagWrapper>
				))}
			</SkillsRow>
		</Column>
	);
};
