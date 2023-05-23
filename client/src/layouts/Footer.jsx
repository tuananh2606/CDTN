import styled from 'styled-components';
import { BsPlus } from 'react-icons/bs';
import { useState } from 'react';

const Footer = () => {
    const [isToggle, setToggle] = useState(false);

    return (
        <Wrapper>
            <ColumnFooter>
                <ColumnHead>
                    <Title>HELP</Title>
                    <PlusIcon onClick={() => setToggle(!isToggle)}>
                        <BsPlus size={18} className="plus-icon" />
                    </PlusIcon>
                </ColumnHead>

                <ColumnContent isToggle={isToggle}>
                    <ColumnItem>You can call or email us.</ColumnItem>
                    <ColumnItem>FAQ'S</ColumnItem>
                    <ColumnItem>Product Care</ColumnItem>
                    <ColumnItem>Stores</ColumnItem>
                </ColumnContent>
            </ColumnFooter>
            <ColumnFooter>
                <ColumnHead>
                    <Title>HELP</Title>
                    <BsPlus size={18} className="plus-icon" onClick={() => setToggle(!isToggle)} />
                </ColumnHead>

                <ColumnContent isToggle={isToggle}>
                    <ColumnItem>You can call or email us.</ColumnItem>
                    <ColumnItem>FAQ'S</ColumnItem>
                    <ColumnItem>Product Care</ColumnItem>
                    <ColumnItem>Stores</ColumnItem>
                </ColumnContent>
            </ColumnFooter>
            <ColumnFooter>
                <ColumnHead>
                    <Title>HELP</Title>
                    <BsPlus size={18} className="plus-icon" onClick={() => setToggle(!isToggle)} />
                </ColumnHead>

                <ColumnContent isToggle={isToggle}>
                    <ColumnItem>You can call or email us.</ColumnItem>
                    <ColumnItem>FAQ'S</ColumnItem>
                    <ColumnItem>Product Care</ColumnItem>
                    <ColumnItem>Stores</ColumnItem>
                </ColumnContent>
            </ColumnFooter>
            <ColumnFooter>
                <ColumnHead>
                    <Title>HELP</Title>
                    <BsPlus size={18} className="plus-icon" onClick={() => setToggle(!isToggle)} />
                </ColumnHead>

                <ColumnContent isToggle={isToggle}>
                    <ColumnItem>You can call or email us.</ColumnItem>
                    <ColumnItem>FAQ'S</ColumnItem>
                    <ColumnItem>Product Care</ColumnItem>
                    <ColumnItem>Stores</ColumnItem>
                </ColumnContent>
            </ColumnFooter>
        </Wrapper>
    );
};

export default Footer;

const Wrapper = styled.footer`
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

const ColumnFooter = styled.div`
    flex: 1;

    @media screen and (max-width: 1024px) {
        border-bottom: 1px solid var(--border-color);
        &:first-child {
            border-top: 1px solid var(--border-color);
        }
    }
`;

const ColumnHead = styled.div`
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

const Title = styled.h6`
    margin: 1rem 0;
    @media screen and (max-width: 768px) {
        font-size: 1rem;
    }
`;

const PlusIcon = styled.span`
    /* @media screen and (min-width: 1024px) {
        display: none;
    }
    @media screen and (max-width: 768px) {
        display: block;
    } */
`;

const ColumnItem = styled.li`
    font-size: 14px;
    margin-bottom: 1rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

const ColumnContent = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    @media screen and (width < 1024px) {
        display: ${(props) => (props.isToggle ? 'block' : 'none')};
    }
`;
