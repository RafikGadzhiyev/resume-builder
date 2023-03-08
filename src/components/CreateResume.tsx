import styled from '@emotion/styled'
import { BaseButton, Form, Input } from '../elements/styledElements';
import UploadIcon from './../assets/icons/Uploda.svg'
import EmailIcon from './../assets/icons/Email.svg'
import PhoneIcon from './../assets/icons/phone.svg'
import LocationIcon from './../assets/icons/GetLocation.svg'
import CloseIcon from './../assets/icons/close.svg'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100vh;
    flex-direction: column;
    padding: 1rem 17rem;
    gap: 1rem;
    `;

const Steps = styled.div`
    background-color: #262626;
    width: 100%;
    border-radius: 5px;
    padding-block: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 2rem;
`

//! Just creating first step to see 
//! It just styling decomposition and clear logic will be later
const StepOne = styled.div`
    padding-block: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const StepTitle = styled.h4`
    text-align: center;
`

const StepForm = styled(Form)`
    margin-bottom: 0;
    display: grid;
    width: 100%;
    padding-inline: 5rem;
    align-items: center;
    grid-template-columns: .5fr 1.5fr;
    grid-template-rows: repeat(auto-fill, 1fr);
    &::before{ 
        display: none;
    }
`

const ImageUpload = styled.div`
    width: 7rem;
    height: 7rem;
    border-radius: 10px;
    background-color: #3A3A3C;
    cursor: pointer;
    border: 2px dashed rgb(255 255 255 /.5);
    grid-row: 1/3;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ImageUploadIcon = styled.img`
    width: 50%;
`;

const StepInput = styled(Input)`
    margin: 0;
    width: 100%;
`

const StepDescription = styled.textarea`
    all: unset;
    grid-column: 1/-1;
    width: 100%;
    word-break: break-all;
    cursor: text;
    border-radius: 5px;
    background-color: #3A3A3C;

    transition: 300ms ease;
    text-align: left;
    padding: .5rem 1rem;
    box-sizing: border-box;
    height: 10rem;

    &:hover {
        box-shadow: 0 0 0 2px rgb(15 255 19 / .25)
    }

    &:focus {
        box-shadow: 0 0 0 2px rgb(15 255 19 / .5);
    }


    &::placeholder {
        color: rgb(235 235 245 / .6);
    }

`

const StepTwo = styled.div`
`;

const ContactForm = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem .5rem;
    justify-content: space-between;
    padding-inline: 5rem;
    margin-top: 2rem;
`;

const ContactBlock = styled.div`
    display: flex;
    align-items: center;
    width: 48%;
    justify-content: space-between;
`

const ContactImage = styled.img`
    height: 50%;
`;

const ContactInput = styled(Input)`
    align-self: center;
    margin: 0;
`

const StepThree = styled.div`
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

const Buttons = styled.div`
    display: flex;
    gap: 1rem;
`

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

const BackButton = styled(BaseButton)`
    background-color: #ea4c44;
    color: #fff;
    transition: 300ms ease;

    &:not(:disabled):hover {
        box-shadow: 0 0 10px 2px #ea4c44;
    }

    &:active {
        box-shadow: none;
        background-color: #9d2d27;
    }
`

export const CreateResume = () => {
    return <Container>
        <Title>
            Resume name (by default is draft)
        </Title>
        <Steps>
            {/* <StepOne>
                <StepTitle>Let us to know a little bit about you and your life</StepTitle>
                <StepForm>
                    <ImageUpload>
                        <ImageUploadIcon
                            src={UploadIcon}
                            alt='Upload to cloud icon'
                        />
                    </ImageUpload>

                    <StepInput
                        placeholder='Your first name'
                    />
                    <StepInput
                        placeholder='Your last name'
                    />
                    <StepDescription
                        placeholder='Write a little description about your life.....'
                    ></StepDescription>
                </StepForm>
            </StepOne> */}
            {/* <StepTwo>
                <StepTitle>
                    Now we'd like to know your contact information
                    <ContactForm>
                        <ContactBlock>
                            <ContactImage
                                src={EmailIcon}
                            />
                            <ContactInput
                                placeholder='Your Email'
                            />
                        </ContactBlock>
                        <ContactBlock>
                            <ContactImage
                                src={PhoneIcon}
                            />
                            <ContactInput
                                placeholder='Your Phone number'
                            />
                        </ContactBlock>
                        <ContactBlock>
                            <ContactImage
                                src={LocationIcon}
                            />
                            <ContactInput
                                placeholder='Your Location'
                            />
                        </ContactBlock>
                        <ContactInput
                            placeholder='Your Linkedin'
                        />
                        <ContactInput
                            placeholder='Your GitHub'
                        />
                    </ContactForm>
                </StepTitle>
            </StepTwo> */}
            {/* <StepThree>
                <SkillsInput
                    placeholder='Write your skill and hit enter to save it'
                />
                <Skills>
                    <Skill>
                        HTML
                        <DeleteSkillButton>
                            <img
                                src={CloseIcon}
                                style={{
                                    width: '.5rem'
                                }}
                            />
                        </DeleteSkillButton>
                    </Skill>
                    <Skill>
                        CSS
                        <DeleteSkillButton>
                            <img
                                src={CloseIcon}
                                style={{
                                    width: '.5rem'
                                }}
                            />
                        </DeleteSkillButton>
                    </Skill>
                </Skills>
            </StepThree> */}
            <Buttons>
                <BaseButton>Next</BaseButton>
                <BackButton>Back</BackButton>
            </Buttons>
        </Steps>
    </Container>
}