import styled from 'styled-components';

export const StyledWrapper = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  @media screen and (min-width: 1024px) {
    flex-direction: row;
  }
`;

export const StyledCarouselWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledLeft = styled.div`
  position: relative;
  top: 0;
  width: 50%;
  display: grid;
  gap: 4px;

  grid-template-areas:
    'pic1 pic1'
    'pic2 pic3'
    'pic4 pic5';
  img {
    background-color: #f6f5f3;
  }
  img:first-child {
    grid-area: pic1;
    width: 100%;
    height: 100%;
  }
  img:nth-child(2) {
    grid-area: pic2;
    width: 100%;
    height: 100%;
  }
  img:nth-child(3) {
    grid-area: pic3;
    width: 100%;
    height: 100%;
  }
  img:nth-child(4) {
    grid-area: pic4;
    width: 100%;
    height: 100%;
  }
  img:nth-child(5) {
    grid-area: pic5;
    width: 100%;
    height: 100%;
  }
`;
export const StyledRight = styled.div`
  position: relative;
  width: 100%;
  @media screen and (min-width: 1024px) {
    width: 50%;
  }
`;

export const StyledProductCardWrapper = styled.div`
  box-sizing: border-box;
  display: block;
  position: relative;
  padding: 1rem 2rem 0;
  height: auto;
  @media screen and (min-width: 1024px) {
    height: 100vh;
    width: 100%;
    position: sticky;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

export const StyledProductCard = styled.div`
  width: 100%;
  @media screen and (min-width: 1024px) {
    width: 300px;
  }
`;
export const StyledProductHead = styled.div`
  display: flex;
  flex-direction: column;
  height: 56px;
  .product-top-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }
  .product-id {
    font-size: 14px;
    margin-bottom: 0.75rem;
  }
  .product-name {
    font-size: 18px;
    margin: 0 0 0.5rem;
  }
`;
export const StyledProductPart = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 52px;
`;

export const StyledProductVariation = styled(StyledProductPart)`
  border-bottom: 1px solid #eae8e4;
`;
export const StyledOtherProduct = styled(StyledProductPart)`
  font-size: 14px;
`;
export const StyledButtonLink = styled.button`
  width: 100%;
  background-color: transparent;
  padding: 0.625rem 1.5rem 0.85rem;
  margin: 4rem 0 2rem;
  box-shadow: inset 0 0 0 1px #000;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  font-size: 1rem;
  transition: border 0.3s cubic-bezier(0.39, 0.575, 0.565, 1), box-shadow 0.3s;
  &:hover {
    box-shadow: inset 0 0 0 2px #000;
  }
  @media screen and (max-width: 1024px) {
    margin-top: 2rem;
  }
`;

const StyledTabs = styled.div`
  padding-left: 6.4vw;
  padding-right: 6.4vw;
  @media screen and (min-width: 768px) {
    padding-left: 3.125vw;
    padding-right: 3.125vw;
  }
  @media screen and (min-width: 1024px) {
    padding-left: 4.6875vw;
    padding-right: 4.6875vw;
  }
  @media screen and (min-width: 1440px) {
    padding-left: 8.3333333333vw;
    padding-right: 8.3333333333vw;
  }
`;

export const StyledDesContainer = styled(StyledTabs)`
  margin-top: 2rem;
  .product__detailed-features {
    @media screen and (min-width: 1024px) {
      max-width: 60%;
      /* padding-right: 6.25vw; */
    }
    @media screen and (min-width: 1440px) {
      /* padding-right: 6.6666666667vw; */
    }
    .product-details__title {
      font-size: 1.125rem;
      border-bottom: 1px solid #e1dfd8;
      padding-bottom: 1rem;
      letter-spacing: 0.025rem;
      line-height: 1.5rem;
      font-weight: 400;
    }
  }
`;
export const StyledRecommendation = styled(StyledTabs)`
  margin-top: 4rem;
  padding-bottom: 4rem;
  .wrapper {
    padding: 0 8px;
  }
`;
export const StyledDes = styled.div`
  p:first-child {
    margin-bottom: 0;
  }
  p:nth-child(2) {
    margin-top: 0;
  }
  ul {
    @media screen and (min-width: 768px) {
      column-count: 2;
    }
    column-count: 1;
    list-style: disc inside;
    li {
      letter-spacing: 0.025rem;
      font-weight: 300;
      line-height: 1.5rem;
    }
  }
`;

export const ProductDesButton = styled.a`
  position: relative;
  display: none;
  span {
    font-size: 0.875rem;
  }
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -2px;
    width: 0px;
    height: 1px;
    background: #333;
    transition: all 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);
    /* left: 0;
    right: 0;
    background-color: #19110b;
    margin: 0 auto;
    transition: width 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);
    transform-origin: center; */
  }
  &:hover::after {
    width: 100%;
    left: 0;
  }
  @media screen and (min-width: 1024px) {
    display: inline;
  }
`;
