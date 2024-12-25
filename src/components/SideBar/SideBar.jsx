import { Menu } from 'antd';
import { HomeOutlined, CalendarOutlined, UserOutlined, ScheduleOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState('1');

    function getItem(label, key, icon, path) {
        return {
            key,
            icon,
            label,
            path,
        };
    }

    const items = [
        getItem('Trang chủ', '1', <HomeOutlined />, '/'),
        getItem('Lịch hẹn', '2', <CalendarOutlined />, '/schedules'),
        getItem('Lịch đã đăng ký', '3', <ScheduleOutlined />, '/schedules/invitee'),
        getItem('Hồ sơ của tôi', '4', <UserOutlined />, '/resume'),
    ];

    useEffect(() => {
        const currentItem = items.find(item => item.path === location.pathname);
        if (currentItem) {
            setSelectedKey(currentItem.key);
        }
    }, [location.pathname]);

    const handleMenuClick = (item) => {
        const selectedItem = items.find(menuItem => menuItem.key === item.key);
        if (selectedItem?.path) {
            navigate(selectedItem.path);
        }
    };

    return (
        <div className="sidebar">
            <Menu
                theme="dark"
                selectedKeys={[selectedKey]}
                mode="inline"
                items={items}
                onClick={handleMenuClick}
            />
        </div>
    );
};

export default SideBar;