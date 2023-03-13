import styled from '@emotion/styled';
import { motion } from 'framer-motion'
import { Form, Input, StepTitle } from '../../elements/styledElements';
import UploadIcon from './../../assets/icons/Uploda.svg'


const Container = styled(motion.div)`
    padding-block: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
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

export const StepOne = () => {
    return <Container>
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
    </Container>
}