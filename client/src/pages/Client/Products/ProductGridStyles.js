import styled from 'styled-components';

export const Wrapper = styled.section`
  background-color: #fff;
`;

export const ContainerProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(256px, 1fr));
  }
`;

export const Card = styled.div`
  position: relative;
  z-index: 1;
  padding: 1.5rem 1rem;
  min-height: 280px;
  box-shadow: inset 20px 50px 50px 10px #f6f5f3;
  /* background: rgb(231, 231, 231);
    background: radial-gradient(
        circle,
        rgba(231, 231, 231, 1) 0%,
        rgba(238, 238, 238, 1) 97%,
        rgba(250, 250, 250, 1) 100%
    ); */
  .product-card__url::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
  }
`;

export const ProductCardInfo = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ProductName = styled.span`
  font-size: 0.875rem;
`;

export const ButtonChangeColor = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  background-color: ${(props) => (props.color ? props.color : '#000')};
  cursor: pointer;
  margin: 0 0.25rem;
`;
export const Variants = styled.div`
  z-index: 2;
`;
export const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
