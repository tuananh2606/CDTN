import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createAxios } from '../../utils/http';
import axios from 'axios';
// @mui
import {
    Card,
    Table,
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
// import Scrollbar from '../components/scrollbar';
import CreateProductPage from './Product/CreateProductPage';
import { EnhancedTableHead, EnhancedTableToolbar } from '../../sections/@dashboard/user';
import adminApis from '../../apis/adminApis';
// ----------------------------------------------------------------------

const headCells = [
    { id: 'code', numeric: false, label: 'Code', alignRight: false },
    { id: 'name', numeric: false, label: 'Name', alignRight: false },
    { id: 'description', numeric: false, label: 'Description', alignRight: false },
    { id: 'images', numeric: false, label: 'Images', alignRight: false },
    // { id: 'variation', numeric: false, label: 'Variation', alignRight: false },
    { id: 'category', numeric: false, label: 'Category', alignRight: false },
    { id: 'price', numeric: false, label: 'Price', alignRight: false },
    { id: 'stock', numeric: false, label: 'Stock', alignRight: false },
    { id: '' },
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
    const stabilizedThis = array.map((el, index) => [el, index]);
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

export default function UserPage() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const deleteProductMutation = useMutation({
        mutationFn: (product) =>
            adminApis.deleteProduct(axiosJWT, user?.accessToken, product.id, product.category, product.name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });

    const [open, setOpen] = useState(null);
    const [createPageShow, setCreatePageShow] = useState(false);
    const [deletedProduct, SetDeletedProduct] = useState({});
    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['products'],
        queryFn: () => adminApis.getAllProducts(axiosJWT, user?.accessToken),
    });

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>Error: {error.message}</span>;
    }

    console.log(data);

    const handleOpenMenu = (event, id, category, name) => {
        setOpen(event.currentTarget);
        SetDeletedProduct({ id: id, name: name, category: category });
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const filteredUsers = applySortFilter(data, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredUsers.length && !!filterName;

    const handleDelete = () => {
        deleteProductMutation.mutate(deletedProduct);
        setOpen(false);
        setSelected([]);
    };

    const handleEdit = () => {
        navigate('/admin/products/edit', { state: deletedProduct.id });
    };

    return (
        <>
            <Helmet>
                <title> Product | Minimal UI </title>
            </Helmet>

            <Container>
                {!createPageShow ? (
                    <>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                            <Typography variant="h4" gutterBottom>
                                Product
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<Iconify icon="eva:plus-fill" />}
                                onClick={() => setCreatePageShow(true)}
                            >
                                New Product
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
                                    <Table sx={{ tableLayout: 'auto' }}>
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
                                                    const {
                                                        _id,
                                                        code,
                                                        name,
                                                        description,
                                                        images,
                                                        price,
                                                        category,
                                                        stock,
                                                    } = row;
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
                                                            <TableCell align="left">{code}</TableCell>
                                                            <TableCell component="th" scope="row" padding="none">
                                                                <Stack direction="row" alignItems="center" spacing={2}>
                                                                    <Typography variant="subtitle2" noWrap>
                                                                        {name}
                                                                    </Typography>
                                                                </Stack>
                                                            </TableCell>

                                                            <TableCell
                                                                align="left"
                                                                sx={{
                                                                    textOverflow: 'ellipsis',
                                                                    width: '200px',
                                                                    overflow: 'hidden',
                                                                }}
                                                            >
                                                                {description}
                                                            </TableCell>

                                                            <TableCell
                                                                align="left"
                                                                sx={{
                                                                    display: 'block',
                                                                    textOverflow: 'ellipsis',
                                                                    width: '200px',
                                                                    overflow: 'hidden',
                                                                }}
                                                            >
                                                                {images?.map((item) => item.url).join(', ')}
                                                            </TableCell>
                                                            {/* <TableCell align="left"></TableCell> */}
                                                            <TableCell align="left">{category}</TableCell>

                                                            <TableCell align="left">{price}</TableCell>

                                                            <TableCell align="left">{stock}</TableCell>

                                                            <TableCell align="right">
                                                                <IconButton
                                                                    size="large"
                                                                    color="inherit"
                                                                    onClick={(e) =>
                                                                        handleOpenMenu(e, _id, category, name)
                                                                    }
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
                    <CreateProductPage setCreatePageShow={setCreatePageShow} />
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

                <MenuItem sx={{ color: 'error.main' }} onClick={() => handleDelete(selected[0])}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
        </>
    );
}
