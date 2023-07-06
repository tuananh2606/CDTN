import styled from 'styled-components';
import { Button, StepLabel } from '@mui/material';

export const Wrapper = styled.div`
    background-color: #fff;
    margin-top: var(--header-height);
`;
export const Content = styled.div`
    margin: 0px auto;
    max-width: 1200px;
    padding: 23px 27px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    @media only screen and (min-width: 768px) {
        flex-direction: row;
    }
`;
export const CheckoutSection = styled.section`
    width: 100%;
    @media only screen and (min-width: 768px) {
        width: calc(100% - 345px);
    }
`;
export const CheckoutForm = styled.div`
    margin: 1.875rem auto;
`;

export const FormLabel = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;
    span {
        margin-left: 0.5rem;
    }
`;
export const StyledStepLabel = styled(StepLabel)`
    .Mui-active {
        fill: #fff;
    }
    .MuiStepLabel-label {
        font-size: 2rem;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    .MuiSvgIcon-root {
        border-radius: 50%;
        font-size: 2rem;
        circle {
            fill: inherit;
            stroke: black;
            stroke-width: 3;
        }
        .MuiStepIcon-text {
            fill: #000;
        }
    }
`;
export const StyledButton = styled(Button)`
    &&& {
        height: 3rem;
        background-color: #000;
        color: white;
        padding: 1rem 1.5rem;
    }
`;
export const OrderSummarySection = styled.section`
    width: 100%;
    height: auto;
    padding: 1rem 1.5rem;
    border: 1px solid var(--border-color);
    @media only screen and (min-width: 768px) {
        width: 345px;
    }
`;
export const OrderSummary = styled.div`
    width: 100%;
    ul {
        list-style: none;
    }
    h6 {
        font-size: 12px;
        font-weight: 400;
        text-transform: uppercase;
    }
`;

export const OrderSummaryItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;
    font-size: 12px;
    font-weight: bold;
`;
export const CartList = styled.ul`
    list-style: none;
    width: 100%;
    li {
        width: 100%;
        margin-bottom: 1rem;
    }
`;
export const CartItem = styled.div`
    display: flex;
    align-items: center;
    height: 100px;
    width: 100%;
    img {
        height: 100%;
        width: 21%;
        object-fit: contain;
    }
`;
export const CartItemContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 1rem;
    width: 70%;
    height: 100%;
`;

export const CartItemInfo = styled.div`
    display: flex;
    flex-direction: column;
    h3 {
        margin: 0;
        font-size: 11px;
    }
    span {
        font-size: 10px;
    }
`;
export const CartItemQP = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    min-width: 50px;
    height: 100%;
    span {
        font-size: 11px;
        text-align: right;
    }
`;
