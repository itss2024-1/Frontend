import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Tag } from "antd";

import { callFetchScheduleByInviteeId } from "../../services/api";
import UpdateSceduleModel from "./UpdateScheduleModel";

const ScheduleWithOtherTable = () => {
    const [openModelUpdate, setOpenModelUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState();
    const [schedulesInvitee, setSchedulesInvitee] = useState([]);
    const [current, setCurrent] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const user = useSelector(state => state.account.user);

    const fetchSchedulesInvitee = async () => {
        setIsLoading(true);
        const res = await callFetchScheduleByInviteeId(current, pageSize, user.id);
        if (res.status === 200) {
            setSchedulesInvitee(res.data.data.result);
            setTotal(res.data.data.meta.total);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchSchedulesInvitee();
    }, [current, pageSize, user])

    const onChange = async (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current !== current + 1) {
            setCurrent(pagination.current - 1); // Subtract 1 to start from 0
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
            setCurrent(0); // Reset to 0 when page size changes
        }
    };
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            render: (text, record) => (
                <a href='#' onClick={() => {
                    console.log(record);
                    setOpenModelUpdate(true);
                    setDataUpdate(record);
                }}>{record.id}</a>
            ),
        },
        {
            title: 'Event',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color = 'warning';
                switch (status) {
                    case 'PENDING':
                        color = 'warning';
                        break;
                    case 'REJECTED':
                        color = 'red';
                        break;
                    case 'ACCEPTED':
                        color = 'green';
                        break;
                    default:
                        color = 'warning';
                }
                return <Tag color={color}>{status}</Tag>;
            }
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Desciption',
            dataIndex: 'description',
            key: 'description',
        },
    ];
    return (
        <>
            <h1>Danh sách sự kiện được mời</h1>
            <Table
                columns={columns}
                dataSource={schedulesInvitee}
                rowKey="id"
                onChange={onChange}
                pagination={{
                    current: current + 1,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    total: total,
                    showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>); }
                }}
                loading={isLoading}
            />
            <UpdateSceduleModel
                openModelUpdate={openModelUpdate}
                setOpenModelUpdate={setOpenModelUpdate}
                dataUpdate={dataUpdate}
            ></UpdateSceduleModel>
        </>
    )
}

export default ScheduleWithOtherTable;