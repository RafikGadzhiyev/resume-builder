import {MutableRefObject, useCallback, useEffect, useState} from "react";

export const useFocus = (reference: MutableRefObject<HTMLButtonElement | null>) => {
	const [isCorrectFocus, setCorrectFocus] = useState<boolean>(false);

	const FocusHandler = useCallback(() => {
		setCorrectFocus((prev) => !prev);
	}, [])

	const BlurHandler = useCallback(() => {
		setCorrectFocus(false);
	}, [])

	useEffect(() => {
		if (reference.current) {
			reference.current.onfocus = () => FocusHandler();
			reference.current.onblur = () => BlurHandler();
		}

		return () => {
			if (reference.current) {
				reference.current.onfocus = () => {};
				reference.current.ontouchstart = () => {};
			}
		};
	}, []);

	return isCorrectFocus;
};
