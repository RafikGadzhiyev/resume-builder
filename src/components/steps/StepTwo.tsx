import styled from "@emotion/styled";
import { motion } from 'framer-motion';
import { Input, StepTitle } from "../../elements/styledElements";

const Container = styled(motion.div)`
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

export const StepTwo = () => {
    return <Container>
        <StepTitle>
            Now we'd like to know your contact information
            <ContactForm>
                <ContactBlock>
                    <ContactImage

                    />
                    <ContactInput
                        placeholder='Your Email'
                    />
                </ContactBlock>
                <ContactBlock>
                    <ContactImage

                    />
                    <ContactInput
                        placeholder='Your Phone number'
                    />
                </ContactBlock>
                <ContactBlock>
                    <ContactImage

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
    </Container >
}