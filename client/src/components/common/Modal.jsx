import styled from 'styled-components';
import { IoCloseOutline, IoChevronForward } from 'react-icons/io5';

const Modal = ({ title, children, ...props }) => {
    return (
        <Container {...props}>
            <ModalTitle>
                <h2>
                    <span>{title}</span>
                </h2>
                <button className="close-btn">
                    <IoCloseOutline size={22} onClick={() => props.setToggle(false)} />
                </button>
            </ModalTitle>
            <ModalContent>{children}</ModalContent>
        </Container>
    );
};

export default Modal;

const Container = styled.div`
    position: fixed;
    inset: 0;
    z-index: 101;
    color: #000 !important;
    height: auto;
    background-color: #fff;
    transform: ${(props) => (props.toggle ? 'translateZ(0)' : 'translate3d(100vw,0,0)')};
    transition: transform 0.3s ease-in-out;

    @media screen and (min-width: 768px) {
        width: 50vw;
        transform: ${(props) => (props.toggle ? 'translate3d(50vw, 0, 0)' : 'translate3d(100vw,0,0)')};
    }
    @media screen and (min-width: 1024px) {
        width: 40vw;
        transform: ${(props) => (props.toggle ? 'translate3d(60vw, 0, 0)' : 'translate3d(100vw,0,0)')};
    }
    @media screen and (min-width: 1440px) {
        width: 33.3333333333vw;

        transform: ${(props) => (props.toggle ? 'translate3d(66.6666666667vw, 0, 0)' : 'translate3d(100vw,0,0)')};
    }
`;

const ModalTitle = styled.div`
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 1px #eae8e4;
    height: 4.5rem;
    span {
        font-size: 1.75rem;
        width: 100%;
        padding: 0 2rem;
    }
    .close-btn {
        height: 100%;
        width: 4.5rem;
        border: none;
        background-color: transparent;
        box-shadow: -1px 1px #eae8e4;
        padding: 1rem 1rem;
        /* border-left: 2px solid #eae8e4; */
        cursor: pointer;
        &:hover {
            background-color: #eae8e4;
        }
    }
`;

const ModalContent = styled.div`
    box-sizing: border-box;
    height: calc(100vh - 5rem);
    /* max-height: calc(100vh - 4.5rem); */
    overflow-y: auto;
    padding: 1.5rem 6.4vw 0;
    @media screen and (min-width: 768px) {
        padding: 3rem 3rem;
        padding-left: 3.125vw;
        padding-right: 3.125vw;
    }
    @media screen and (min-width: 1024px) {
        padding-left: 3.125vw;
        padding-right: 3.125vw;
    }
    @media screen and (min-width: 1440px) {
        padding-left: 3.3333333333vw;
        padding-right: 3.3333333333vw;
    }
`;
