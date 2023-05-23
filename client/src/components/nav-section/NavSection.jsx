import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
// @mui
import { Box, List, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';

// ----------------------------------------------------------------------

NavSection.propTypes = {
    data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
    return (
        <Box {...other}>
            <List disablePadding sx={{ p: 1 }}>
                {data.map((item) => (
                    <NavItem key={item.title} item={item} />
                ))}
            </List>
        </Box>
    );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
    item: PropTypes.object,
};

function NavItem({ item }) {
    const { title, path, icon, info } = item;

    return (
        <StyledNavItem component={RouterLink} to={path}>
            <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

            <ListItemText disableTypography primary={title} />

            {info && info}
        </StyledNavItem>
    );
}

const StyledNavItem = styled(ListItemButton)`
    height: 48px;
    position: relative;
    text-transform: capitalize;
    color: #ccc;
    border-radius: 12px;
    &:active {
        color: #212b36;
        background-color: rgba(145, 158, 171, 0.16);
        font-weight: 700;
    }
`;
const StyledNavItemIcon = styled(ListItemIcon)`
    width: 22px;
    height: 22px;
    color: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
`;
