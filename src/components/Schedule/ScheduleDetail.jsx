import React, { useEffect, useState } from 'react';
import { Row, Col, Breadcrumb, Tag } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';

import './schedule.scss';
import { callFetchScheduleById } from '../../services/api';

const ScheduleDetail = () => {
    const { id } = useParams();
    const [dataSchedule, setDataSchedule] = useState(null);
    const fetchSchedule = async () => {
        try {
            const res = await callFetchScheduleById(id);
            setDataSchedule(res.data.data);
        } catch (error) {
            console.error('Error fetching schedule:', error);
        }
    };

    useEffect(() => {
        fetchSchedule();
    }, [id]);

    return (
        <div style={{ background: '#efefef', padding: "20px 0" }}>
            <div className='view-detail-schedule' style={{ maxWidth: 1440, margin: '0 auto', minHeight: "calc(100vh - 150px)" }}>
                <Breadcrumb
                    style={{ margin: '5px 0' }}
                    items={[
                        {
                            title: <HomeOutlined />,
                        },
                        {
                            title: (
                                <Link to={'/'}>
                                    <span>Trang Chủ</span>
                                </Link>
                            ),
                        },
                        {
                            title: (
                                <Link to={'/schedules'}>
                                    <span>Danh sách cuộc hẹn</span>
                                </Link>
                            ),
                        },
                        {
                            title: (
                                <span>Chi tiết cuộc hẹn</span>
                            ),
                        }
                    ]}
                />
                <div style={{ padding: "20px", background: '#fff', borderRadius: 5 }}>
                    {dataSchedule && dataSchedule.id ? (
                        <>
                            <Row gutter={[20, 20]}>
                                <Col md={10} sm={24}>
                                    <div className='thumbnail'>
                                        <img src={dataSchedule.imageUrl} alt="thumbnail schedule" />
                                    </div>
                                </Col>
                                <Col md={14} sm={24}>
                                    <Col span={24}>
                                        <div className='author'>Người mời: {dataSchedule?.user.name}</div>
                                        <div className='title'>{dataSchedule?.name}</div>
                                        <div className='job-title'>
                                            <span className='left-side'>Trạng thái: </span>
                                            <span className='right-side'>
                                                <Tag color={dataSchedule.status === 'PENDING' ? 'orange' : 'green'}>
                                                    {dataSchedule.status}
                                                </Tag>
                                            </span>
                                        </div>
                                        <div className='description'>
                                            <span className='left-side'>Giới thiệu: </span>
                                            <span className='right-side'>{dataSchedule.description}</span>
                                        </div>
                                        <div className='phone'>
                                            <span className='left-side'>Số điện thoại: </span>
                                            <span className='right-side'>{dataSchedule.phone}</span>
                                        </div>
                                        <div className='time'>
                                            <span className='left-side'>Thời gian: </span>
                                            <span className='right-side'>{moment(dataSchedule.time).format('YYYY-MM-DD HH:mm')}</span>
                                        </div>
                                        <div className='created-at'>
                                            <span className='left-side'>Ngày tạo: </span>
                                            <span className='right-side'>{moment(dataSchedule.createdAt).format('YYYY-MM-DD HH:mm')}</span>
                                        </div>
                                    </Col>
                                </Col>
                            </Row>
                            {/* Add SchedulePopup component if needed */}
                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ScheduleDetail;