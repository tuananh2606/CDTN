import styled from 'styled-components';
import { Button } from '@mui/material';

export const BoxContainer = styled.div`
  box-sizing: border-box;
  padding-left: 6.4vw;
  padding-right: 6.4vw;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-top: 100px;

  @media only screen and (min-width: 768px) {
    padding-left: 3.125vw;
    padding-right: 3.125vw;
  }
  .wp-push {
    width: 100%;
    @media only screen and (min-width: 768px) {
      width: 50%;
      flex: 1;
      &:last-child {
        margin-left: 1rem;
      }
    }
    section {
      margin-bottom: 1rem;
    }
  }
`;

export const StyledButton = styled(Button)`
  &&& {
    height: 3rem;
    background-color: #000;
    color: white;
    padding: 1rem 1.5rem;
    box-shadow: none;
    &:hover {
      background-color: #eae8e4;
      color: #19110b;
    }
  }
`;

export const StyledButtonSave = styled(StyledButton)`
  margin-top: 2rem;
  width: 100%;
`;

export const StyledButtonChange = styled(StyledButton)`
  margin-top: 0.5rem;
`;
