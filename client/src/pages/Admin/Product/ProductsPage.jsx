import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
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
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
// import Scrollbar from '../components/scrollbar';
import { TableComponent } from '../../../components/common';
import adminApis from '../../../apis/adminApis';
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

export default function ProductsPage() {
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deletedProduct, setDeletedProduct] = useState();
  const [filteredProducts, setFilteredProducts] = useState();
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const deleteProductMutation = useMutation({
    mutationFn: (product) =>
      adminApis.deleteProduct(axiosJWT, user.accessToken, product.id, product.category, product.name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['products', page, rowsPerPage],
    queryFn: () => adminApis.getAllProducts(axiosJWT, user?.accessToken, page, rowsPerPage),
    enabled: !!page || !!rowsPerPage,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const handleOpenMenu = (event, id, category, name) => {
    setOpen(event.currentTarget);
    setDeletedProduct({ id: id, name: name, category: category });
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
    deleteProductMutation.mutate(deletedProduct);
    setOpen(false);
    setSelected([]);
  };

  const handleEdit = () => {
    navigate('/admin/products/edit', { state: { id: deletedProduct.id } });
  };

  return (
    <>
      <Helmet>
        <title> Product </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Product
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => navigate('/admin/products/create')}
          >
            New Product
          </Button>
        </Stack>
        <TableComponent
          headCells={headCells}
          data={data}
          isLoading={isLoading}
          setFilteredData={setFilteredProducts}
          selected={selected}
          setSelected={setSelected}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        >
          {filteredProducts &&
            filteredProducts.length > 0 &&
            filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              const { _id, code, name, description, images, price, category, stock } = row;
              const selectedUser = selected.indexOf(_id) !== -1;

              return (
                <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                  <TableCell padding="checkbox">
                    <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, _id)} />
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
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      maxWidth: '200px',
                      overflow: 'hidden',
                    }}
                  >
                    {description}
                  </TableCell>

                  <TableCell
                    align="left"
                    sx={{
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      maxWidth: '200px',
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
                    <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(e, _id, category, name)}>
                      <Iconify icon={'eva:more-vertical-fill'} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableComponent>
        {/* </Scrollbar> */}
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
