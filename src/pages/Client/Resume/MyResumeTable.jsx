import { CloudUploadOutlined, DeleteTwoTone, EditTwoTone, ExportOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Col, message, notification, Popconfirm, Row, Table } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { callFetchResume } from "../../../services/api";
import CreateResumeModel from "./CreateResumeModel";

const MyResumeTable = () => {

    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState(null);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [dataUserUpdate, setDataUserUpdate] = useState(null);

    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const user = useSelector(state => state.account.user);

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            render: (text, record, index) => {
                return (
                    <a href='#' onClick={() => {
                        setOpenViewDetail(true);
                        setDataViewDetail(record);
                    }}>{record.id}</a>
                );
            }
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
            title: 'Action',
            render: (text, record, index) => {
                return (
                    <>
                        <EditTwoTone
                            twoToneColor="#f57800" style={{ cursor: "pointer" }}
                            onClick={() => {
                                setOpenModalUpdate(true);
                                setDataUserUpdate(record);
                            }}
                        />
                        <Popconfirm
                            placement="leftTop"
                            title={"Xác nhận xóa user"}
                            description={"Bạn có chắc chắn muốn xóa user này ?"}
                            onConfirm={() => callDeleteUser(record.id)}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <span style={{ cursor: "pointer", margin: "0 20px" }}>
                                <DeleteTwoTone twoToneColor="#ff4d4f" />
                            </span>
                        </Popconfirm>
                    </>
                );
            }
        }
    ];

    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span><h1>Bảng danh sách giáo viên</h1></span>
                <span style={{ display: 'flex', gap: 15 }}>
                    <Button
                        icon={<ExportOutlined />}
                        type="primary"
                        onClick={() => handleExportData()}
                    >Export</Button>

                    <Button
                        icon={<CloudUploadOutlined />}
                        type="primary"
                        onClick={() => setOpenModalImport(true)}
                    >Import</Button>

                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                        onClick={() => {
                            setOpenModalCreate(true);
                        }}
                    >Thêm mới</Button>
                    <Button type='ghost' onClick={() => {
                        setFilter("");
                        setSortQuery("");
                    }}>
                        <ReloadOutlined />
                    </Button>
                </span>
            </div>
        );
    };

    const fetchResume = async () => {
        if (!user || !user.name) return;
        setIsLoading(true);
        const res = await callFetchResume(current, pageSize, `name,desc&userName=${user.name}`);
        if (res && res.data.data.meta.total) {
            setData(res.data.data.result);
            setTotal(res.data.data.meta.total);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchResume();
    }, [current, pageSize, user]);

    const onChange = async (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current !== current + 1) {
            setCurrent(pagination.current - 1); // Subtract 1 to start from 0
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
            setCurrent(0); // Reset to 0 when page size changes
        }
    };

    return (
        <>
            <h1>Resume Table</h1>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                </Col>
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
                            showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>); }
                        }}
                        loading={isLoading}
                    />
                </Col>
            </Row>
            <CreateResumeModel
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
                fetchResume={fetchResume}
            ></CreateResumeModel>

        </>
    );
}
export default MyResumeTable;