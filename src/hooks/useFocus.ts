import React from 'react';

export const useFocus = <T>(reference: React.MutableRefObject<T>) => {
    const [isCorrectFocus, setCorrectFocus] = React.useState<boolean>(false);

    React.useEffect(() => {
        document.onclick = () => {
            if (document.activeElement === reference.current) {
                setCorrectFocus(() => true)
            } else {
                setCorrectFocus(() => false)
            }
        }

        return () => { document.onclick = () => { } }
    }, [])

    return isCorrectFocus;
}   