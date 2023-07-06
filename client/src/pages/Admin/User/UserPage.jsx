import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '../../../redux/authSlice';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createAxios } from '../../../utils/http';
import { useNavigate } from 'react-router-dom';
// @mui
import {
    Stack,
    Avatar,
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
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
// import Scrollbar from '../components/scrollbar';
// sections
import { TableComponent } from '../../../components/common';

import adminApis from '../../../apis/adminApis';
import EditForm from '../../../components/forms/admin/EditForm';
import DialogComponent from '../../../components/common/Dialog';
// ----------------------------------------------------------------------

const headCells = [
    { id: 'name', numeric: false, label: 'Name', alignRight: false },
    { id: 'email', numeric: false, label: 'Email', alignRight: false },
    { id: 'role', numeric: false, label: 'Role', alignRight: false },
    { id: 'isVerified', numeric: false, label: 'Verified', alignRight: false },
    { id: 'status', numeric: false, label: 'Status', alignRight: false },
    { id: '' },
];

export default function UserPage() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [dialog, setDialog] = useState(false);
    const [_idUser, setIdUser] = useState();
    const [filteredUsers, setFilteredUsers] = useState();

    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    // const queryString = useQueryString();

    const deleteUserMutation = useMutation({
        mutationFn: (id) => adminApis.deleteUser(axiosJWT, user?.accessToken, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['users'],
        queryFn: () => adminApis.getAllUsers(axiosJWT, user?.accessToken),
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

    const handleDelete = () => {
        deleteUserMutation.mutate(_idUser);
        setOpen(false);
        setSelected([]);
    };

    const handleEdit = () => {
        navigate('/admin/users/edit', { state: { id: _idUser } });
    };

    return (
        <>
            <Helmet>
                <title> User </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        User
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<Iconify icon="eva:plus-fill" />}
                        onClick={() => navigate('/admin/users/create')}
                    >
                        New User
                    </Button>
                </Stack>

                <TableComponent
                    headCells={headCells}
                    data={data}
                    isLoading={isLoading}
                    setFilteredData={setFilteredUsers}
                    selected={selected}
                    setSelected={setSelected}
                    page={page}
                    setPage={setPage}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                >
                    {filteredUsers &&
                        filteredUsers.length > 0 &&
                        filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            const { _id, name, firstName, lastName, status, email, avatarUrl, verified, admin } = row;
                            const selectedUser = selected.indexOf(_id) !== -1;

                            return (
                                <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={selectedUser}>
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
                                                {`${firstName} ${lastName}`}
                                            </Typography>
                                        </Stack>
                                    </TableCell>

                                    <TableCell align="left">{email}</TableCell>

                                    <TableCell align="left">{admin ? 'Admin' : 'No'}</TableCell>

                                    <TableCell align="left">{verified}</TableCell>

                                    <TableCell align="left">
                                        <Label color={(status === 'banned' && 'error') || 'success'}>
                                            {sentenceCase('test')}
                                        </Label>
                                    </TableCell>

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
                            );
                        })}
                </TableComponent>

                {dialog && (
                    <DialogComponent
                        open={dialog}
                        form={<EditForm />}
                        onClose={handleEditClose}
                        id={_idUser}
                        userCheck
                    />
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
