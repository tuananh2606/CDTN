import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/apiRequest';
import { logoutSuccess } from '../../redux/authSlice';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

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
        <section style={{ backgroundColor: '#f6f5f3', height: '600px' }}>
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
                <div>
                    <button onClick={handleLogout}>Log out</button>
                </div>
            </BoxContainer>
        </section>
    );
};

export default UserPage;
const HeadPage = styled.div`
    position: relative;
`;

const UserIndetity = styled.div`
    display: flex;
    width: 200px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -100px;
    transform: translateY(55%);
`;

const UserFrame = styled.div`
    width: 6.25rem;
    height: 6.25rem;
    border-radius: 50%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 101;
    span {
        font-size: 28px;
    }
`;
const Name = styled.span`
    margin-top: 1rem;
`;

const BoxContainer = styled.div`
    box-sizing: border-box;
    padding-left: 6.4vw;
    padding-right: 6.4vw;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    margin-top: 100px;

    @media only screen and (min-width: 768px) {
        padding-left: 3.125vw;
        padding-right: 3.125vw;
    }
    .wp-push {
        width: 100%;
        @media only screen and (min-width: 768px) {
            width: 50%;
            flex: 1;
            &:last-child {
                margin-left: 1rem;
            }
        }
        section {
            margin-bottom: 1rem;
        }
    }
`;
