import { Button, Col, Form, Input, Row, theme } from 'antd';
const labelStyle = {
    fontWeight: 'bold',
    color: '#007bff', // Typical blue color, you can customize the hex value
};
const Search = () => {
    const [form] = Form.useForm();
    const { token } = theme.useToken();

    const formStyle = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
    };

    const onFinish = () => {

    }

    return (
        <>
            <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
                <Row gutter={24}>
                    <Col span={24}>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            name="searchQuery"
                            label={<span style={labelStyle}>Tìm kiếm</span>}
                        >
                            <Input placeholder="Tìm kiếm theo Tên, Email hoặc Số điện thoại" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">
                            Search
                        </Button>
                        <Button
                            style={{ margin: '0 8px' }}
                            onClick={() => {
                                form.resetFields();
                                // Assuming `props.setFilter` is meant to be used to clear some external state or filter
                                if (props.setFilter) {
                                    props.setFilter("");
                                }
                            }}
                        >
                            Clear
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default Search;