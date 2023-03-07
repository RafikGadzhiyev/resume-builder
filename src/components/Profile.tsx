import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { RootState } from '../state/store'
import TestProfileImage from './../assets/icons/profile_test_image.svg'
import { Filter } from './Filter'

const Container = styled.div`
    --headerHeight: 4.5rem;
    display: grid;
    grid-template-rows: var(--headerHeight) calc(100vh - var(--headerHeight));
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
    width: 100%;
    background-color: rgb(38 38 38 / 1);
    padding: 2.5rem 8rem 4rem;
    display: flex;
    flex-direction: column;
`;

const TopBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;



export const Profile = () => {
    const user = useSelector((store: RootState) => store.authReducer.user);

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
        </ContentContainer>
    </Container>
}

