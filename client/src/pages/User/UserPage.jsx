import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/apiRequest';
import { logoutSuccess } from '../../redux/authSlice';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

import { HeadPage, UserIndetity, UserFrame, Name, BoxContainer } from './UserPageStyles';
import { createAxios } from '../../utils/http';
import Box from '../../components/common/Box';

const UserPage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, logoutSuccess);
    console.log(user);

    const handleLogout = () => {
        logoutUser(dispatch, user?.accessToken, navigate, axiosJWT);
        googleLogout();
    };

    return (
        <section style={{ backgroundColor: '#f6f5f3', height: '100%' }}>
            <HeadPage>
                <img
                    src="https://secure.louisvuitton.com/images/is/image/lv/1/LV/louis-vuitton--my_lv_welcome_page_desktop.jpg"
                    alt="Anh nen"
                />
                <UserIndetity>
                    <UserFrame>
                        <span>T.N</span>
                    </UserFrame>
                    {/* <Name>{user.name}</Name> */}
                </UserIndetity>
            </HeadPage>
            <BoxContainer>
                <div className="wp-push">
                    <Box title="My Account">
                        <strong>Email: </strong>
                        <span>bjjitabb@gmail.com</span>
                    </Box>
                </div>
                <div className="wp-push">
                    <Box title="My Orders" className="text-center">
                        <span>There are no current orders</span>
                    </Box>
                    <Box title="My Wishlist" className="text-center">
                        <span>Your wishlist is empty</span>
                    </Box>
                </div>
            </BoxContainer>
            <div>
                <button onClick={handleLogout}>Log out</button>
            </div>
        </section>
    );
};

export default UserPage;
