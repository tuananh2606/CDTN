import styled from 'styled-components';

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
