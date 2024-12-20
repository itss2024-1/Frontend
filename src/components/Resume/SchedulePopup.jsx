import { Button, Col, Form, Input, Modal, Row, DatePicker } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FORMAT_DATE_DISPLAY } from "../../utils/constant";
import { callCreateSchedule } from "../../services/api";

const SchedulePopup = (props) => {
    const { isModalOpen, setIsModalOpen, image, dataResume } = props;

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [isSubmit, setIsSubmit] = useState(false);

    // Danh sách các ngày bận (fake data)
    const busyDates = [
        '12-12-2024',
        '15-12-2024',
        '16-12-2024',
        '17-12-2024',
        '20-12-2024'
    ];

    // Hàm kiểm tra ngày có bị bận hay không
    const isBusyDate = (current) => {
        if (!current) return false;
        const formattedDate = current.format(FORMAT_DATE_DISPLAY);
        return busyDates.includes(formattedDate);
    };

    const onFinish = async (values) => {
        setIsSubmit(true);
        const formattedValues = {
            ...values,
            time: values.time
                ? values.time.format(FORMAT_DATE_DISPLAY)
                : null,
            imageUrl: image,
            inviteeId: dataResume?.user.id,
        };
        callCreateSchedule(formattedValues);
        setIsSubmit(false);
        form.resetFields(); // Reset all form fields
        setIsModalOpen(false);
    };

    return (
        <>
            <Modal
                title="Quản lý tài khoản"
                open={isModalOpen}
                footer={null}
                onCancel={() => setIsModalOpen(false)}
                maskClosable={false}
                width={"40vw"}
            >
                <div style={{ minHeight: 300 }}>
                    <Row>
                        <Col sm={24} md={24}>
                            <Form
                                onFinish={onFinish}
                                form={form}
                            >
                                <Form.Item
                                    hidden
                                    labelCol={{ span: 24 }}
                                    label="Id"
                                    name="id"
                                >
                                    <Input disabled hidden />
                                </Form.Item>

                                <Form.Item
                                    labelCol={{ span: 24 }}
                                    label="Email"
                                    name="email"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    labelCol={{ span: 24 }}
                                    label="Tên hiển thị"
                                    name="name"
                                    rules={[{ required: true, message: 'Tên hiển thị không được để trống!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    labelCol={{ span: 24 }}
                                    label="Số điện thoại"
                                    name="phone"
                                    rules={[{ required: true, message: 'Số điện thoại không được để trống!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    labelCol={{ span: 24 }}
                                    label="Mô tả"
                                    name="description"
                                >
                                    <Input.TextArea rows={4} />
                                </Form.Item>
                                <Row gutter={16} justify="end">
                                    <Col span={7}>
                                        <Form.Item
                                            labelCol={{ span: 24 }}
                                            label="Thời gian"
                                            name="time"
                                            rules={[{ required: true, message: 'Vui lòng chọn ngày và thời gian bắt đầu!' }]}
                                        >
                                            <DatePicker
                                                format={FORMAT_DATE_DISPLAY}
                                                disabledDate={isBusyDate} // Áp dụng logic ngày bận
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row justify="end">
                                    <Col>
                                        <Button type="primary" loading={isSubmit} onClick={() => form.submit()}>
                                            Cập nhật
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </>
    );
}

export default SchedulePopup;