import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { Stack, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { StyledCard, StyledImg, ProductCardInfo, ProductName, ButtonRemove, StyledButton } from './CardStyles';
import { wishlistApis } from '../../../apis';

const Card = ({ wishlist }) => {
  const [flipped, setFlip] = useState(false);
  const { t } = useTranslation('product');
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.auth.login.currentUser);

  const removeFromWishlistMutation = useMutation({
    mutationFn: (id) => wishlistApis.removeFromWishlist(user?.accessToken, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });

  const handleRemove = (id) => {
    removeFromWishlistMutation.mutate(id);
  };
  const link = (category, slug, code) => {
    return `/${category}/${slug}/${code}`;
  };
  return (
    <StyledCard>
      <div className="card-front">
        <div>
          <StyledImg src={wishlist.product['images'][0].url} />
        </div>
        <ProductCardInfo>
          <ProductName>{wishlist.product.name}</ProductName>
        </ProductCardInfo>
        <ButtonRemove onClick={() => handleRemove(wishlist._id)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
              fill="black"
            />
          </svg>
        </ButtonRemove>
        <div className="button-flip" onClick={() => setFlip((prev) => !prev)} />
      </div>
      {flipped && (
        <div className="card-back">
          <span>{wishlist.product.code}</span>
          <ProductName>{wishlist.product.name}</ProductName>
          <Box sx={{ flex: '1 1 auto' }} />
          <div className="card-actions">
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <StyledButton>{t('btnAddToSC')}</StyledButton>

              <StyledButton
                component={Link}
                to={link(wishlist.product.category['slug'], wishlist.product.slug, wishlist.product.code)}
              >
                {t('product_details')}
              </StyledButton>
            </Stack>
          </div>
          <div className="button-flip" onClick={() => setFlip((prev) => !prev)} />
        </div>
      )}
    </StyledCard>
  );
};

export default Card;
