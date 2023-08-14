import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InputLabel, FormControl, NativeSelect, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { VNDFormat } from '../../../utils/formatMoney';
import { updateCartItem, removeFromCart } from '../../../redux/cartSlice';
import {
  Wrapper,
  Content,
  CartContainer,
  CartList,
  OrderSummary,
  OrderSummaryItem,
  CartItem,
  CartItemContent,
  CartItemInfo,
  CartItemQP,
  CheckoutButton,
} from './styles';

const CartPage = () => {
  const [hide, setHide] = useState(true);
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.shoppingCart);
  const dispatch = useDispatch();
  const { t } = useTranslation('cart_checkout');
  const handleChange = (event, idx, id) => {
    dispatch(updateCartItem({ ['id']: id, ['idx']: idx, quantity: event.target.value }));
  };

  const quantityArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const calculatePriceTotal = () => {
    let initialValue = 0;
    let totalPrice = cart.reduce((accumulator, { quantity, price }) => accumulator + quantity * price, initialValue);
    return VNDFormat(totalPrice);
  };

  const calcEstimatedTotal = () => {
    return calculatePriceTotal();
  };

  const link = (item) => {
    navigate(`/${item.category}/${item.slug}/${item.code}`);
  };

  useEffect(() => {
    if (cart.length > 0) {
      setHide(false);
    } else {
      setHide(true);
    }
  }, [cart]);

  return (
    <Wrapper>
      <Content>
        <CartContainer>
          <h3 className="title-cart">{t('yours_selections')}</h3>
          <CartList>
            {cart &&
              cart.length > 0 &&
              cart.map((item, idx) => {
                return (
                  <li key={idx}>
                    <CartItem>
                      <img src={item.img.url} alt="Anh" onClick={() => link(item)} />
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
                              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                {t('qty')}
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
                          <span>{VNDFormat(item.price * item.quantity)}</span>
                        </CartItemQP>
                      </CartItemContent>
                    </CartItem>
                    <div>
                      <Button variant="standard" onClick={() => handleRemove(item.id)}>
                        {t('remove')}
                      </Button>
                    </div>
                  </li>
                );
              })}
            {cart.length === 0 && <span>{t('empty_cart')}</span>}
          </CartList>
        </CartContainer>
        <OrderSummary>
          <h6>{t('order_summary')}</h6>
          <ul>
            <OrderSummaryItem>
              <span>{t('subtotal')}</span>
              <span>{calculatePriceTotal()}</span>
            </OrderSummaryItem>
            <OrderSummaryItem>{t('shipping')}</OrderSummaryItem>
            <OrderSummaryItem>{t('estimated_tax')}</OrderSummaryItem>
            <OrderSummaryItem>
              <span>{t('estimated_total')}</span>
              <span>{calcEstimatedTotal()}</span>
            </OrderSummaryItem>
          </ul>
          <Link to="/checkout">
            <CheckoutButton disabled={hide}>{t('checkout')}</CheckoutButton>
          </Link>
        </OrderSummary>
      </Content>
    </Wrapper>
  );
};

export default CartPage;
