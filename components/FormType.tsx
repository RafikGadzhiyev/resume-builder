import {FC, PropsWithChildren} from "react";
import { FormTypeIconContainer } from "../elements/FormUI";

export const FormType: FC<PropsWithChildren> = ({ children }) => {
  return <FormTypeIconContainer>{children}</FormTypeIconContainer>;
};
