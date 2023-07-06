import styled from 'styled-components';
import { Logo } from '../../components/Icon';
import { Link } from 'react-router-dom';

const HeaderOnly = ({ children }) => {
    return (
        <Header>
            <Link to="/" className="logo">
                <Logo width="100%" height="100%" />
            </Link>
            {children}
        </Header>
    );
};

export default HeaderOnly;

const Header = styled.header`
    position: fixed;
    z-index: 101;
    inset: 0;
    background-color: #fff;
    width: 100%;
    display: flex;
    height: 4.5rem;
    box-shadow: inset 0 -1px 0 var(--border-color);
    justify-content: space-between;

    .logo {
        height: 100%;
        width: 12rem;
        color: #000;
        padding-left: 3.3333333333333335vw;
        @media only screen and (min-width: 64em) {
            padding-left: 3.125vw;
        }
        @media only screen and (min-width: 48em) {
            padding-left: 3.125vw;
        }

        @media only screen and (min-width: 1024px) {
            width: 9.4375rem;
        }
    }
`;
