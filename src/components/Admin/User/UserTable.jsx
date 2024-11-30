import { CloudUploadOutlined, DeleteTwoTone, EditTwoTone, ExportOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Col, message, notification, Popconfirm, Row, Table } from "antd"
import { useEffect, useState } from "react";
import { callFetchUser } from "../../../services/api";

const UserTable = () => {

    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState(null);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [dataUserUpdate, setDataUserUpdate] = useState(null);

    const [openModalImport, setOpenModalImport] = useState(false);

    const [filter, setFilter] = useState("");
    const [sortQuery, setSortQuery] = useState("");

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            render: (text, record, index) => {
                return (
                    <a href='#' onClick={() => {
                        setOpenViewDetail(true);
                        setDataViewDetail(record);
                    }}>{record._id}</a>

                )
            }
        },
        {
            title: 'Name',
            dataIndex: 'fullName',
            sorter: true
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: true
        },
        {
            title: 'Action',
            render: (text, record, index) => {
                return (
                    <>
                        <Popconfirm
                            placement="leftTop"
                            title={"Xác nhận xóa user"}
                            description={"Bạn có chắc chắn muốn xóa user này ?"}
                            onConfirm={() => handleDeleteUser(record._id)}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <span style={{ cursor: "pointer", margin: "0 20px" }}>
                                <DeleteTwoTone twoToneColor="#ff4d4f" />
                            </span>
                        </Popconfirm>

                        <EditTwoTone
                            twoToneColor="#f57800" style={{ cursor: "pointer" }}
                            onClick={() => {
                                setOpenModalUpdate(true);
                                setDataUserUpdate(record);
                            }}
                        />

                    </>

                )
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
                            setOpenModalCreate(true)
                        }}
                    >Thêm mới</Button>
                    <Button type='ghost' onClick={() => {
                        setFilter("");
                        setSortQuery("")
                    }}>
                        <ReloadOutlined />
                    </Button>
                </span>
            </div>
        )
    }

    const fetchUser = async () => {

        const res = await callFetchUser();
        console.log(">> check", res);
        if (res && res.data) {
            setData(res.data.result);
            setTotal(res.data.meta.total);
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchUser();
    }, [current, pageSize, filter, sortQuery]);

    const onChange = async (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current)
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize)
            setCurrent(1);
        }
        if (sorter && sorter.field) {
            const q = sorter.order === 'ascend' ? `sort=${sorter.field}` : `sort=-${sorter.field}`;
            setSortQuery(q);
        }

    };

    const handleSearch = (query) => {
        setCurrent(1)
        setFilter(query);
    }

    const handleExportData = () => {
        if (data.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "DataSheet.xlsx");
        }
    }

    const handleDeleteUser = async (_id) => {
        console.log("delete user", _id);
        const res = await callDeleteUser(_id);
        if (res && res.data) {
            message.success('Xoá người dùng thành công');
            fetchUser();
        }
        else
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message,
            });
    }

    return (
        <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    {/* <InputSearch
                        handleSearch={handleSearch}
                        setFilter={setFilter}
                    /> */}
                </Col>

                <Col span={24}>
                    <Table
                        title={renderHeader}
                        columns={columns}
                        dataSource={data}
                        onChange={onChange}
                        rowKey="_id"
                        pagination={
                            {
                                current: current,
                                pageSize: pageSize,
                                showSizeChanger: true,
                                total: total,
                                showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                            }
                        }
                        loading={isLoading}
                    />
                </Col>
            </Row>

        </>

    )
}
export default UserTable;