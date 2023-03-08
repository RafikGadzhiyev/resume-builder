import React from 'react';
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../state/store'
import TestProfileImage from './../assets/icons/profile_test_image.svg'
import { Filter } from './Filter'

const Container = styled.div`
    --headerHeight: 4.5rem;
    display: grid;
    grid-template-rows: var(--headerHeight);
`

const Header = styled.header`
    background-color: #1c1c1e;
    padding-block: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
`

const ProfileImageContainer = styled.div`
    width: 2.5rem;
    height: 100%;
    display: flex;
`

const ProfileImage = styled.img`
    width: 100%;
    border-radius: 50%;
`

const ProfileNameContainer = styled.div`
    font-size: 1.25rem;
`

const ContentContainer = styled.div`
    height: 100%;
    min-height: calc(100vh - var(--headerHeight));
    width: 100%;
    background-color: rgb(38 38 38 / 1);
    padding: 2rem 8rem;
    display: flex;
    flex-direction: column;
`;

const TopBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;


const Resumes = styled.div`
    --resumeHeight: 14rem;

    display: flex;
    gap: 1rem .5rem;
    width: fit-content;
    flex-wrap: wrap;
    margin-top: 1rem;
    justify-content: center;
`;
const Resume = styled.div``;
const CreateResumeButton = styled.button`
    all: unset;
    cursor: pointer;
    font-size: .75rem;
    border-radius: 5px;
    border: 1.5px dashed rgb(255 255 255 / 0.5);
    transition: 300ms ease;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--resumeHeight);
    color: rgb(255 255 255 / 0.5);
    letter-spacing: 2px;

    &:hover {
        border-color: rgb(255 255 255 / .75);
        color: rgb(255 255 255 / 0.75);
    }

    &:active {
        border-color: rgb(255 255 255 / 1);
        color: rgb(255 255 255 / 1);
    }

`


export const Profile = () => {
    const user = useSelector((store: RootState) => store.authReducer.user);
    const navigate = useNavigate();


    return <Container>
        <Header>
            <ProfileImageContainer>
                <ProfileImage
                    src={TestProfileImage}
                />
            </ProfileImageContainer>
            <ProfileNameContainer>
                <span>Welcome back, {user?.full_name}</span>
            </ProfileNameContainer>
        </Header>
        <ContentContainer>
            <TopBar>
                <span>Your resumes:</span>
                <Filter />
            </TopBar>
            <Resumes>
                <CreateResumeButton
                    onClick={() => navigate('/resume/new')}
                >Create new Resume</CreateResumeButton>
            </Resumes>
        </ContentContainer>
    </Container>
}

