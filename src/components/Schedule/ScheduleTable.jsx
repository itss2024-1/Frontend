import { Table, Row, Col } from "antd";
import { useSelector } from "react-redux";
import { useState } from "react";

const ScheduleTable = () => {
    const orderList = useSelector((state) => state.myOrder.orderList);
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState(null);

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            render: (text, record) => (
                <a href='#' onClick={() => {
                    setOpenViewDetail(true);
                    setDataViewDetail(record);
                }}>{record.id}</a>
            ),
        },
        {
            title: 'Event',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Start Time',
            dataIndex: 'dateTime',
            key: 'dateTime',
        },
    ];

    return (
        <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <Table
                        columns={columns}
                        dataSource={orderList}
                        rowKey="id"
                        pagination={{
                            showSizeChanger: true,
                            showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} rows`,
                        }}
                    />
                </Col>
            </Row>
        </>
    );
}

export default ScheduleTable;