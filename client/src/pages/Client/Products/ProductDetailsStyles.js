import styled from 'styled-components';

export const StyledWrapper = styled.section`
    display: flex;
    width: 100%;
    @media screen and (max-width: 1024px) {
        flex-direction: column;
    }
`;

export const StyledCarouselWrapper = styled.div`
    position: relative;
    width: 100%;
`;

export const StyledLeft = styled.div`
    position: relative;
    top: 0;
    width: 50%;
    display: grid;
    gap: 4px;

    grid-template-areas:
        'pic1 pic1'
        'pic2 pic3'
        'pic4 pic5';
    img {
        background-color: #f6f5f3;
    }
    img:first-child {
        grid-area: pic1;
        width: 100%;
        height: 100%;
    }
    img:nth-child(2) {
        grid-area: pic2;
        width: 100%;
        height: 100%;
    }
    img:nth-child(3) {
        grid-area: pic3;
        width: 100%;
        height: 100%;
    }
    img:nth-child(4) {
        grid-area: pic4;
        width: 100%;
        height: 100%;
    }
    img:nth-child(5) {
        grid-area: pic5;
        width: 100%;
        height: 100%;
    }
`;
export const StyledRight = styled.div`
    position: relative;
    width: 50%;
    @media screen and (max-width: 1024px) {
        width: 100%;
    }
`;

export const StyledProductCardWrapper = styled.div`
    height: 100vh;
    width: 100%;
    position: sticky;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media screen and (max-width: 1024px) {
        box-sizing: border-box;
        display: block;
        position: relative;
        padding: 1rem 2rem 0;
        height: auto !important;
    }
`;

export const StyledProductCard = styled.div`
    /* display: flex;
    flex-direction: column; */
    width: 300px;
    @media screen and (max-width: 1024px) {
        width: 100%;
    }
`;
export const StyledProductHead = styled.div`
    display: flex;
    flex-direction: column;
    height: 56px;
    .product-top-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
    }
    .product-id {
        font-size: 14px;
        margin-bottom: 0.75rem;
    }
    .product-name {
        font-size: 18px;
        margin: 0 0 0.5rem;
    }
`;
export const StyledProductPart = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 52px;
`;

export const StyledProductVariation = styled(StyledProductPart)`
    border-bottom: 1px solid #eae8e4;
`;
export const StyledOtherProduct = styled(StyledProductPart)`
    font-size: 14px;
`;
export const StyledButtonLink = styled.button`
    width: 100%;
    background-color: transparent;
    padding: 0.625rem 1.5rem 0.85rem;
    margin-top: 4rem;
    box-shadow: inset 0 0 0 1px #000;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    font-size: 1rem;
    transition: border 0.3s cubic-bezier(0.39, 0.575, 0.565, 1), box-shadow 0.3s;
    &:hover {
        box-shadow: inset 0 0 0 2px #000;
    }
    @media screen and (max-width: 1024px) {
        margin-top: 2rem;
    }
`;
export const StyledTabs = styled.div`
    position: relative;
    padding: 4rem 8rem;
    @media screen and (max-width: 1024px) {
        padding: 2rem 4rem;
    }
    @media screen and (max-width: 768px) {
        padding: 1rem 2rem;
    }
`;
export const StyledDesTop = styled.p`
    display: flex;
    flex-direction: column;
`;

export const StyledDesBottom = styled.ul`
    columns: 2;
    list-style: disc inside;
    li {
        letter-spacing: 0.025rem;
        font-weight: 300;
        line-height: 1.5rem;
    }
`;
