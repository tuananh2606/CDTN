import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createAxios } from '../../utils/http';
// @mui
import {
    Table,
    Card,
    Stack,
    Paper,
    Avatar,
    Button,
    Popover,
    Checkbox,
    TableRow,
    MenuItem,
    TableBody,
    TableCell,
    Container,
    Typography,
    IconButton,
    TableContainer,
    TablePagination,
} from '@mui/material';
// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import { useNavigate } from 'react-router-dom';
// import Scrollbar from '../components/scrollbar';

import adminApis from '../../apis/adminApis';
import CreateCategoryPage from './Category/CreateCategoryPage';
import { EnhancedTableHead, EnhancedTableToolbar } from '../../sections/@dashboard/user';
// ----------------------------------------------------------------------

const headCells = [
    { id: 'slug', numeric: false, label: 'Slug', alignRight: false },
    { id: 'name', numeric: false, label: 'Name', alignRight: false },
    { id: 'desktop_tablet', numeric: false, label: 'Desktop Tablet', alignRight: false },
    { id: 'mobiles', numeric: false, label: 'Mobile', alignRight: false },
    { id: 'images', numeric: false, label: 'Images', alignRight: false },
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    if (array !== undefined) {
        const stabilizedThis = array?.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        if (query) {
            return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
        }
        return stabilizedThis.map((el) => el[0]);
    }
}

export default function CategoriesPage() {
    const [open, setOpen] = useState(null);
    const [createPapeShow, setCreatePapeShow] = useState(false);
    const [idCate, setIdCate] = useState();
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

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
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = data.map((n) => n._id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
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
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };
    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const handleEdit = () => {
        navigate('/admin/categories/edit', { state: idCate.id });
    };

    const handleDelete = () => {
        deleteCateMutation.mutate(idCate);
        setOpen(false);
        // setSelected([]);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
    const filteredUsers = applySortFilter(data, getComparator(order, orderBy), filterName);
    const isNotFound = !filteredUsers.length && !!filterName;

    return (
        <>
            <Helmet>
                <title> Category | Minimal UI </title>
            </Helmet>
            <Container>
                {!createPapeShow ? (
                    <>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                            <Typography variant="h4" gutterBottom>
                                Category
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<Iconify icon="eva:plus-fill" />}
                                onClick={() => setCreatePapeShow(true)}
                            >
                                Create new category
                            </Button>
                        </Stack>
                        <Card>
                            <EnhancedTableToolbar
                                numSelected={selected.length}
                                filterName={filterName}
                                onFilterName={handleFilterByName}
                            />

                            {/* <Scrollbar> */}
                            {!isLoading ? (
                                <TableContainer sx={{ minWidth: 800 }}>
                                    <Table>
                                        <EnhancedTableHead
                                            order={order}
                                            orderBy={orderBy}
                                            headCells={headCells}
                                            rowCount={data.length}
                                            numSelected={selected.length}
                                            onRequestSort={handleRequestSort}
                                            onSelectAllClick={handleSelectAllClick}
                                        />
                                        <TableBody>
                                            {filteredUsers
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row) => {
                                                    const { _id, name, slug, videos, images } = row;
                                                    const selectedUser = selected.indexOf(_id) !== -1;

                                                    return (
                                                        <TableRow
                                                            hover
                                                            key={_id}
                                                            tabIndex={-1}
                                                            role="checkbox"
                                                            selected={selectedUser}
                                                        >
                                                            <TableCell padding="checkbox">
                                                                <Checkbox
                                                                    checked={selectedUser}
                                                                    onChange={(event) => handleClick(event, _id)}
                                                                />
                                                            </TableCell>

                                                            <TableCell component="th" scope="row" padding="none">
                                                                <Stack direction="row" alignItems="center" spacing={2}>
                                                                    {/* <Avatar alt={name} src={avatarUrl} /> */}
                                                                    <Typography variant="subtitle2" noWrap>
                                                                        {slug}
                                                                    </Typography>
                                                                </Stack>
                                                            </TableCell>

                                                            <TableCell align="left">{name}</TableCell>

                                                            <TableCell align="left">
                                                                {videos?.desktop_tablet.map((item) => item.url)}
                                                            </TableCell>

                                                            <TableCell align="left">
                                                                {videos?.mobile.map((item) => item.url)}
                                                            </TableCell>

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
                                            {emptyRows > 0 && (
                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                    <TableCell colSpan={6} />
                                                </TableRow>
                                            )}
                                        </TableBody>

                                        {isNotFound && (
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                        <Paper
                                                            sx={{
                                                                textAlign: 'center',
                                                            }}
                                                        >
                                                            <Typography variant="h6" paragraph>
                                                                Not found
                                                            </Typography>

                                                            <Typography variant="body2">
                                                                No results found for &nbsp;
                                                                <strong>&quot;{filterName}&quot;</strong>.
                                                                <br /> Try checking for typos or using complete words.
                                                            </Typography>
                                                        </Paper>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        )}
                                    </Table>
                                </TableContainer>
                            ) : (
                                <span>Loading....</span>
                            )}
                            {/* </Scrollbar> */}

                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Card>
                    </>
                ) : (
                    <CreateCategoryPage setCreatePapeShow={setCreatePapeShow} />
                )}
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
