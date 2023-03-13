import React from 'react';
import styled from '@emotion/styled'
import { BaseButton, Form, Input } from '../elements/styledElements';
import { StepOne } from './steps/StepOne';
import { StepThree } from './steps/StepThree';
import { StepTwo } from './steps/StepTwo';
import { AnimatePresence } from 'framer-motion';

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
    min-height: 350px;
`;

const Title = styled.h1`
    font-size: 2rem;
`
const Buttons = styled.div`
    display: flex;
    gap: 1rem;
`
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

const STEPS = [
    StepOne, StepTwo, StepThree
];

export const CreateResume = () => {
    const [currentStep, setCurrentStep] = React.useState(1);
    const Step = STEPS[currentStep - 1];
    return <Container>
        <Title>
            Resume name (by default is draft)
        </Title>
        <Steps>
            {
                <Step
                    key={currentStep}
                />
            }
            <Buttons>
                <BaseButton
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    disabled={currentStep >= STEPS.length}
                >Next</BaseButton>
                <BackButton
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    disabled={currentStep < 2}
                >Back</BackButton>
            </Buttons>
        </Steps>
    </Container>
}