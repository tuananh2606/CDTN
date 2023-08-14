import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import useWindowSize from '../../../hooks/useWindowSize';
import Carousel from '../../../components/Carousel';
import useScrollDirection from '../../../hooks/useScrollDirection';
import Filter from '../../../components/Filter';
import productApis from '../../../apis/productApis';
import categoryApis from '../../../apis/categoryApis';
import { ContainerProductList, Card, ProductCardInfo, ProductName, StyledImg, Wrapper } from './ProductGridStyles';

const ProductGrid = () => {
  const scrollDirection = useScrollDirection();
  const [slugs, setSlugs] = useState([]);
  const [filterData, setFilterData] = useState(null);

  let { category } = useParams();
  const navigate = useNavigate();
  const size = useWindowSize();
  const { ref, inView } = useInView();

  const fetchProducts = async (page = 1) => {
    const response = await fetch(`https://api.github.com/search/repositories?q=topic:reactjs&per_page=10&page=${page}`);
    return response.json();
  };

  const {
    data,
    error,
    isLoading,
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
      const maxPages = lastPage?.total_pages;
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
      data?.categories.map((item) => {
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

  const link = (slug, code) => {
    return `/${category}/${slug}/${code}`;
  };

  console.log(data);

  return (
    <Wrapper>
      <Filter path={category} setFilterData={setFilterData} direction={scrollDirection.direction} />
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
            ? data.pages[0].products[0]?.category['images'][1]?.url
            : data.pages[0].products[0]?.category['images'][0]?.url
        }
        alt="Anh background category"
      />
      <ContainerProductList>
        {filterData && filterData.length > 0 ? (
          filterData.map((product, idx) => (
            <Card key={idx}>
              <Carousel imgs={product.images.slice(0, 3)} autoplay={false} pagination={false} loop isProduct isCustom />
              <ProductCardInfo>
                <ProductName>{product.name}</ProductName>
              </ProductCardInfo>
              <Link to={link(product.slug, product.code)} className="product-card__url" />
            </Card>
          ))
        ) : filterData === null ? (
          data &&
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
                  </ProductCardInfo>
                  <Link to={link(product.slug, product.code)} className="product-card__url" />
                </Card>
              );
            }),
          )
        ) : (
          <div>Không có sản phẩm trong khoảng giá</div>
        )}
      </ContainerProductList>
      <div className="load-more">
        <button ref={ref} onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load Newer' : ''}
        </button>
      </div>
    </Wrapper>
  );
};

export default ProductGrid;
