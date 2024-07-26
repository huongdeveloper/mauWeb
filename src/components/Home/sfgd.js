import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from '../../assets/channels4_profile.jpg'
import { IoMdHome } from "react-icons/io";
import { GrAnnounce } from "react-icons/gr";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaSearchLocation } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import './Header.scss'
import { Dropdown, Space, Avatar } from "antd";
import { useEffect, useState } from 'react';
import ModalNotification from '../Auth/ModalNotification';
import { useDispatch, useSelector } from 'react-redux';
import { doLogoutAction } from '../../redux/account/accountSlice';
import { callLogout, logoutUser, searchQueryAPI } from '../../services/api';
import { message, notification } from 'antd';
const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const user = useSelector(state => state.account.Users);
    const datauser = useSelector(state => state.account.dataUser);
    console.log("datauser: ", datauser);
    const [isShowModalLogin, setIsShowModalLogin] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [menuVisible, setMenuVisible] = useState(false);
    const [showCodeOne, setShowCodeOne] = useState(false);
    let items = [
        {

            label: <Link to='/userprofile'>Trang profile</Link>,
            key: 'userprofile',
        },

        {

            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => handleLogOut()}
            >
                Đăng xuất
            </label>,
            key: 'logout',
        },
    ];
    if (datauser?.role === true) {
        items.unshift({
            label: <Link to='/admin'>Trang quản trị</Link>,
            key: 'admin',

        })
    }







    const handleClose = () => {
        setIsShowModalLogin(false);
    }

    function getCookie(cookieName) {
        const cookies = document.cookie.split('; ');
        for (const cookie of cookies) {
            const [name, value] = cookie.split('=');
            if (name === cookieName) {
                return value;
            }
        }
        return null;
    }

    const handleLogOut = async () => {

        // const token = localStorage.getItem('access_token');
        // if (!token) {
        //     notification.error({
        //         message: 'Lỗi xác thực',
        //         description: 'Không tìm thấy token. Vui lòng đăng nhập lại.'
        //     });
        //     return;
        // }
        const res = await callLogout();
        res.headers = {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
        if (res) {
            // res.headers= {
            //     'Authorization': `Bearer ${token}`
            // }
            // console.log("refresh_token logout",localStorage.getItem('refresh_token'))
            // console.log("access_token logout",localStorage.getItem('access_token'))
            console.log("res.headers", res.headers)
            dispatch(doLogoutAction());
            navigate('/');
            message.success('Đăng xuất thành công!');
            // localStorage.removeItem('access_token');
            // localStorage.removeItem('refresh_token');
        } else {
            notification.error({
                message: 'Có lỗi xáy ra',
                description:
                    res.message && Array.isArray(res.message) ? res.message[0] : res.message[1],
                duration: 5
            })
        }

    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        if (searchQuery.trim() !== '') {
            try {
                const response = await searchQueryAPI(searchQuery);
                console.log('Search results:', response.data);

            } catch (error) {
                console.error('Search error:', error);
            }
            setSearchQuery('');
        }
    };
    const handleShowMenu = () => {
        setMenuVisible(true);
    };

    const handleHideMenu = () => {
        setMenuVisible(false);
    };
    const handleNavLinkClick = () => {
        setShowCodeOne(true);
    };
    return (
        <>
            <Navbar bg="#262D34" className='header-container' expand="lg">
                <Container >
                    <Navbar.Collapse id="basic-navbar-nav list-item">
                        <Nav className="list-item-icon one">
                            {/* ======== YÊU CẦU Trong đoạn code này: */}
                            <div className='Mobi-nav'>
                                {/* ====== Xuất hiện ở đây (*@) Nghĩa là đoạn code NavLink này thay đổi trong 4 NavLink ở dưới đấy */}
                                {showCodeOne && (
                                    <NavLink to="/" className='nav-link'>
                                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        </svg>
                                    </NavLink>
                                )}
                                {/* == kết == */}
                                <svg onClick={handleShowMenu} width="9" height="29" viewBox="0 0 15 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                </svg>

                            </div>
                            <div className={`Mobi-nav-link ${menuVisible ? 'show' : 'hide'}`}>
                                {/* khi tôi ấn 1 trong NavLink thì đoạn code này sẽ hiện lên ở đây (*@) */}
                                <NavLink to="/" className='nav-link' onClick={handleNavLinkClick}>
                                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    </svg>
                                </NavLink>
                                <NavLink to="/auction" className='nav-link' onClick={handleNavLinkClick}>
                                    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <clipPath id="clip0_4194_13561">
                                                <rect width="22" height="22" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </NavLink>
                                <NavLink to="/news" className='nav-link' onClick={handleNavLinkClick}>
                                    <svg width="20" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    </svg>
                                </NavLink>
                                <NavLink to="/search" className='nav-link' onClick={handleNavLinkClick}>
                                    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">

                                        <defs>
                                            <clipPath id="clip0_4194_13573">
                                                <rect width="22" height="22" fill="white" />
                                            </clipPath>
                                            <clipPath id="clip1_4194_13573">
                                                <rect width="9.05882" height="9.625" fill="white" transform="translate(5.17641 4.8125)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </NavLink>
                                <div className='Mobi-nav-svg'>
                                    <svg onClick={handleHideMenu} width="9" height="29" viewBox="0 0 15 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    </svg>
                                </div>
                            </div>
                            {/* ========= End ====== */}
                            <div className='header-bell two'>
                                <div className='header-notification'>
                                    <IoIosNotifications size={24} />
                                </div>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;