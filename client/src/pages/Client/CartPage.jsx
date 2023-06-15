import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { InputLabel, FormControl, Button, Select, MenuItem, NativeSelect } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { updateCartItem, removeFromCart } from '../../redux/cartSlice';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const [quantity, setQuantity] = useState({});
    const cart = useSelector((state) => state.cart.shoppingCart);
    const dispatch = useDispatch();
    console.log(cart);
    const handleChange = (event, idx, id) => {
        console.log(id);
        const value = {
            id: id,
            idx: id,
            quantity: event.target.value,
        };
        setQuantity((prevState) => ({ ...prevState, [id]: value }));
        dispatch(updateCartItem({ ['id']: id, ['idx']: idx, quantity: event.target.value }));
    };
    const quantityArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    const calculatePriceTotal = () => {
        let initialValue = 0;
        return cart.reduce((accumulator, { quantity, price }) => accumulator + quantity * price, initialValue);
    };

    const calcEstimatedTotal = () => {
        return calculatePriceTotal();
    };

    return (
        <Wrapper>
            <Content>
                <CartContainer>
                    <h3>YOUR SELECTIONS</h3>
                    <CartList>
                        {cart &&
                            cart.length > 0 &&
                            cart.map((item, idx) => {
                                return (
                                    <li key={idx}>
                                        <CartItem>
                                            <img src={item.img.url} alt="Anh" />
                                            <CartItemContent>
                                                <CartItemInfo>
                                                    <h3>{item.name}</h3>
                                                    <span>{item.code}</span>
                                                    {/* <div>
                                                        <span>Variation: </span>
                                                        {item.variation.map((i, idxC) => (
                                                            <span key={idxC}>{i}</span>
                                                        ))}
                                                    </div> */}
                                                </CartItemInfo>
                                                <CartItemQP>
                                                    <div>
                                                        <FormControl fullWidth>
                                                            <InputLabel
                                                                variant="standard"
                                                                htmlFor="uncontrolled-native"
                                                            >
                                                                QTY
                                                            </InputLabel>
                                                            <NativeSelect
                                                                defaultValue={item.quantity}
                                                                onChange={(e) => handleChange(e, idx, item.id)}
                                                                inputProps={{
                                                                    name: 'qty',
                                                                    id: 'uncontrolled-native',
                                                                }}
                                                            >
                                                                {quantityArr.map((item, idx) => (
                                                                    <option key={idx} value={item}>
                                                                        {item}
                                                                    </option>
                                                                ))}
                                                            </NativeSelect>
                                                        </FormControl>
                                                    </div>
                                                    <span>{'$ ' + item.price * item.quantity}</span>
                                                </CartItemQP>
                                            </CartItemContent>
                                        </CartItem>
                                        <div>
                                            <button onClick={() => handleRemove(item.id)}>REMOVE</button>
                                        </div>
                                    </li>
                                );
                            })}
                    </CartList>
                </CartContainer>
                <OrderSummary>
                    <h6>ORDER SUMMARY</h6>
                    <ul>
                        <OrderSummaryItem>
                            <span>Subtotal</span>
                            <span>{'$ ' + calculatePriceTotal()}</span>
                        </OrderSummaryItem>
                        <OrderSummaryItem>Shipping</OrderSummaryItem>
                        <OrderSummaryItem>Estimated Tax</OrderSummaryItem>
                        <OrderSummaryItem>
                            <span>Estimated Total</span>
                            <span>{'$ ' + calcEstimatedTotal()}</span>
                        </OrderSummaryItem>
                    </ul>
                    <Link to="/checkout">
                        <CheckoutButton>Checkout</CheckoutButton>
                    </Link>
                </OrderSummary>
            </Content>
        </Wrapper>
    );
};

export default CartPage;

const Wrapper = styled.section`
    margin-top: var(--header-height);
`;

const Content = styled.div`
    margin: 0 auto;
    max-width: 1200px;
    padding: 53px 30px;
    display: flex;
    flex-direction: column;
    @media only screen and (min-width: 768px) {
        flex-direction: row;
    }
`;
const CartContainer = styled.div`
    width: 100%;
    @media only screen and (min-width: 768px) {
        width: calc(100% - 370px);
    }
    h3 {
        margin: 0 0 10px;
        font-size: 12px;
    }
`;

const CartList = styled.ul`
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

const OrderSummary = styled.div`
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

const OrderSummaryItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;
    font-size: 12px;
    font-weight: bold;
`;

const CartItem = styled.div`
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
const CartItemContent = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
    width: calc(100% - 200px);
    @media only screen and (min-width: 768px) {
        width: calc(100% - 87px);
    }
`;

const CartItemInfo = styled.div`
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
const CartItemQP = styled.div`
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

const CheckoutButton = styled(Button)`
    &&& {
        margin-top: 2rem;
        background-color: #000;
        width: 100%;
        padding: 0.5rem 1rem;
        color: #fff;
    }
`;
