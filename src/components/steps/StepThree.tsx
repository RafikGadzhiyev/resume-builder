import styled from "@emotion/styled"
import { Input } from "../../elements/styledElements";

const Container = styled.div`
    max-width: 37.5%;
`;

const SkillsInput = styled(Input)`
    width: 100%;
    margin-bottom: 1rem;
`;

const Skills = styled.div`
    display: flex;
    gap: .5rem 1rem;
    flex-wrap: wrap;
`

const Skill = styled.div`
    border-radius: 5px;
    padding: .25rem .5rem;
    background-color: #1C1C1E;
    position: relative;
    font-size: .7rem;
`;

const DeleteSkillButton = styled.button`
    all: unset;
    cursor: pointer;
    background-color: #1c1c1e;
    box-sizing: border-box;
    padding: .25rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: -7.5px;
    top: -7.5px;
    transition: 300ms;

    &:hover {
        background-color: #222225;
    }

`;
export const StepThree = () => {
    return <Container>
        <SkillsInput
            placeholder='Write your skill and hit enter to save it'
        />
        <Skills>
            <Skill>
                HTML
                <DeleteSkillButton>
                    {/* <img
                        src={CloseIcon}
                        style={{
                            width: '.5rem'
                        }}
                    /> */}
                </DeleteSkillButton>
            </Skill>
            <Skill>
                CSS
                <DeleteSkillButton>
                    {/* <img
                        src={CloseIcon}
                        style={{
                            width: '.5rem'
                        }}
                    /> */}
                </DeleteSkillButton>
            </Skill>
        </Skills>
    </Container>
}