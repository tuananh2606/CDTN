import { IoBookmarkOutline } from 'react-icons/io5';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';

import {
    StyledWrapper,
    StyledCarouselWrapper,
    StyledLeft,
    StyledRight,
    StyledProductCardWrapper,
    StyledProductCard,
    StyledProductHead,
    StyledButtonLink,
    StyledTabs,
    StyledDesTop,
    StyledDesBottom,
} from './ProductDetailsStyles';
import { addToCart } from '../../../redux/cartSlice';
import useWindowSize from '../../../hooks/useWindowSize';
import Carousel from '../../../components/Carousel';
import productApis from '../../../apis/productApis';

const ProductDetails = () => {
    const size = useWindowSize();
    const [description, setDescription] = useState([]);
    let { slug, code } = useParams();
    const dispatch = useDispatch();

    const { data, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: () => productApis.getProductDetails(slug, code),
        onSuccess: (data) => {
            setDescription(data.product.description.split(/[/]/g));
        },
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

    const hanldleBuy = (product) => {
        dispatch(addToCart(product));
    };

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

                            <h2>Thong tin san pham</h2>
                            <StyledDesTop>
                                {description &&
                                    description.length > 0 &&
                                    description.slice(0, 2).map((item, idx) => <span key={idx}>{item}</span>)}
                            </StyledDesTop>

                            <StyledDesBottom>
                                {description &&
                                    description.length > 0 &&
                                    description.slice(2, -1).map((str, idx) => <li key={idx}>{str}</li>)}
                            </StyledDesBottom>
                            <p>
                                {description &&
                                    description.length > 0 &&
                                    description.slice(-1).map((str, idx) => <span key={idx}>{str}</span>)}
                            </p>
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
