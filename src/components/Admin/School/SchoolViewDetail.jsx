import React, { useState } from 'react';
import { Drawer } from 'antd';
import { Descriptions } from 'antd';
import { FORMAT_DATE_DISPLAY } from "../../../utils/constant";
import moment from 'moment';

const SchoolViewDetail = (props) => {
    const { openViewDetail, setOpenViewDetail, dataViewDetail } = props;

    const showDrawer = () => {
        setOpenViewDetail(true);
    };
    const onClose = () => {
        setOpenViewDetail(false);
    };
    return (
        <>
            <Drawer title="Trường học" onClose={onClose} open={openViewDetail} width={"50vw"}>
                <Descriptions
                    title="Thông tin trường học"
                    bordered
                    column={2}
                >
                    <Descriptions.Item label="Id"><a>{dataViewDetail?.id}</a></Descriptions.Item>
                    <Descriptions.Item label="Tên trường">{dataViewDetail?.name}</Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ">{dataViewDetail?.address}</Descriptions.Item>
                    {/* <Descriptions.Item label="Số điện thoại">{dataViewDetail?.phone}</Descriptions.Item> */}
                    <Descriptions.Item label="Email">{dataViewDetail?.email}</Descriptions.Item>
                    <Descriptions.Item label="Ngày thành lập">
                        {moment(dataViewDetail?.establishedAt).format(FORMAT_DATE_DISPLAY)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày cập nhật thông tin">
                        {moment(dataViewDetail?.updatedAt).format(FORMAT_DATE_DISPLAY)}
                    </Descriptions.Item>
                </Descriptions>
            </Drawer>
        </>
    );
};
export default SchoolViewDetail;
