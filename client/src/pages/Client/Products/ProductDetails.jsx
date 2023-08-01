import { IoBookmarkOutline, IoBookmark } from 'react-icons/io5';
import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  StyledWrapper,
  StyledCarouselWrapper,
  StyledLeft,
  StyledRight,
  StyledProductCardWrapper,
  StyledProductCard,
  StyledProductHead,
  StyledButtonLink,
  StyledRecommendation,
  ProductDesButton,
  StyledDesContainer,
  StyledDes,
} from './ProductDetailsStyles';
import { addToWishlist } from '../../../redux/wishlistSlice';
import { addToCart } from '../../../redux/cartSlice';
import useWindowSize from '../../../hooks/useWindowSize';
import Carousel from '../../../components/Carousel';
import productApis from '../../../apis/productApis';
import wishlistApis from '../../../apis/wishlistApis';

const ProductDetails = () => {
  const size = useWindowSize();
  const [description, setDescription] = useState();
  const [checkWishlist, setCheckWishlist] = useState(false);
  const [producId, setProductId] = useState();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [productsRecom, setProductsRecom] = useState([]);
  const ref = useRef(null);
  let { slug, code } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation('product');
  const user = useSelector((state) => state.auth.login.currentUser);

  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => productApis.getProductDetails(slug, code),
    onSuccess: (data) => {
      setProductId(data.product._id);
      // setDescription(data.product.description.split(/[/]/g));
    },
  });

  const { refetch } = useQuery({
    queryKey: ['wishlist'],
    queryFn: () => wishlistApis.checkProductInWishlist(user._id, producId),
    enabled: !!producId,
    onSuccess: (data) => {
      // queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      if (data.product.length > 0) setIsInWishlist(true);
    },
  });

  useQuery({
    queryKey: ['products recommendation'],
    queryFn: () => productApis.getLatestProducts(),
    onSuccess: (data) => {
      data.filter((item) => {
        item !== setProductsRecom((prev) => [...prev, item.images[0]]);
      });
    },
  });

  const addToWishlistMutation = useMutation({
    mutationFn: (data) => wishlistApis.addToWishlist(user?.accessToken, data),
    onSuccess: () => {
      refetch();
    },
  });
  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  const hanldleBuy = (product) => {
    dispatch(addToCart(product));
  };

  const handleAddToWishlist = (product, user) => {
    addToWishlistMutation.mutate({ product: product, user: user });
  };

  const scrollToSpecificElement = () => {
    window.scrollTo({
      top: ref.current.offsetTop - 20,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <StyledWrapper>
        {size.width < 1024 ? (
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

                  {isInWishlist ? (
                    <IoBookmark size="16px" />
                  ) : (
                    <IoBookmarkOutline size="16px" onClick={() => handleAddToWishlist(data.product._id, user._id)} />
                  )}
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
                {t('btnAddToSC')}
              </StyledButtonLink>

              <ProductDesButton onClick={scrollToSpecificElement} v-safe-href="#details">
                <span>{t('product_details')}</span>
              </ProductDesButton>
            </StyledProductCard>
          </StyledProductCardWrapper>
        </StyledRight>
      </StyledWrapper>
      <StyledDesContainer ref={ref}>
        <div className="product__detailed-features">
          <h2 className="product-details__title">{t('product_details')}</h2>
          <StyledDes
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(data.product?.description),
            }}
          ></StyledDes>
        </div>
        <div></div>
      </StyledDesContainer>
      <StyledRecommendation>
        <div className="wrapper">
          <h2>{t('product_recommendation')}</h2>
          <Carousel
            imgs={productsRecom}
            autoplay={false}
            loop={false}
            slidesperview={size.width <= 480 ? 2 : 3}
            turnOffArrows
            isProduct
            pagination
          />
        </div>
      </StyledRecommendation>
    </>
  );
};

export default ProductDetails;
