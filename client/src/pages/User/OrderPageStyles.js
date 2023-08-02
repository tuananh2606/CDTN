import styled from 'styled-components';
import { Button } from '@mui/material';

export const ContainerProductList = styled.div`
  display: grid;
  gap: 0.5rem;
  padding: 1.5rem 6.4vw 5rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

  @media screen and (min-width: 48rem) {
    grid-template-columns: repeat(2, minmax(256px, 1fr));
  }
  @media screen and (min-width: 64rem) {
    grid-template-columns: repeat(3, minmax(256px, 1fr));
  }
  @media screen and (min-width: 48rem) {
    padding-top: 7.5rem;
  }
  @media screen and (min-width: 48rem) {
    padding-left: 3.125vw;
    padding-right: 3.125vw;
  }
  @media screen and (min-width: 90rem) {
    padding-left: 8.3333333333vw;
    padding-right: 8.3333333333vw;
  }
`;
export const StyledCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 1;
  .button-flip {
    position: absolute;
    bottom: 0.5rem;
    width: 0;
    height: 0;
    right: 0.5rem;
    cursor: pointer;
    border-top: 1.5rem solid transparent;
    border-bottom: 1.5rem solid #392d23;
    border-left: 1.5rem solid transparent;
  }
  .card-front,
  .card-back {
    width: 100%;
    height: 100%;
  }
  .card-back {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    padding: 1.5rem 2rem;
    background-color: #fff;
    width: 100%;
    height: 100%;
    span:first-child {
      font-size: 10px;
      margin-bottom: 0.5rem;
      letter-spacing: 0.0625rem;
      font-weight: 400;
      text-transform: uppercase;
    }
  }
`;

export const ProductCardInfo = styled.div`
  background-color: #fff;
  padding: 1.5rem 2rem;
`;

export const ProductName = styled.span`
  /* padding: 1.5rem 1.75rem; */
  font-size: 1.125rem;
  letter-spacing: 0.025rem;
  line-height: 1.5rem;
`;
export const ButtonRemove = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  cursor: pointer;
  background-color: transparent;
  border: none;
`;
export const StyledImg = styled.img`
  width: 100%;
  height: 80%;
  object-fit: contain;
  background: url('/images/gradient_default.svg') 0 0 / cover no-repeat;
  /* @media screen and (min-width: 48rem) {
    min-width: 33.3333333333vw;
  }
  @media screen and (min-width: 64rem) {
    min-width: 20vw;
  } */
`;
export const StyledButton = styled(Button)`
  width: 100%;
  &&& {
    border: 1px solid #19110b;
    color: #19110b;
    border-radius: 999px;
    background-color: hsla(0, 0%, 100%, 0.2);
  }
  @media screen and (min-width: 48rem) {
    width: 50%;
  }
`;
