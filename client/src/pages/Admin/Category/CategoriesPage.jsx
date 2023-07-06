import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '../../../redux/authSlice';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createAxios } from '../../../utils/http';
// @mui
import {
    Stack,
    Button,
    Popover,
    Checkbox,
    TableRow,
    MenuItem,
    TableCell,
    Container,
    Typography,
    IconButton,
} from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import { useNavigate } from 'react-router-dom';
import { TableComponent } from '../../../components/common';
// import Scrollbar from '../components/scrollbar';

import adminApis from '../../../apis/adminApis';
// ----------------------------------------------------------------------

const headCells = [
    { id: 'slug', numeric: false, label: 'Slug', alignRight: false },
    { id: 'name', numeric: false, label: 'Name', alignRight: false },
    { id: 'desktop_tablet', numeric: false, label: 'Desktop Tablet', alignRight: false },
    { id: 'mobiles', numeric: false, label: 'Mobile', alignRight: false },
    { id: 'images', numeric: false, label: 'Images', alignRight: false },
];

export default function CategoriesPage() {
    const [open, setOpen] = useState(null);
    const [idCate, setIdCate] = useState();
    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filteredCategories, setFilteredCategories] = useState();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login.currentUser);

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const queryClient = useQueryClient();
    const deleteCateMutation = useMutation({
        mutationFn: (cate) => adminApis.deleteCategory(axiosJWT, user?.accessToken, cate.id, cate.name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['categories'],
        queryFn: () => adminApis.getAllCategories(axiosJWT, user?.accessToken),
        keepPreviousData: true,
    });

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>Error: {error.message}</span>;
    }

    const handleOpenMenu = (event, id, name) => {
        setOpen(event.currentTarget);
        setIdCate({ id: id, name: name });
    };
    const handleCloseMenu = () => {
        setOpen(null);
    };

    const handleClick = (event, _id) => {
        const selectedIndex = selected.indexOf(_id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, _id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleEdit = () => {
        navigate('/admin/categories/edit', { state: idCate.id });
    };

    const handleDelete = () => {
        deleteCateMutation.mutate(idCate);
        setOpen(false);
        // setSelected([]);
    };

    return (
        <>
            <Helmet>
                <title> Category </title>
            </Helmet>
            <Container>
                <>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom>
                            Category
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<Iconify icon="eva:plus-fill" />}
                            onClick={() => navigate('/admin/categories/create')}
                        >
                            Create new category
                        </Button>
                    </Stack>
                    <TableComponent
                        headCells={headCells}
                        data={data}
                        isLoading={isLoading}
                        setFilteredData={setFilteredCategories}
                        selected={selected}
                        setSelected={setSelected}
                        page={page}
                        setPage={setPage}
                        rowsPerPage={rowsPerPage}
                        setRowsPerPage={setRowsPerPage}
                    >
                        {filteredCategories &&
                            filteredCategories.length > 0 &&
                            filteredCategories
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    const { _id, slug, name, videos, images } = row;
                                    const selectedUser = selected.indexOf(_id) !== -1;

                                    return (
                                        <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={selectedUser}
                                                    onChange={(event) => handleClick(event, _id)}
                                                />
                                            </TableCell>

                                            <TableCell>
                                                <Typography variant="subtitle2" noWrap>
                                                    {slug}
                                                </Typography>
                                            </TableCell>

                                            <TableCell align="left">{name}</TableCell>

                                            <TableCell align="left">
                                                {videos?.desktop_tablet.map((item) => item.url)}
                                            </TableCell>

                                            <TableCell align="left">{videos?.mobile.map((item) => item.url)}</TableCell>

                                            <TableCell align="left">
                                                {images?.map((item) => item.url).join(', ')}
                                            </TableCell>

                                            <TableCell align="right">
                                                <IconButton
                                                    size="large"
                                                    color="inherit"
                                                    onClick={(e) => handleOpenMenu(e, _id, name)}
                                                >
                                                    <Iconify icon={'eva:more-vertical-fill'} />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                    </TableComponent>
                </>
            </Container>
            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 140,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <MenuItem onClick={handleEdit}>
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                    Edit
                </MenuItem>

                <MenuItem sx={{ color: 'error.main' }} onClick={handleDelete}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
        </>
    );
}
