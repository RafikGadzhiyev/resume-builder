import React from 'react';
import styled from '@emotion/styled'
import { ConvertToMinutes, ConvertToSeconds } from '../utils/convert';

const TimerContainer = styled.div`
    border: 2.5px solid rgb(241 241 241 / 0.1);
    background-color: rgb(43 43 47 / 0.5);
    border-radius: 5px;
    display: flex;
    width: fit-content;
    padding: .1rem .25rem;
    font-size: .7rem;
`

interface ITimer {
    value: number // Time in seconds
    AvailableResend: React.Dispatch<React.SetStateAction<boolean>>
}



export const Timer: React.FC<ITimer> = ({ value, AvailableResend }) => {
    const [seconds, setSeconds] = React.useState(-1);
    const isWorking = React.useRef<boolean>(false);
    const timerId = React.useRef<ReturnType<typeof setTimeout>>(-1);

    React.useEffect(() => {
        if (seconds <= 0) {
            isWorking.current = false;
            clearInterval(timerId.current);
            AvailableResend(() => true);
        }
    }, [seconds])

    React.useEffect(() => {
        setSeconds(() => value);
        isWorking.current = true;
        timerId.current = -1;
        AvailableResend(() => false);
        clearInterval(timerId.current);

        if (isWorking.current && timerId.current === -1) {
            timerId.current = setInterval(() => setSeconds(prev => prev - 1), 1000);
        }

        return () => clearInterval(timerId.current);

    }, [value])

    return <TimerContainer>
        <span>{ConvertToMinutes(seconds)}</span>:
        <span>{ConvertToSeconds(seconds)}</span>
    </TimerContainer>
}