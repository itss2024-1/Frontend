import { FaReact } from "react-icons/fa";
import { VscSearchFuzzy } from "react-icons/vsc";
import { Avatar, Badge, Divider, Dropdown, Empty, message, Popover, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";

import { callFetchResume, callFetchSchedule, callFetchScheduleByInviteeId, callLogout } from "../../services/api";
import ManageAccount from "../Account/ManageAccount";
import "./header.scss"
import { doLogoutAction } from "../../redux/slice/accountSlide";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const user = useSelector(state => state.account.user);
    const [isInfor, setIsInfor] = useState(false);

    const [schedules, setSchedules] = useState([]);
    const [scheduleInvitees, setScheduleInvitees] = useState([]);

    const fetchSchedules = async () => {
        const res = await callFetchSchedule(0, 3, 'createdAt,desc');
        if (res.status === 200) {
            setSchedules(res.data.data.result);
        }
    }

    const fetchSchedulesInvitee = async () => {
        const res = await callFetchScheduleByInviteeId(0, 3, user.id);
        if (res.status === 200) {
            setScheduleInvitees(res.data.data.result);
        }
    }


    useEffect(() => {
        fetchSchedules();
        fetchSchedulesInvitee();
    }, [])

    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}storage/avatar/${user?.avatar}`;

    const handleLogout = async () => {
        try {
            localStorage.removeItem('access_token');
            dispatch(doLogoutAction());
            navigate('/');
            message.success('Đăng xuất thành công');
        } catch (error) {
            message.error('Có lỗi xảy ra khi đăng xuất');
        }
    };

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
            label: <Link to="/resume">Hồ sơ cá nhân</Link>,
            key: 'resume',
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

    const handleSearch = async (value) => {
        setSearchTerm(value);
        if (value.length >= 2) {
            setIsSearching(true);
            const res = await callFetchResume(0, 5, `name,desc&name=${value}`);
            if (res?.data?.data?.result) {
                setSearchResults(res.data.data.result);
            }
            setIsSearching(false);
        } else {
            setSearchResults([]);
        }
    };

    const scheduleContentInvitee = () => {
        return (
            <>
                <div className='schedule-popup'>
                    <div className='schedule-popup__list'>
                        {scheduleInvitees?.map((scheduleInvitee, index) => (
                            <div className='schedule-item' key={`schedule-${index}`}>
                                <img className='schedule-item__image' src={`${scheduleInvitee?.imageUrl}`} />
                                <div className='schedule-item__content'>
                                    <div className='schedule-item__name'>{scheduleInvitee?.name}</div>
                                    <div className='schedule-item__status'>
                                        <span>Status: {scheduleInvitee?.status}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {Array.isArray(scheduleInvitees) && scheduleInvitees.length > 0 ? (
                        <div className='schedule-popup__footer'>
                            <button className='schedule-popup__button' onClick={() => navigate('/schedules/invitee')}>
                                Danh sách người đăng ký lịch với tôi
                            </button>
                        </div>
                    ) : (
                        <Empty description="Không có cuộc hẹn nào" />
                    )}
                </div>
            </>
        );
    };

    const scheduleContent = () => {
        return (
            <>
                <div className='schedule-popup'>
                    <div className='schedule-popup__list'>
                        {schedules?.map((schedule, index) => (
                            <div className='schedule-item' key={`schedule-${index}`}>
                                <img className='schedule-item__image' src={`${schedule?.imageUrl}`} />
                                <div className='schedule-item__content'>
                                    <div className='schedule-item__name'>{schedule?.name}</div>
                                    <div className='schedule-item__status'>
                                        <span>Status: {schedule?.status}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {Array.isArray(schedules) && schedules.length > 0 ? (
                        <div className='schedule-popup__footer'>
                            <button className='schedule-popup__button' onClick={() => navigate('/schedules')}>
                                Danh sách đăng ký
                            </button>
                        </div>
                    ) : (
                        <Empty description="Không có cuộc hẹn nào" />
                    )}
                </div>
            </>
        );
    };

    const searchName = () => {
        return (
            <div className='page-header__logo'>
                <span className='logo' onClick={() => { handleHomePage() }}>
                    <FaReact className='rotate icon-react' /> ITSS
                    <VscSearchFuzzy className='icon-search' />
                </span>
                <div className="search-container">
                    <input
                        className="input-search"
                        type={'text'}
                        placeholder="Bạn tìm gì hôm nay"
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    {searchResults.length > 0 && (
                        <div className="search-results">
                            {searchResults.map((result, index) => (
                                <div
                                    key={index}
                                    className="search-item"
                                    onClick={() => {
                                        navigate(`/resume/${result.id}`);
                                        setSearchResults([]);
                                        setSearchTerm('');
                                    }}
                                >
                                    <img src={result.imageUrl} alt={result.name} />
                                    <div>{result.name}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }
    return (
        <>
            <div className="header-container">
                <header className="page-header">
                    <div className="page-header__top">
                        <div className="page-header__toggle" onClick={() => {
                        }}>☰</div>
                        {searchName()}
                    </div>
                    <nav className="page-header__bottom">
                        <ul id="navigation" className="navigation">
                            <li className="navigation__item">
                                <Popover placement="bottomRight" title={"Danh sách lịch hẹn của tôi"} content={scheduleContentInvitee}>
                                    <Badge
                                        size={"small"}
                                        showZero
                                    >
                                        <FaRegHeart className='icon-cart' />
                                    </Badge>
                                </Popover>
                            </li>
                            <li className="navigation__item">
                                <Popover placement="bottomRight" title={"Danh sách cuộc hẹn đã đăng ký"} content={scheduleContent}>
                                    <Badge
                                        size={"small"}
                                        showZero
                                    >
                                        <AiOutlineSchedule className='icon-cart' />
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