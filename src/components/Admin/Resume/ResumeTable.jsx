import { CloudUploadOutlined, DeleteTwoTone, EditTwoTone, ReloadOutlined } from "@ant-design/icons";
import { Button, Col, message, Modal, Popconfirm, Row, Table } from "antd";
import { useEffect, useState } from "react";
import { callFetchResume, callDeleteUser } from "../../../services/api";

const ResumeTable = () => {
    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [dataUserUpdate, setDataUserUpdate] = useState(null);

    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState(null);

    // Fetch dữ liệu CV
    const fetchResume = async () => {
        setIsLoading(true);
        try {
            const res = await callFetchResume(current, pageSize, 'name,asc');
            if (res && res.data.data.meta.total) {
                setData(res.data.data.result);
                setTotal(res.data.data.meta.total);
            }
        } catch (error) {
            message.error("Lỗi khi tải dữ liệu CV");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchResume();
    }, [current, pageSize]);

    // Xử lý xóa người dùng
    const handleDeleteUser = async (id) => {
        try {
            await callDeleteUser(id);
            message.success("Xóa người dùng thành công");
            fetchResume();
        } catch (error) {
            message.error("Xóa người dùng thất bại");
        }
    };

    // Cấu hình cột cho bảng
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            render: (text, record) => (
                <a href='#' onClick={() => {
                    setOpenViewDetail(true);
                    setDataViewDetail(record);
                }}>{record.id}</a>
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: true
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: true
        },
        {
            title: 'Job Title',
            dataIndex: 'jobTitle',
            sorter: true
        },
        {
            title: 'Description',
            dataIndex: 'description',
            ellipsis: true
        },
        {
            title: 'Awards',
            dataIndex: 'awards',
            ellipsis: true
        },
        {
            title: 'Action',
            render: (text, record) => (
                <>
                    <EditTwoTone
                        twoToneColor="#f57800"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            setOpenModalUpdate(true);
                            setDataUserUpdate(record);
                        }}
                    />

                </>
            )
        }
    ];

    // Xử lý phân trang và sắp xếp
    const onChange = (pagination, filters, sorter) => {
        if (pagination.current - 1 !== current) {
            setCurrent(pagination.current - 1);
        }
        if (pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
            setCurrent(0);
        }
    };

    // Render header của bảng
    const renderHeader = () => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h1>Bảng danh sách CV</h1>
            <Button type='ghost' onClick={() => fetchResume()}>
                <ReloadOutlined />
            </Button>
        </div>
    );

    return (
        <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <Table
                        title={renderHeader}
                        columns={columns}
                        dataSource={data}
                        onChange={onChange}
                        rowKey="id"
                        pagination={{
                            current: current + 1,
                            pageSize: pageSize,
                            showSizeChanger: true,
                            total: total,
                            showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} dòng`
                        }}
                        loading={isLoading}
                    />
                </Col>
            </Row>

            {/* Modal Chi tiết CV */}
            <Modal
                title="Chi tiết CV"
                open={openViewDetail}
                onCancel={() => setOpenViewDetail(false)}

            >
                {dataViewDetail && (
                    <>
                        <p><strong>ID:</strong> {dataViewDetail.id}</p>
                        <p><strong>Tên:</strong> {dataViewDetail.name}</p>
                        <p><strong>Chức vụ:</strong> {dataViewDetail.jobTitle}</p>
                        <p><strong>Trạng thái:</strong> {dataViewDetail.status}</p>
                        <p><strong>Mô tả:</strong> {dataViewDetail.description}</p>
                        <p><strong>Giải thưởng:</strong> {dataViewDetail.awards}</p>
                    </>
                )}
            </Modal>

            {/* Modal Cập nhật CV */}
            <Modal
                title="CV"
                open={openModalUpdate}
                onCancel={() => setOpenModalUpdate(false)}
                onOk={() => { setOpenModalUpdate(false) }}
            >
                {dataUserUpdate && (
                    <>
                        <p><strong>ID:</strong> {dataUserUpdate.id}</p>
                        <p><strong>Tên:</strong> {dataUserUpdate.name}</p>
                        <p><strong>Chức vụ:</strong> {dataUserUpdate.jobTitle}</p>
                        <p><strong>Trạng thái:</strong> {dataUserUpdate.status}</p>
                        <p><strong>Mô tả:</strong> {dataUserUpdate.description}</p>
                        <p><strong>Giải thưởng:</strong> {dataUserUpdate.awards}</p>
                    </>
                )}
            </Modal>
        </>
    );
};

export default ResumeTable;
