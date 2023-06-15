import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoCloseOutline, IoChevronForward } from 'react-icons/io5';

const Filter = ({ direction, path }) => {
    const [filterToggle, setFilterToggle] = useState(false);
    useEffect(() => {
        if (filterToggle === true) {
            if (typeof window != 'undefined' && window.document) {
                document.body.style.overflow = 'hidden';
            }
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [filterToggle]);
    console.log(path);

    return (
        <>
            <FilterWrapper>
                <FilterContent direction={direction}>
                    <h5>{path.charAt(0).toUpperCase() + path.slice(1)}</h5>
                    <div>
                        <ButtonFilter onClick={() => setFilterToggle(!filterToggle)}>
                            <span>Filter</span>
                            <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 96 960 960" width="22">
                                <path d="M700 926q-58 0-99-41t-41-99q0-58 41-99t99-41q58 0 99 41t41 99q0 58-41 99t-99 41Zm-.235-60Q733 866 756.5 842.735q23.5-23.264 23.5-56.5Q780 753 756.735 729.5q-23.264-23.5-56.5-23.5Q667 706 643.5 729.265q-23.5 23.264-23.5 56.5Q620 819 643.265 842.5q23.264 23.5 56.5 23.5ZM120 816v-60h360v60H120Zm140-310q-58 0-99-41t-41-99q0-58 41-99t99-41q58 0 99 41t41 99q0 58-41 99t-99 41Zm-.235-60Q293 446 316.5 422.735q23.5-23.264 23.5-56.5Q340 333 316.735 309.5q-23.264-23.5-56.5-23.5Q227 286 203.5 309.265q-23.5 23.264-23.5 56.5Q180 399 203.265 422.5q23.264 23.5 56.5 23.5ZM480 396v-60h360v60H480Z" />
                            </svg>
                        </ButtonFilter>
                    </div>
                </FilterContent>

                <FilterModal filterToggle={filterToggle}>
                    <FilterModalTitle>
                        <h2>SHOW FILTER</h2>
                        <IoCloseOutline
                            size={32}
                            className="close-btn"
                            onClick={() => setFilterToggle(!filterToggle)}
                        />
                    </FilterModalTitle>
                    <FilterModalContent>
                        <FilterContentItem>
                            <h3>CATEGORIES</h3>
                            <IoChevronForward size={20} />
                        </FilterContentItem>
                        <FilterContentItem>
                            <h3>COLORS</h3>
                            <IoChevronForward size={20} />
                        </FilterContentItem>
                        <FilterContentItem>
                            <h3>SIZES</h3>
                            <IoChevronForward size={20} />
                        </FilterContentItem>
                    </FilterModalContent>
                </FilterModal>
            </FilterWrapper>
            {filterToggle && <BackDrop />}
        </>
    );
};

export default Filter;

const FilterWrapper = styled.div`
    margin-top: calc(var(--header-height) + 4rem);
    @media only screen and (max-width: 768px) {
        margin-top: calc(4rem + 4rem);
    }
`;
const FilterContent = styled.div`
    background-color: #fff;
    width: 100%;
    min-height: 4rem;
    position: fixed !important;
    top: ${(props) => (props.direction === 'down' ? '-5.5rem' : '0')};
    transform: translateY(var(--header-height));
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--header-padding-x);
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    z-index: 99;
    h5 {
        font-weight: normal;
        font-size: 14px;
    }
    @media only screen and (max-width: 768px) {
        transform: translateY(3.7rem);
        top: ${(props) => (props.direction === 'down' ? '-3.7rem' : '0')};
    }
`;

const ButtonFilter = styled.button`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 999px;
    border: 1px solid #ccc;
    background-color: transparent;

    span {
        margin-right: 0.5rem;
        font-size: 14px;
    }
`;

const FilterModal = styled.div`
    position: fixed;
    inset: 0 0 0 66%;
    background-color: #fff;
    z-index: 999;
    color: #000;
    transform: ${(props) => (props.filterToggle ? 'translateX(0)' : 'translateX(100%)')};
    transition: transform 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);
    /* @media only screen and (min-width: 64rem) {
        transform: translate3d(60vw, 0, 0);
    } */
    /*Mobile*/
    /* @media only screen and (min-width: 48rem) {
        transform: translate3d(50vw, 0, 0);
    } */
`;

const FilterModalTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 1px #eae8e4;
    height: 4.5rem;
    h2 {
        width: 100%;
        padding: 0 2.5rem;
    }
    .close-btn {
        height: 100%;
        padding: 0 1.5rem;
        box-shadow: -1px 1px #eae8e4;
        /* border-left: 2px solid #eae8e4; */
        cursor: pointer;
        &:hover {
            background-color: #eae8e4;
        }
    }
`;

const FilterModalContent = styled.div`
    display: block;
    height: 100%;
    padding: 3rem 2rem 0;
`;

const FilterContentItem = styled.div`
    display: flex;
    margin: auto 0;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #eae8e4;
    span {
        font-size: 18px;
    }
    &:last-child {
        border: none;
    }
`;

const BackDrop = styled.div`
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 101;
`;
