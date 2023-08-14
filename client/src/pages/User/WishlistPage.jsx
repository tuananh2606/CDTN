import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

import { ContainerProductList, Empty } from './WishlistPageStyles';
import { Card } from '../../components/common';
import { wishlistApis } from '../../apis';

const WishlistPage = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const { data, isLoading, error } = useQuery({
    queryKey: ['wishlist', user._id],
    queryFn: () => wishlistApis.getWishlist(user._id),
  });

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <section style={{ minHeight: '100vh', height: 'auto', backgroundColor: '#f6f5f3' }}>
      <ContainerProductList>
        {data && data.length > 0 ? (
          data.map((item, idx) => <Card wishlist={item} key={idx} />)
        ) : (
          <Empty>Your wishlist is empty</Empty>
        )}
      </ContainerProductList>
    </section>
  );
};

export default WishlistPage;
