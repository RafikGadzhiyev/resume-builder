import styled from "@emotion/styled";

const FormTypeIconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.8rem 1.3rem;
    background-color: rgb(255 255 255 / 0.1);
    width: fit-content;
    height: 100px;
    border-radius: 105px;
    margin:  auto;
    transform: matrix(1, -0.14, 0.1, 1, 0, 0);
`;
const FormTypeIcon = styled.img`
    width: 100%;
    height: 100%;
`;

interface IProps extends React.PropsWithChildren {
    keyIcon: string
}

export const FormType: React.FC<IProps> = ({ keyIcon }) => {
    return <FormTypeIconContainer>
        <FormTypeIcon
            src={keyIcon}
        />
    </FormTypeIconContainer>
}