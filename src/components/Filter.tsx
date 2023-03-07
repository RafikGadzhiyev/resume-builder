import React from 'react';
import styled from "@emotion/styled";
import { motion } from 'framer-motion'
import { useFocus } from '../hooks/useFocus';
import ChevronDown from './../assets/icons/chevron_down.svg'

const FilterBlock = styled.div`
    display: flex;
    align-items: center;
    position: relative;

`

const FilterButton = styled.button`
    all: unset;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: .5rem
`

const FilterSelect = styled(motion.ul)`
    position: absolute;
    bottom: -15%;
    transform: translateY(100%);
    right: 10%;
    list-style: none;
    background-color: #1C1C1E;
    border-radius: 5px;
    width: max-content;
    overflow: hidden;
`;

const SelectItem = styled.li`
    width: 100%;
    font-size: .8rem;
    `

const SelectButton = styled.button`
    all: unset;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: .5rem;
    cursor: pointer;
    transition: 300ms ease;

    &:hover {
        background-color: rgb(58 58 60 / 1);
    }

`

const ChevronIcon = styled.img`
    transition: 300ms ease;

    &.up {
        transform: rotate(180deg);
    }

`

export const Filter = () => {
    const SelectRef = React.useRef<HTMLButtonElement>(null);
    const currentFocusResult = useFocus(SelectRef);

    return <FilterBlock>
        <FilterButton
            ref={SelectRef}
        >
            Select filter
            <ChevronIcon
                src={ChevronDown}
                className={currentFocusResult ? 'up' : ''}
            />
        </FilterButton>
        {
            currentFocusResult &&

            <FilterSelect
                initial={{
                    opacity: 0,
                    y: '75%'
                }}
                animate={{
                    opacity: 1,
                    y: '100%'
                }}

            >
                <SelectItem>
                    <SelectButton>
                        From newest
                    </SelectButton>
                </SelectItem>
                <SelectItem>
                    <SelectButton>
                        From oldest
                    </SelectButton>
                </SelectItem>
                <SelectItem>
                    <SelectButton>
                        Alphabetical
                    </SelectButton>
                </SelectItem>
            </FilterSelect>
        }
    </FilterBlock>
}