import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { StepOne } from "../components/steps/StepOne";

describe("Checking Steps display", () => {
  it("Step one should have title", () => {
    const { getByText } = render(<StepOne />);
    expect(
      getByText("Let us to know a little bit about you and your life")
    ).toBeInTheDocument();
  });
});
