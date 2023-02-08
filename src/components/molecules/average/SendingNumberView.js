import Input from "@/components/atoms/inputs/Input";
import SendButton from "@/components/atoms/buttons/SendButton";
import React, { useState, useContext } from "react";
import styled from "styled-components";
import DivColumn from "@/components/atoms/conteiners/DivColumn";
import postNumber from "@/services/api/numbers/postNumber";
import { AverageContext } from "@/pages/average";
import isNumber from "@/database/numbers/helpers/isNumber";

const SendingNumberViewWrap = styled(DivColumn)`
    flex: 1;
    margin: 10px;
    gap: 10px;
`;

const NumberInput = styled(Input)`
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin:0;
    }

    &[type='number'] {
        -moz-appearance: textfield;
    }   
`;

export default function SendingNumberView() {

    const {setNumbers} = useContext(AverageContext);

    const [number, setNumber] = useState("");

    const Send = function() {
        if (!isNumber(number)) {
            return;
        }
        postNumber(number)
            .then((data) => {
                setNumbers(prev => [data.data.data, ...prev]);
            })
            .catch((error) => console.error(error));
        setNumber("");
    }

    return (
        <SendingNumberViewWrap>
            <NumberInput 
                type="number"
                placeholder="number"
                value={number}
                onChange={(event) => setNumber(event.target.value)}
            />
            <SendButton onClick={Send}>SEND</SendButton>
        </SendingNumberViewWrap>
    );
}
