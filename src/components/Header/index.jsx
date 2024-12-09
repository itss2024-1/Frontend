import { FaReact } from "react-icons/fa";
import { VscSearchFuzzy } from "react-icons/vsc";
import { Avatar, Badge, Divider, Dropdown, Popover, Space } from "antd";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useState } from "react";

import { callLogout } from "../../services/api";
import ManageAccount from "../Account/ManageAccount";
import "./header.scss"


const Header = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const user = useSelector(state => state.account.user);
    const [isInfor, setIsInfor] = useState(false);

    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}storage/avatar/${user?.avatar}`;


    const handleLogout = async () => {
        const res = await callLogout();
    }

    const items = [
        {
            label: <Link to="/admin">Trang quản trị</Link>,
            key: 'admin',
        },
        {
            label: <label onClick={() => { setIsInfor(true) }}>Quản lý tài khoản</label>,
            key: 'account',
        },
        {
            label: <Link to="/history">Lịch sử mua hàng</Link>,
            key: 'history',
        },
        {
            label: <label onClick={handleLogout} style={{ cursor: "pointer" }}>Đăng xuất</label>,
            key: 'logout',
        },

    ];

    const handleHomePage = () => {
        navigate("/")
    }

    let contentPopover = () => {
        return (
            <>
                <div className='pop-cart-body'>
                    <div className='pop-cart-content'>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="header-container">
                <header className="page-header">
                    <div className="page-header__top">
                        <div className="page-header__toggle" onClick={() => {
                        }}>☰</div>
                        <div className='page-header__logo'>
                            <span className='logo' onClick={() => { handleHomePage() }}>
                                <FaReact className='rotate icon-react' /> ITSS
                                <VscSearchFuzzy className='icon-search' />
                            </span>
                            <input
                                className="input-search" type={'text'}
                                placeholder="Bạn tìm gì hôm nay"
                            />
                        </div>
                    </div>
                    <nav className="page-header__bottom">
                        <ul id="navigation" className="navigation">
                            <li className="navigation__item">
                                <Popover placement="bottomRight" title={"Sản phẩm mới thêm"} content={contentPopover}>
                                    <Badge
                                        size={"small"}
                                        showZero
                                    >
                                        <FiShoppingCart className='icon-cart' />
                                    </Badge>
                                </Popover>
                            </li>
                            <li className="navigation__item mobile"><Divider type='vertical' /></li>
                            <li className="navigation__item mobile">
                                {!isAuthenticated ?
                                    <span onClick={() => navigate('/login')}> Tài Khoản</span>
                                    :
                                    <Dropdown menu={{ items: items }} trigger={['click']}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Avatar src={urlAvatar} />

                                            <Space>
                                                Welcome {user?.name}
                                                <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                }
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
            <ManageAccount
                isModalOpen={isInfor}
                setIsModalOpen={setIsInfor}
            />
        </>
    );
}

export default Header;