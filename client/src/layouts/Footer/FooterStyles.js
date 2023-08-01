import styled from 'styled-components';

export const Wrapper = styled.footer`
  box-sizing: border-box;
  border-top: 1px solid var(--border-color);
  width: 100%;
  padding: 2.5rem 6.4vw;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 768px) {
    padding-left: 3.125vw;
    padding-right: 3.125vw;
  }
  @media screen and (min-width: 1024px) {
    flex-direction: row;
    padding-left: 4.6875vw;
    padding-right: 4.6875vw;
  }
  @media screen and (min-width: 90rem) {
    padding-left: 8.3333333333vw;
    padding-right: 8.3333333333vw;
  }
`;

export const ColumnFooter = styled.div`
  flex: 1;

  @media screen and (max-width: 1024px) {
    border-bottom: 1px solid var(--border-color);
    &:first-child {
      border-top: 1px solid var(--border-color);
    }
  }
`;

export const ColumnHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .plus-icon {
    cursor: pointer;
    @media screen and (min-width: 1024px) {
      display: none;
    }
  }
`;

export const Title = styled.h6`
  margin: 1rem 0;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const PlusIcon = styled.span`
  /* @media screen and (min-width: 1024px) {
        display: none;
    }
    @media screen and (max-width: 768px) {
        display: block;
    } */
`;

export const ColumnItem = styled.li`
  font-size: 14px;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ColumnContent = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  @media screen and (max-width: 1024px) {
    transition: opacity 1s, display 1s;
    max-height: ${(props) => (props.isToggle ? 'auto' : '0')};
    opacity: ${(props) => (props.isToggle ? '1' : '0')};
    visibility: ${(props) => (props.isToggle ? 'visible' : 'hidden')};
  }
`;
