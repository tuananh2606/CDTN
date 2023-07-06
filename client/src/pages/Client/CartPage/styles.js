import styled from 'styled-components';
import { Button } from '@mui/material';

export const Wrapper = styled.section`
    margin-top: var(--header-height);
`;

export const Content = styled.div`
    margin: 0 auto;
    max-width: 1200px;
    padding: 53px 30px;
    display: flex;
    flex-direction: column;
    @media only screen and (min-width: 768px) {
        flex-direction: row;
    }
`;
export const CartContainer = styled.div`
    width: 100%;
    @media only screen and (min-width: 768px) {
        width: calc(100% - 370px);
    }
    h3 {
        margin: 0 0 10px;
        font-size: 12px;
    }
`;

export const CartList = styled.ul`
    list-style: none;

    li {
        width: 100%;
        &:first-child {
            border-top: 1px solid var(--border-color);
        }
        margin-bottom: 1rem;
        border-bottom: 1px solid var(--border-color);
    }
`;

export const OrderSummary = styled.div`
    border: 1px solid var(--border-color);
    padding: 0 1.5rem 1rem;
    width: 100%;
    margin-left: 2rem;
    @media only screen and (min-width: 768px) {
        width: 345px;
    }
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

export const CartItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 230px;
    width: 100%;
    img {
        height: 100%;
        width: 200px;
        object-fit: cover;
        @media only screen and (min-width: 768px) {
            width: 87px;
        }
    }
`;
export const CartItemContent = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
    width: calc(100% - 200px);
    @media only screen and (min-width: 768px) {
        width: calc(100% - 87px);
    }
`;

export const CartItemInfo = styled.div`
    display: flex;
    flex-direction: column;
    h3 {
        margin: 10px 0;
        font-size: 1rem;
    }
    span {
        font-size: 11px;
    }
`;
export const CartItemQP = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 50px;
    span {
        text-align: right;
    }
    @media screen and (max-width: 1024px) {
        span {
            margin-top: 10px;
        }
    }
    @media screen and (min-width: 1024px) {
        flex-direction: row;
        span {
            padding-left: 80px;
        }
    }
`;

export const CheckoutButton = styled(Button)`
    &&& {
        margin-top: 2rem;
        background-color: #000;
        width: 100%;
        padding: 0.5rem 1rem;
        color: #fff;
    }
`;
