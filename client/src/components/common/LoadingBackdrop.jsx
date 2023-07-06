import { CircularProgress, Backdrop } from '@mui/material/';
const LoadingBackdrop = ({ open }) => {
    return (
        <div>
            <Backdrop sx={{ color: '#fff', zIndex: 999 }} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};

export default LoadingBackdrop;
