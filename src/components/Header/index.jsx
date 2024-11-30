import { FaReact } from "react-icons/fa";
import { VscSearchFuzzy } from "react-icons/vsc";
import { Avatar, Badge, Divider, Dropdown, Popover, Space } from "antd";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

import "./header.scss"
import { DownOutlined } from "@ant-design/icons";

const Header = () => {
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
            label: <label style={{ cursor: "pointer" }}>Đăng xuất</label>,
            key: 'logout',
        },

    ];

    // if (user?.role === 'ADMIN') {
    //     items.unshift({
    //         label: <Link to='/admin'>Trang quản trị</Link>,
    //         key: 'admin',
    //     })
    // }

    const handleHomePage = () => {
        navigate("/")
    }

    const text = <span>Title</span>;

    let contentPopover = () => {
        return (
            <>
                <div className='pop-cart-body'>
                    <div className='pop-cart-content'>
                        {/* {carts?.map((book, index) => {
                            return (
                                <>
                                    <div className='book' key={`book-${index}`}>
                                        <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${book?.detail?.thumbnail}`} />
                                        <div>{book?.detail?.mainText}</div>
                                        <div className='price'>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book?.detail?.price ?? 0)}
                                        </div>
                                    </div>
                                </>
                            )
                        })} */}
                    </div>
                    {/* {Array.isArray(carts) && carts.length > 0 ? <div className='pop-cart-footer'>
                        <button onClick={() => navigate('/order')}>Xem giỏ hàng</button>
                    </div>
                        :
                        <Empty
                            description="Không có sản phẩm trong giỏ hàng"
                        />
                    } */}
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
                            // setOpenDrawer(true)
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
                                        // count={carts?.length ?? 0}
                                        size={"small"}
                                        showZero
                                    >
                                        <FiShoppingCart className='icon-cart' />
                                    </Badge>
                                </Popover>
                            </li>
                            <li className="navigation__item mobile"><Divider type='vertical' /></li>
                            <li className="navigation__item mobile">
                                {/* {!isAuthenticated ?
                                    <span onClick={() => navigate('/login')}> Tài Khoản</span>
                                    :
                                    <Dropdown menu={{ items: items }} trigger={['click']}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Avatar src={urlAvatar} />

                                            <Space>
                                                Welcome {user?.fullName}
                                                <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                } */}
                                <Dropdown menu={{ items: items }} trigger={['click']}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        {/* <Avatar src={urlAvatar} /> */}

                                        <Space>
                                            Welcome
                                            <DownOutlined />
                                        </Space>
                                    </a>
                                </Dropdown>
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
            {/* <ManageAccount
                isModalOpen={isInfor}
                setIsModalOpen={setIsInfor}
            /> */}
        </>
    );
}

export default Header;