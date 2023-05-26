import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Toolbar, Typography, Tooltip, IconButton, OutlinedInput, InputAdornment } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
// import styled from 'styled-components';

import Iconify from '../../../components/iconify/Iconify';

const EnhancedTableToolbar = (props) => {
    const { numSelected, filterName, onFilterName } = props;
    return (
        <StyledToolbar
            sx={{
                ...(numSelected > 0 && {
                    color: 'primary.main',
                    bgcolor: 'primary.lighter',
                    // bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.primary.lighter),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography component="div" variant="subtitle1">
                    {numSelected} selected
                </Typography>
            ) : (
                <StyledSearch
                    value={filterName}
                    onChange={onFilterName}
                    placeholder="Search user..."
                    startAdornment={
                        <InputAdornment position="start">
                            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                        </InputAdornment>
                    }
                />
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </StyledToolbar>
    );
};

export default EnhancedTableToolbar;

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const StyledToolbar = styled(Toolbar)`
    height: 96px;
    display: flex;
    justify-content: space-between;
    padding: 0 1rem 0 3rem;
`;

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    transition: theme.transitions.create(['box-shadow', 'width'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
    }),
    '&.Mui-focused': {
        width: 320,
        boxShadow: theme.customShadows.z8,
    },
    '& fieldset': {
        borderWidth: `1px !important`,
        borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
    },
}));
