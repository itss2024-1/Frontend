import React, { useState } from 'react';
import { Badge, Button, Drawer } from 'antd';
import { Descriptions } from 'antd';
import { FORMAT_DATE_DISPLAY } from "../../../utils/constant";
import moment from 'moment';

const UserViewDetail = (props) => {
    const { openViewDetail, setOpenViewDetail, dataViewDetail } = props;

    const showDrawer = () => {
        setOpenViewDetail(true);
    };
    const onClose = () => {
        setOpenViewDetail(false);
    };
    return (
        <>
            <Drawer title="Basic Drawer" onClose={onClose} open={openViewDetail} width={"50vw"}>
                <Descriptions
                    title="Thông tin user"
                    bordered
                    column={2}
                >
                    <Descriptions.Item label="Id"><a>{dataViewDetail?.id}</a></Descriptions.Item>
                    <Descriptions.Item label="Tên hiển thị">{dataViewDetail?.name}</Descriptions.Item>
                    <Descriptions.Item label="Email">{dataViewDetail?.email}</Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">{dataViewDetail?.phone}</Descriptions.Item>

                    {/* <Descriptions.Item label="Role" span={2}>
                        <Badge status="processing" text={dataViewDetail?.role} />
                    </Descriptions.Item> */}
                    <Descriptions.Item label="Created At">
                        {moment(dataViewDetail?.createdAt).format(FORMAT_DATE_DISPLAY)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        {moment(dataViewDetail?.updatedAt).format(FORMAT_DATE_DISPLAY)}
                    </Descriptions.Item>
                </Descriptions>
            </Drawer>
        </>
    );
};
export default UserViewDetail;