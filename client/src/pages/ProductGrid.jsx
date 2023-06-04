import styled from 'styled-components';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient, QueryClient } from '@tanstack/react-query';

import Carousel from '../components/Carousel';
import useScrollDirection from '../hooks/useScrollDirection';
import Filter from '../components/Filter';
import productApis from '../apis/productApis';

const ProductGrid = () => {
    const scrollDirection = useScrollDirection();
    let { category } = useParams();
    const queryClient = new QueryClient();
    const { data, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: () => productApis.getProductsByCategory(category),
    });
    if (isLoading) return 'Loading...';
    if (error) return 'An error has occurred: ' + error.message;
    const imgs = ['/images/product_test.png', '/images/frontview_img.png'];
    console.log(data.products);
    return (
        <>
            <Filter direction={scrollDirection.direction} />
            <ContainerProductList>
                {data.products.map((product) => (
                    <Card>
                        <Carousel imgs={product.images} autoplay={false} pagination={false} loop isProduct isCustom />
                        <ProductCardInfo>
                            <ProductName>{product.name}</ProductName>
                            <Variants>
                                <ButtonChangeColor />
                                <ButtonChangeColor />
                                <ButtonChangeColor />
                            </Variants>
                        </ProductCardInfo>
                        <a href="#" className="product-card__url" />
                    </Card>
                ))}
                {/* <Card>
                    <Carousel imgs={imgs} autoplay={false} pagination={false} loop isProduct isCustom />
                    <ProductCardInfo>
                        <ProductName>Test</ProductName>
                        <Variants>
                            <ButtonChangeColor />
                            <ButtonChangeColor />
                            <ButtonChangeColor />
                        </Variants>
                    </ProductCardInfo>
                    <a href="#" className="product-card__url" />
                </Card> */}
                ;
            </ContainerProductList>
        </>
    );
};

export default ProductGrid;

const ContainerProductList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

const Card = styled.div`
    position: relative;
    z-index: 1;
    padding: 1.5rem 1rem;
    box-shadow: inset 20px 50px 50px 10px #f6f5f3;
    /* background: rgb(231, 231, 231);
    background: radial-gradient(
        circle,
        rgba(231, 231, 231, 1) 0%,
        rgba(238, 238, 238, 1) 97%,
        rgba(250, 250, 250, 1) 100%
    ); */
    .product-card__url::after {
        content: '';
        position: absolute;
        inset: 0;
        z-index: 1;
    }
`;

const ProductCardInfo = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ProductName = styled.span`
    font-size: 0.875rem;
`;

const ButtonChangeColor = styled.span`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
    background-color: #000;
    cursor: pointer;
    margin: 0 0.25rem;
`;
const Variants = styled.div`
    z-index: 2;
`;
