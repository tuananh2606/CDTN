import styled from 'styled-components';

export const Wrapper = styled.footer`
  width: 100%;
  height: 100%;
  background-color: #000;
  padding: 2rem 0;
  color: #fff;
  ul {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
    li {
      margin-top: 0.5rem;
    }
    li > a {
      color: #fff;
      text-decoration: none;
    }
  }
  @media only screen and (min-width: 48em) {
    padding-left: 3.125vw;
    padding-right: 3.125vw;
  }
  @media only screen and (min-width: 64em) {
    padding-left: 4.6875vw;
    padding-right: 4.6875vw;
  }
  @media only screen and (min-width: 90em) {
    padding-left: 8.333333333333332vw;
    padding-right: 8.333333333333332vw;
  }
`;
export const LiItem = styled.li`
  display: flex;
  align-items: center;
  label + & {
    margin-top: 20px;
  }
  & .MuiInputBase-input {
    border-color: #fff;
    color: #fff;
  }
`;
