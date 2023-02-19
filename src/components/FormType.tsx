import styled from "@emotion/styled";
import { FormTypeIconContainer } from "../elements/styledElements";




export const FormType: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <FormTypeIconContainer>
        {children}
    </FormTypeIconContainer>
}