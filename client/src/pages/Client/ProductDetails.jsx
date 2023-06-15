import styled from 'styled-components';
import { IoBookmarkOutline } from 'react-icons/io5';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart } from '../../redux/cartSlice';
import useWindowSize from '../../hooks/useWindowSize';
import Carousel from '../../components/Carousel';
import productApis from '../../apis/productApis';

const ProductDetails = () => {
    const size = useWindowSize();
    let { slug, code } = useParams();
    const dispatch = useDispatch();

    const { data, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: () => productApis.getProductDetails(slug, code),
    });

    if (isLoading) return 'Loading...';
    if (error) return 'An error has occurred: ' + error.message;
    const imgs = [
        '/images/productdetail-frontview.png',
        '/images/frontview_img.png',
        '/images/frontview_img.png',
        '/images/frontview_img.png',
        '/images/productdetail-frontview.png',
        '/images/frontview_img.png',
        '/images/frontview_img.png',
        '/images/frontview_img.png',
    ];
    // if (size.width <= 1024) {
    //     console.log(size.width);
    // }

    const hanldleBuy = (product) => {
        console.log(product);
        dispatch(addToCart(product));
    };

    console.log(data);
    return (
        <>
            <StyledWrapper>
                {size.width <= 1024 ? (
                    <StyledCarouselWrapper>
                        <Carousel imgs={data.product?.images} autoplay={false} pagination={false} isCustom />
                    </StyledCarouselWrapper>
                ) : (
                    <StyledLeft>
                        {data.product?.images.map((img, idx) => (
                            <img key={idx} src={img.url} alt="Anh" />
                        ))}
                        {/* <img src="/images/productdetail-frontview.png"></img>
                        <img src="/images/productdetail-frontview.png"></img>
                        <img src="/images/productdetail-frontview.png"></img>
                        <img src="/images/productdetail-frontview.png"></img>
                        <img src="/images/productdetail-frontview.png"></img> */}
                    </StyledLeft>
                )}

                <StyledRight>
                    <StyledProductCardWrapper>
                        <StyledProductCard>
                            <StyledProductHead>
                                <div className="product-top-head">
                                    <span className="product-id">{data.product?.code}</span>
                                    <IoBookmarkOutline />
                                </div>
                                <h1 className="product-name">{data.product?.name}</h1>
                            </StyledProductHead>
                            {/* <div>
                                <StyledProductVariation>
                                    <span className="product-variation">Sizes</span>
                                    <span>{data.product?.variation.size[0]}</span>
                                </StyledProductVariation>
                                <StyledOtherProduct>
                                    <span>Other Sizes</span>
                                    <div className="product-variation-selector">
                                        <span>LV Archlight 2.0 Platform Sneaker</span>
                                    </div>
                                </StyledOtherProduct>
                            </div> */}
                            <StyledButtonLink
                                onClick={() =>
                                    hanldleBuy({
                                        id: data.product?._id,
                                        img: data.product?.images[0],
                                        name: data.product?.name,
                                        code: data.product?.code,
                                        price: data.product?.price,
                                        quantity: 1,
                                    })
                                }
                            >
                                Mua
                            </StyledButtonLink>

                            <p>{data.product?.description}</p>
                            <h2>Thong tin san pham</h2>
                        </StyledProductCard>
                    </StyledProductCardWrapper>
                </StyledRight>
            </StyledWrapper>
            <StyledTabs>
                <h2>YOU MAY ALSO LIKE</h2>
                <Carousel
                    imgs={imgs}
                    autoplay={false}
                    loop={false}
                    slidesperview={size.width <= 480 ? 2 : 3}
                    turnOffArrows
                    isProduct
                    pagination
                />
            </StyledTabs>
        </>
    );
};

export default ProductDetails;

const StyledWrapper = styled.section`
    display: flex;
    width: 100%;
    @media screen and (max-width: 1024px) {
        flex-direction: column;
    }
`;

const StyledCarouselWrapper = styled.div`
    position: relative;
    width: 100%;
`;

const StyledLeft = styled.div`
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
const StyledRight = styled.div`
    position: relative;
    width: 50%;
    @media screen and (max-width: 1024px) {
        width: 100%;
    }
`;

const StyledProductCardWrapper = styled.div`
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

const StyledProductCard = styled.div`
    /* display: flex;
    flex-direction: column; */
    width: 300px;
    @media screen and (max-width: 1024px) {
        width: 100%;
    }
`;
const StyledProductHead = styled.div`
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
const StyledProductPart = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 52px;
`;

const StyledProductVariation = styled(StyledProductPart)`
    border-bottom: 1px solid #eae8e4;
`;
const StyledOtherProduct = styled(StyledProductPart)`
    font-size: 14px;
`;
const StyledButtonLink = styled.button`
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
const StyledTabs = styled.div`
    position: relative;
    padding: 4rem 8rem;
    @media screen and (max-width: 1024px) {
        padding: 2rem 4rem;
    }
    @media screen and (max-width: 768px) {
        padding: 1rem 2rem;
    }
`;
