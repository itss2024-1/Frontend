import { Card, Col, Row, Statistic } from "antd";
import { useEffect, useState } from "react";
import CountUp from 'react-countup';
import { callFetchSchool, callFetchUser } from "../../services/api";

const AdminPage = () => {
    const formatter = (value) => <CountUp end={value} separator="," />;
    const [countUser, setCountUser] = useState(0);
    const [countSchool, setCountSchool] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const fetchUser = async () => {
        setIsLoading(true);
        const res = await callFetchUser(0, 5, 'name,asc');
        if (res && res.data) {
            setCountUser(res.data.data.meta.total);
        }
        setIsLoading(false);
    }

    const fetchSchool = async () => {
        setIsLoading(true);
        const res = await callFetchSchool(0, 5, 'name,asc');
        if (res && res.data) {
            setCountSchool(res.data.data.meta.total);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchUser();
        fetchSchool();
    }, [])

    return (
        <>
            <Row gutter={16}>
                <Col span={12}>
                    <Card bordered={false} loading={isLoading}>
                        <Statistic title="Active Users" value={countUser} formatter={formatter} />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card bordered={false}>
                        <Statistic title="Total Schools" value={countSchool} precision={2} formatter={formatter} />
                    </Card>
                </Col>
            </Row>
        </>
    )
}
export default AdminPage;