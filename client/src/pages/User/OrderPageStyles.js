import styled from 'styled-components';
import { Button, Box } from '@mui/material';

export const ContainerProductList = styled.div`
  display: grid;
  gap: 0.5rem;
  padding: 1.5rem 6.4vw 5rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

  @media screen and (min-width: 48rem) {
    grid-template-columns: repeat(3, minmax(200px, 1fr));
  }
  @media screen and (min-width: 64rem) {
    grid-template-columns: repeat(4, minmax(200px, 1fr));
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
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
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

export const StyledModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 90%;
  border-radius: 20px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  .card-header {
    padding: 1.5rem;
    border-bottom: 2px solid #f5f5f5;
    ul {
      list-style: none;
    }
    span {
      font-weight: 700;
    }
    .order-id {
      p {
        margin-top: 0.5rem;
        font-size: 24px;
      }
    }
    .order-status {
      p {
        margin: 0;
        font-size: 14px;
        span:last-child {
          color: #4caf50;
        }
        .cancel {
          color: #f44336 !important;
        }
      }
    }
  }
  .card-body {
    overflow: auto;
    padding: 24px 24px;
    flex: 1 1 auto;
    .order {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      align-items: center;
      border-bottom: 2px solid #f5f5f5;
      &:last-child {
        border-bottom: none;
      }
      .order-info {
        flex: 1 1 auto;
        h4 {
          margin: 0 0 0.5rem;
        }
        p {
          margin: 0;
        }
      }
      .order-info__img {
        width: 170px;
      }
    }
    .order-payment-ship {
      padding: 0.5rem;
      border-top: 2px solid #f5f5f5;
      display: flex;
      justify-content: space-between;
      .payment {
        flex: 1;
        .paid {
          background-color: #4caf50;
          color: #fff;
          padding: 0.5rem;
          border-radius: 10px;
        }
        .unpaid {
          background-color: #f44336;
          color: #fff;
          padding: 0.5rem;
          border-radius: 10px;
        }
      }
      .delivery {
        flex: 1;
        h6 {
          color: #cccccc;
          margin: 0;
        }
        p {
          margin: 0.5rem 0 0;
        }
        .address-line2 {
          margin-top: 1rem;
        }
      }
    }
    .order-summary {
      padding: 0.5rem;
      border-top: 2px solid #f5f5f5;
      display: flex;
      .visible,
      .summary {
        flex: 1;
      }
      .summury {
        padding: 0.5rem;
      }
      .total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 2px dashed #f5f5f5;
      }
    }
  }
  .card-footer {
    display: flex;
    font-size: 20px;
    padding: 1.5rem;
    border-top: 2px solid #f5f5f5;
  }
`;
export const StyledButton = styled(Button)`
  &&& {
    margin-left: 0.5rem;
    font-size: 1.25rem;
    &:last-child {
      margin-left: 0;
    }
  }
`;
export const ButtonAgree = styled(Button)`
  &&& {
    background-color: #dc3545;
    &:hover {
      background-color: #c82333 !important;
    }
  }
`;
export const OrderSummaryItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Empty = styled.div``;
