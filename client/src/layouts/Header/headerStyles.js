import styled from 'styled-components';
import Badge from '@mui/material/Badge';

export const Wrapper = styled.header`
    position: relative;
`;

export const StyledIconButton = styled.button`
    position: absolute;
    transform: translateY(-50%);
    z-index: 999;
    display: flex;
    align-items: center;
    padding: 0;
    cursor: pointer;
    color: ${(props) => (!props.navToggle && props.direction === 'top' ? '#fff' : '#000')};
    background-color: transparent;
    border: none;
`;

export const StyledNavigation = styled.div`
    box-sizing: border-box;
    background-color: ${(props) => (props.direction === 'up' ? '#fff' : 'transparent')};
    background-color: ${(props) => props.pathname !== '/' && '#fff'};
    font-family: futura-pt-light, Helvetica, Arial, sans-serif;
    position: fixed;
    top: ${(props) => (props.direction === 'down' ? '-8rem' : '0px')};
    z-index: 100;
    color: ${(props) => (props.direction === 'top' ? '#fff' : '#000')};
    color: ${(props) => props.pathname !== '/' && '#000'};
    height: var(--header-height);
    padding: var(--header-padding-top) var(--header-padding-x) 0;
    width: 100%;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    @media (max-width: 768px) {
        height: 4rem;
        padding: calc(var(--header-padding-top) / 2) calc(var(--header-padding-x) / 2) 0;
    }
`;

export const LabelMenuHamburger = styled.div`
    display: inline-block;
    height: 60px;
    line-height: 60px;
    position: relative;
    overflow: hidden;
    color: ${(props) => props.pathname !== '/' && '#000'};
    .label-up {
        display: block;
        position: relative;
        height: 100%;
        margin-left: 12px;
        top: 0%;

        transition: 0.4s;
    }

    &.move-label-up {
        .label-up {
            top: -100%;
        }
    }
`;

export const NavBarTop = styled.div`
    width: 100%;
    display: grid;
    align-items: center;
    position: relative;
    grid-template-columns: repeat(3, 1fr);
    padding: 0.5rem 0;

    .nav--left {
        justify-self: start;
        @media (max-width: 768px) {
            span {
                display: none;
            }
        }
    }
    .nav--right {
        justify-self: end;
        display: flex;
        align-items: center;
        .cart-link {
            display: flex;
            align-items: center;
            text-decoration: none;
            padding: 5px;
            color: inherit;
            .cart-icon {
                margin-right: 2px;
            }
            span {
                font-size: 14px;
            }
        }
        .nav-right__icons {
            cursor: pointer;
            margin: 0 0.5rem;
            display: none;
            @media (min-width: 768px) {
                display: block;
            }
        }
        > *:first-child {
            margin-right: 0.5rem;
            @media (max-width: 768px) {
                display: block !important;
            }
        }
    }
    .logo {
        width: 14.1875rem;
        display: flex;
        align-items: center;
        justify-self: center;
        color: inherit;
        @media (max-width: 768px) {
            width: 9.625rem;
        }
    }
`;

export const BackDrop = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 100;
`;

export const StyledBadge = styled(Badge)`
    .MuiBadge-badge {
        background-color: #ccc;
        color: red;
        right: 5px;
        top: 5px;
        min-width: 12px;
        width: 14px;
        height: 14px;
    }
`;
