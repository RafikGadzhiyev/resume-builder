import { v4 as uuid4 } from 'uuid';
import { StepOne } from '../components/steps/StepOne';
import { StepTwo } from '../components/steps/StepTwo';
import { StepThree } from '../components/steps/StepThree';
import { StepFour } from '../components/steps/StepFour';
import { StepFive } from '../components/steps/StepFive';
import { StepSix } from '../components/steps/StepSix';
import { StepSeven } from '../components/steps/StepSeven';
import { StepEight } from '../components/steps/StepEight';
import { StepNine } from '../components/steps/StepNine';

export const STEPS = [
    {
        id: uuid4(),
        Component: StepOne
    },
    {
        id: uuid4(),
        Component: StepTwo
    },
    {
        id: uuid4(),
        Component: StepThree
    },
    {
        id: uuid4(),
        Component: StepFour
    },
    {
        id: uuid4(),
        Component: StepFive
    },
    {
        id: uuid4(),
        Component: StepSix
    },
    {
        id: uuid4(),
        Component: StepSeven
    },
    {
        id: uuid4(),
        Component: StepEight
    },
    {
        id: uuid4(),
        Component: StepNine
    }
];