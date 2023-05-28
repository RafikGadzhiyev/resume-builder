import React from "react";
import { FormTypeIconContainer } from "../elements/FormUI";

export const FormType: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <FormTypeIconContainer>{children}</FormTypeIconContainer>;
};
