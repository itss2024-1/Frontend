import { Form, Input, message, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";

import { callUpdateSchedule } from "../../services/api";

const UpdateSceduleModel = (props) => {
    const { openModelUpdate, setOpenModelUpdate, dataUpdate, fetchSchedulesInvitee } = props;

    const [isSubmit, setIsSubmit] = useState(false);
    const [form] = Form.useForm();

    const handleCancel = () => {
        setOpenModelUpdate(false);
        form.resetFields();
    };

    const onFinish = async (values) => {
        try {
            setIsSubmit(true);
            const res = await callUpdateSchedule(values);
            if (res && res?.data) {
                message.success('Cập nhật user thành công');
                form.resetFields();
                setOpenModelUpdate(false);
            }
        } catch (error) {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: error.message,
            });
        } finally {
            fetchSchedulesInvitee();
            setIsSubmit(false);
        }
    };

    useEffect(() => {
        if (dataUpdate && Object.keys(dataUpdate).length > 0) {
            form.setFieldsValue(dataUpdate);
        }
    }, [dataUpdate]);

    return (
        <Modal title="Basic Modal"
            open={openModelUpdate}
            onOk={() => { form.submit() }}
            onCancel={handleCancel}
            okText={"Tạo mới"}
            cancelText={"Hủy"}
            confirmLoading={isSubmit}>
            <Form
                form={form}
                name="basic"
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    labelCol={{ span: 24 }}
                    label="Tên cuộc hẹn"
                    name="name"
                    rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    labelCol={{ span: 24 }}
                    label="Trạng thái"
                    name="status"
                    rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
                >
                    <Select>
                        <Select.Option value="PENDING">PENDING</Select.Option>
                        <Select.Option value="ACCEPTED">ACCEPTED</Select.Option>
                        <Select.Option value="REJECTED">REJECTED</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    labelCol={{ span: 24 }}
                    label="Mô tả"
                    name="description"
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    name="id"
                    hidden={true}
                >
                    <Input type="hidden" />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default UpdateSceduleModel;