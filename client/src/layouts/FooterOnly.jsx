import LanguageIcon from '@mui/icons-material/Language';
import styled from 'styled-components';
import { Box } from '@mui/material';

const FooterOnly = () => {
    return (
        <Wrapper>
            <ul>
                <li>
                    <Box sx={{ display: 'flex' }}>
                        <LanguageIcon sx={{ mr: 1 }} fontSize="medium" />
                        <span>English</span>
                    </Box>
                </li>
                <li>
                    <a href="#">Newsletter</a>
                </li>
                <li>
                    <a href="#">Contact</a>
                </li>
                <li>
                    <a href="#">Stores</a>
                </li>
                <li>
                    <a href="#">Follow Us</a>
                </li>
                <li>
                    <a href="#">Legal & Privacy</a>
                </li>
            </ul>
        </Wrapper>
    );
};

export default FooterOnly;

const Wrapper = styled.footer`
    width: 100%;
    background-color: #000;
    padding: 2rem 0;
    color: #fff;
    ul {
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
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
