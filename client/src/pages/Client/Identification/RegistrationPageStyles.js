import styled from 'styled-components';
import { Button } from '@mui/material';

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

export const RegistrationSection = styled.section`
  margin-top: var(--header-height);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 48rem) {
    flex-direction: row;
  }
`;

export const PageTitle = styled.h1`
  margin: 0;
  padding: 18px 0;
  font-size: 2.125rem;
  font-weight: bold;
  border-bottom: 1px solid var(--border-color);
`;

export const RegistrationWrapper = styled.div`
  width: 100%;
  padding: 0.5rem 7.5rem 2.5rem;
  background-color: #f6f5f3;
  @media screen and (min-width: 48rem) {
    width: 66.666%;
  }
`;

export const RegistrationForm = styled.div`
  margin: 1.875rem auto;
`;

export const FormLabel = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  span {
    margin-left: 0.5rem;
  }
`;

export const SocialWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  p {
    white-space: pre-line;
  }
`;

export const StyledStepLabel = styled.h3`
  font-size: 1.5rem;
  margin: 0;
  justify-content: flex-start;
  text-transform: uppercase;
`;
export const StyledButton = styled(Button)`
  &&& {
    height: 3rem;
    margin-top: 1.5rem;
    background-color: #000;
    color: white;
    padding: 1rem 1.5rem;
  }
`;
