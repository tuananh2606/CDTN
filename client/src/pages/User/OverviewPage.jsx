import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { useTranslation } from 'react-i18next';

import { logoutUser } from '../../redux/apiRequest';
import { logoutSuccess } from '../../redux/authSlice';
import { HeadPage, UserIndetity, UserFrame, Name, BoxContainer, LogoutButton } from './OverviewPageStyles';
import { createAxios } from '../../utils/http';
import Box from '../../components/common/Box';

const OverviewPage = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { t } = useTranslation('profile');
  let axiosJWT = createAxios(user, dispatch, logoutSuccess);

  useEffect(() => {
    if (state) {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0';
    }
  }, []);

  const handleLogout = () => {
    logoutUser(dispatch, user?.accessToken, navigate, axiosJWT);
    googleLogout();
  };

  return (
    <section style={{ backgroundColor: '#f6f5f3', height: '1000px' }}>
      <HeadPage>
        <img
          src="https://secure.louisvuitton.com/images/is/image/lv/1/LV/louis-vuitton--my_lv_welcome_page_desktop.jpg"
          alt="Anh nen"
        />
        <UserIndetity>
          <UserFrame>
            <span>{`${user.firstName.slice(0, 1)}.${user.lastName.slice(0, 1)}`}</span>
          </UserFrame>
          <Name>{`${user.firstName} ${user.lastName}`}</Name>
        </UserIndetity>
      </HeadPage>
      <BoxContainer>
        <div className="wp-push">
          <Box title="my_account">
            <div className="container">
              <strong>Email: </strong>
              <span>{user.email}</span>
            </div>
          </Box>
        </div>
        <div className="wp-push">
          <Box title="my_orders" className="text-center">
            <span>{t('no_order')}</span>
          </Box>
          <Box title="my_wishlist" className="text-center">
            <span>{t('empty_wishlist')}</span>
          </Box>
        </div>
      </BoxContainer>
      <LogoutButton>
        <button onClick={handleLogout}>{t('authentication.logout', { ns: 'common' })}</button>
      </LogoutButton>
    </section>
  );
};

export default OverviewPage;
