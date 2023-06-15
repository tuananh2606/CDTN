import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import { loginSuccess } from '../../redux/authSlice';
import { createAxios } from '../../utils/http';
import Label from '../label';
import Iconify from '../iconify';
// import Scrollbar from '../components/scrollbar';
// sections
import { EnhancedTableHead, EnhancedTableToolbar } from '../../sections/@dashboard/user';

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

const TableComponent = (props) => {
    const { request, queryKey, headCells } = props;

    const queryClient = useQueryClient();
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(null);
    const [dialog, setDialog] = useState(false);
    const [_idUser, setIdUser] = useState();
    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    // const queryString = useQueryString();
    // const pageQuery = Number(queryString.page) || 0;
    const { isLoading, isError, data, error } = useQuery({
        queryKey: [`${queryKey}`],
        queryFn: () => request(axiosJWT, user?.accessToken),
        keepPreviousData: true,
        // initialData: () => users,
    });
    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>Error: {error.message}</span>;
    }

    const handleOpenMenu = (event, _id) => {
        setOpen(event.currentTarget);
        setIdUser(_id);
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

    const filteredUsers = applySortFilter(data?.categories, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredUsers.length && !!filterName;

    // const deleteUserMutation = useMutation({
    //     mutationFn: (id) => adminApi.deleteUser(axiosJWT, user?.accessToken, id),
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: ['users'] });
    //     },
    // });

    const handleDelete = () => {
        deleteUserMutation.mutate(_idUser);
        setOpen(false);
        setSelected([]);
    };

    const handleEditOpen = () => {
        setDialog(true);
    };

    const handleEditClose = () => {
        setDialog(false);
    };

    return (
        <>
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
                                        const {
                                            _id,
                                            name,
                                            slug,
                                            role,
                                            status,
                                            videos,
                                            images,
                                            email,
                                            avatarUrl,
                                            verified,
                                            admin,
                                        } = row;
                                        const selectedUser = selected.indexOf(_id) !== -1;

                                        return (
                                            <>
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
                                                            <Avatar alt={name} src={avatarUrl} />
                                                            <Typography variant="subtitle2" noWrap>
                                                                {slug}
                                                            </Typography>
                                                        </Stack>
                                                    </TableCell>

                                                    <TableCell align="left">{name}</TableCell>
                                                    {admin && (
                                                        <TableCell align="left">{admin ? 'Admin' : 'No'}</TableCell>
                                                    )}
                                                    {videos && (
                                                        <TableCell align="left">
                                                            {videos.desktop_tablet.map((item) => item.url).join(', ')}
                                                        </TableCell>
                                                    )}
                                                    {videos && (
                                                        <TableCell align="left">
                                                            {videos.mobile.map((item) => item.url)}
                                                        </TableCell>
                                                    )}
                                                    {images && (
                                                        <TableCell align="left">
                                                            {images.map((item) => item.url).join(', ')}
                                                        </TableCell>
                                                    )}
                                                    {verified && (
                                                        <TableCell align="left">{verified ? 'Yes' : 'No'}</TableCell>
                                                    )}
                                                    {status && (
                                                        <TableCell align="left">
                                                            <Label
                                                                color={(status === 'banned' && 'error') || 'success'}
                                                            >
                                                                {sentenceCase('test')}
                                                            </Label>
                                                        </TableCell>
                                                    )}

                                                    <TableCell align="right">
                                                        <IconButton
                                                            size="large"
                                                            color="inherit"
                                                            onClick={(e) => handleOpenMenu(e, _id)}
                                                        >
                                                            <Iconify icon={'eva:more-vertical-fill'} />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            </>
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
            {dialog && <DialogComponent open={dialog} onClose={handleEditClose} id={_idUser} />}
        </>
    );
};

export default TableComponent;