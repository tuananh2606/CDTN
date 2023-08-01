import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, QueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import useWindowSize from '../../../hooks/useWindowSize';
import Carousel from '../../../components/Carousel';
import useScrollDirection from '../../../hooks/useScrollDirection';
import Filter from '../../../components/Filter';
import productApis from '../../../apis/productApis';
import categoryApis from '../../../apis/categoryApis';
import { max } from 'lodash';
import {
  ContainerProductList,
  Card,
  ProductCardInfo,
  ProductName,
  ButtonChangeColor,
  Variants,
  StyledImg,
  Wrapper,
} from './ProductGridStyles';

const ProductGrid = () => {
  const scrollDirection = useScrollDirection();
  const [colorArray, setColorArray] = useState([]);
  const [slugs, setSlugs] = useState([]);
  let { category } = useParams();
  const navigate = useNavigate();
  const size = useWindowSize();
  const { ref, inView } = useInView();

  // const fetchProducts = async (page = 1) => {
  //   const response = await fetch(`https://api.github.com/search/repositories?q=topic:reactjs&per_page=10&page=${page}`);
  //   return response.json();
  // };

  const {
    status,
    data,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery({
    queryKey: ['products', category],
    queryFn: ({ pageParam = 1 }) => productApis.getProductsByCategory(category, pageParam),
    // queryFn: ({ pageParam = 1 }) => fetchProducts(pageParam),

    getNextPageParam: (lastPage, pages) => {
      const maxPages = lastPage?.total_count / 10;
      const nextPage = pages.length + 1;
      return nextPage <= maxPages ? nextPage : undefined;
    },
  });

  // const { data, isLoading, error } = useQuery({
  //   queryKey: ['products', category],
  //   queryFn: () => productApis.getProductsByCategory(category),
  //   enabled: !!category,
  // });
  useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApis.getAllCategories(),
    onSuccess: (data) => {
      data.map((item) => {
        setSlugs((prev) => [...prev, item.slug]);
      });
    },
  });

  useEffect(() => {
    if (slugs && slugs.length > 0) {
      !slugs.includes(category) && navigate('/notfound', { replace: true });
    }
  }, [slugs, category, navigate]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;
  const imgs = colorArray;
  const link = (slug, code) => {
    return `/${category}/${slug}/${code}`;
  };

  const handleChangeColor = (clr) => {
    if (clr) {
      setColorArray(clr);
    }
    setColorArray(clr);
  };

  return (
    <Wrapper>
      <Filter path={category} direction={scrollDirection.direction} />
      {/* <h1>Infinite Scroll</h1>
      <ul>
        {data.pages.map((page) =>
          page.items.map((repo) => (
            <li key={repo.id}>
              <p>
                <b>{repo.name}</b>
              </p>
              <p>{repo.description}</p>
            </li>
          )),
        )}
      </ul> */}
      <StyledImg
        src={
          size.width > 786
            ? data.pages[0].products[0].category['images'][1].url
            : data.pages[0].products[0].category['images'][0].url
        }
        alt="Anh background category"
      />
      <ContainerProductList>
        {data &&
          data.pages.length > 0 &&
          data.pages.map((page, idx) =>
            page.products.map((product, idx) => {
              return (
                <Card key={idx}>
                  <Carousel
                    imgs={product.images.slice(0, 3)}
                    autoplay={false}
                    pagination={false}
                    loop
                    isProduct
                    isCustom
                  />
                  <ProductCardInfo>
                    <ProductName>{product.name}</ProductName>
                    {/* <Variants>
                      {product.variation.colors.map((color, idx) => (
                        <ButtonChangeColor
                          key={idx}
                          color={color.color}
                          onClick={() => handleChangeColor(color.images.slice(0, 3))}
                        />
                      ))}
                    </Variants> */}
                  </ProductCardInfo>
                  <Link to={link(product.slug, product.code)} className="product-card__url" />
                </Card>
              );
            }),
          )}
      </ContainerProductList>
      <div>
        <button ref={ref} onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load Newer' : 'Nothing more to load'}
        </button>
      </div>
    </Wrapper>
  );
};

export default ProductGrid;
