import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { memo } from 'react';
import { useState, forwardRef } from 'react';
import { IoChevronForward } from 'react-icons/io5';
import { useQuery } from '@tanstack/react-query';

import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import useWindowSize from '../../hooks/useWindowSize';
import categoryApis from '../../apis/categoryApis';
import LevelMenu from './LevelMenu';

import { createAxios } from '../../utils/http';
import { logoutSuccess } from '../../redux/authSlice';
import { logoutUser } from '../../redux/apiRequest';

const MegaMenu = ({ navToggle, setNavToggle }, ref) => {
  // useImperativeHandle(ref, () => ({
  //     resetMenu,
  // }));
  const size = useWindowSize();
  const { t } = useTranslation('home');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApis.getAllCategories(),
  });
  const user = useSelector((state) => state.auth.login.currentUser);
  let axiosJWT = createAxios(user, dispatch, logoutSuccess);
  const handleLogout = () => {
    setNavToggle(false);
    logoutUser(dispatch, user?.accessToken, navigate, axiosJWT);
  };

  const MENU_ITEMS = [
    {
      title: 'Women',
      children: {
        title: 'Women',
        data: [
          {
            title: 'For women',
            to: '/women',
          },
          {
            title: 'For girl',
            to: '/girl',
          },
        ],
      },
    },
    {
      title: 'Men',
    },
    {
      title: 'Children',
    },
  ];

  const [history, setHistory] = useState([{ data: data }]);
  const current = history[history.length - 1];

  const handleBack = () => {
    setHistory((prev) => prev.slice(0, prev.length - 1));
  };

  const resetMenu = () => {
    setNavToggle(false);
    setHistory((prev) => prev.slice(0, 1));
  };

  return (
    <nav>
      <NavigationWrapper navToggle={navToggle} ref={ref}>
        {history.length > 1 && <LevelMenu title={current.title} onBack={handleBack} />}
        <ul>
          {data?.categories.map((item, idx) => {
            const isParent = !!item.children;
            return (
              <NavItem key={idx}>
                <MegaMenuWrapper
                  onClick={() => {
                    if (isParent) {
                      setHistory((prev) => [...prev, item.children]);
                    }
                  }}
                >
                  {/* {history.length > 1 ? (
                                        <Link to={item.slug} onClick={resetMenu}>
                                            {item?.name}
                                        </Link>
                                    ) : (
                                        <span>{item?.name}</span>
                                    )} */}
                  <Link to={'/' + item.slug} className="menu-nav__link" onClick={resetMenu}>
                    <span style={{ textTransform: 'capitalize' }}>{t(item.slug, { ns: 'home' })}</span>
                  </Link>

                  <IoChevronForward className="btn-direct-link" />
                </MegaMenuWrapper>

                {/* <MegaMenuContent className="list-content"></MegaMenuContent> */}

                {/* <MegaMenuContent lvlMenuToggle={lvlMenuToggle} navToggle={navToggle}>
                        <ul>
                            {item.children.map((item1, idx) => (
                                <li key={idx}>{item1.title}</li>
                            ))}
                        </ul>
                    </MegaMenuContent> */}
              </NavItem>
            );
          })}
        </ul>
        {size.width < 768 && (
          <MegaMenuContent>
            <li>
              <Link to="/user/wishlist">{t('wishlist')}</Link>
            </li>
            <li>
              <Link to="user/overview">{t('user')}</Link>
            </li>
            <li onClick={handleLogout}>{t('authentication.logout', { ns: 'common' })}</li>
          </MegaMenuContent>
        )}
      </NavigationWrapper>
    </nav>
  );
};
export default memo(forwardRef(MegaMenu));

const NavigationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: fixed;
  inset: 0 75% 0 0;
  background-color: #fff;
  color: #000;
  list-style-type: none;
  margin: 0;
  z-index: 101;
  overflow-y: auto;
  padding: var(--header-height) 0 1.5rem;
  transform: ${(props) => (props.navToggle ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    width: 100%;
  }
  ul {
    margin: 0;
    padding: 0;
  }

  ul li:first-child {
    margin-top: 0;
  }

  .btn-direct-link {
    display: none;
    cursor: pointer;
  }
`;

const NavItem = styled.li`
  font-size: 24px;
  list-style: none;
  margin: 1rem 0;
  padding: 0 var(--header-padding-x);

  @media (max-width: 768px) {
    .menu__child {
      display: none;
    }
  }
  .menu__child {
    position: absolute;
    top: 0;
    left: 100%;
    bottom: 0;
    height: 100%;
    width: 100%;
    padding: var(--header-height) 0;
    background-color: #fff;
    opacity: 0;
    visibility: hidden;
    border-left: 1px solid #ccc;
    list-style: none;
  }
  &:hover {
    .menu__child {
      opacity: 1;
      visibility: visible;
    }
  }
  &:hover {
    .btn-direct-link {
      display: block;
    }
  }
`;

const MegaMenuWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .menu-nav__link {
    text-decoration: none;
    span {
      color: #000;
      text-decoration: none;
      background-image: linear-gradient(#000 0 0);
      background-position: 0 100%; /*OR bottom left*/
      background-size: 0% 1px;
      background-repeat: no-repeat;
      transition: background-size 0.3s;
      &:hover {
        background-size: 100% 1px;
      }
    }
  }
`;

const MegaMenuContent = styled.ul`
  border-top: 1px solid var(--border-color);
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 2rem 0 !important;
  li {
    list-style: none;
    font-size: 1rem;
    margin: 0.5rem 0;
    padding: 0 var(--header-padding-x);
    a {
      text-decoration: none;
      color: #000;
    }
  }
`;

// const MegaMenuContent = styled.div`
//     position: absolute;
//     inset: 0 0 0 100%;
//     height: 100%;
//     width: 100%;
//     z-index: 99999;
//     /* opacity: ${(props) => (props.lvlMenuToggle ? '1' : '0')};
//     visibility: ${(props) => (props.lvlMenuToggle ? 'visible' : 'hidden')}; */
//     background-color: #fff;
// `;
