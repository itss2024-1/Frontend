import React, { useEffect, useState } from 'react';
import {
    AppstoreOutlined,
    ExceptionOutlined,
    HeartTwoTone,
    TeamOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DownOutlined,
} from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Layout, Menu, Dropdown, Space } from 'antd';

import './layout.scss'

const { Content, Footer, Sider } = Layout;

const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const location = useLocation();

    const items = [
        {
            label: <Link to='/admin'>Trang quản trị</Link>,
            key: 'dashboard',
            icon: <AppstoreOutlined />
        },
        {
            label: <Link to='/admin/users'>Quản lý giáo viên</Link>,
            key: 'users',
            icon: <TeamOutlined />,
        },
        {
            label: <Link to='/admin/schools'>Quản lý trường học</Link>,
            key: 'schools',
            icon: <ExceptionOutlined />
        },

    ];

    const itemsDropdown = [
        {
            label: <label
                style={{ cursor: 'pointer' }}
            // onClick={() => setShowManageAccount(true)}
            >Quản lý tài khoản</label>,
            key: 'account',
        },
        {
            label: <Link to={'/'}>Trang chủ</Link>,
            key: 'home',
        },
        {
            label: <label
                style={{ cursor: 'pointer' }}
            // onClick={() => handleLogout()}
            >Đăng xuất</label>,
            key: 'logout',
        },
    ];

    useEffect(() => {
        const currentPath = location.pathname;
        const matchedItem = items.find(item => currentPath.includes(item.key));
        if (matchedItem) {
            setActiveMenu(matchedItem.key);
        }
    }, [location]);

    return (
        <Layout
            style={{ minHeight: '100vh' }}
            className="layout-admin"
        >

            <Sider
                theme='light'
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}>
                <div style={{ height: 32, margin: 16, textAlign: 'center' }}>
                    Admin
                </div>
                <Menu
                    defaultSelectedKeys={[activeMenu]}
                    mode="inline"
                    items={items}
                    onClick={(e) => setActiveMenu(e.key)}
                    selectedKeys={[activeMenu]}
                />
            </Sider>
            <Layout>
                <div className='admin-header'>
                    <span>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                    </span>
                    <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Welcome
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
                <Content>
                    <div className="content-scrollable">
                        <Outlet />
                    </div>
                </Content>

                <Footer style={{ padding: 0, textAlign: 'center' }}>
                    Ghost <HeartTwoTone />
                </Footer>
            </Layout>
        </Layout>
    );
};

export default LayoutAdmin;