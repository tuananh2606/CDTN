import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

import {
  ContainerProductList,
  StyledCard,
  ProductCardInfo,
  ProductName,
  ButtonRemove,
  StyledImg,
  StyledButton,
} from './OrderPageStyles';
import orderApis from '../../apis/orderApis';

const OrderPage = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const { data, isLoading, error } = useQuery({
    queryKey: ['order-by-user', user._id],
    queryFn: () => orderApis.getOrderByUser(user._id),
  });

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  console.log(data);

  return (
    <section style={{ minHeight: '100vh', height: 'auto', backgroundColor: '#f6f5f3' }}>
      <ContainerProductList>
        <StyledCard>
          <div className="card-front">
            <div>
              <StyledImg src="" alt="Anh" />
            </div>
            <ProductCardInfo>
              <ProductName>Name</ProductName>
            </ProductCardInfo>
          </div>
        </StyledCard>
      </ContainerProductList>
    </section>
  );
};

export default OrderPage;
