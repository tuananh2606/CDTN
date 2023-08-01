import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const NavItem = ({ to, title }) => {
  const resolvedPath = useResolvedPath(to);
  const { t } = useTranslation('profile');
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <StyledNavItem className={isActive ? 'active' : ''}>
      <NavLink to={to}>{t(title)}</NavLink>
    </StyledNavItem>
  );
};

export default NavItem;

const StyledNavItem = styled.li`
  height: 100%;
  padding: 1rem 1.5rem;
  border-left: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  a {
    text-decoration: none;
    color: #000;
  }
  &.active {
    color: #000;
    box-shadow: inset 0 -5px 0 0 #19110b;
  }
  &:hover:not(.active) {
    color: #000;
    box-shadow: inset 0 -1px 0 0 #19110b;
  }
`;
