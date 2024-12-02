import React, { useState } from 'react';
import { Button, Form, Input, message, Modal, notification } from 'antd';
import { callCreateSchool } from '../../../services/api';

const SchoolModalCreate = (props) => {
    const { openModalCreate, setOpenModalCreate } = props;

    const [isSubmit, setIsSubmit] = useState(false);
    const [form] = Form.useForm();

    const handleCancel = () => {
        setOpenModalCreate(false);
        form.resetFields();
    };

    const onFinish = async (values) => {
        setIsSubmit(true);
        const res = await callCreateSchool(values);
        if (res && res.data) {
            message.success('Tạo mới trường học thành công');
            form.resetFields();
            setOpenModalCreate(false);
            await props.fetchSchool();
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            });
        }
        setIsSubmit(false);
    };

    return (
        <>
            <Modal title="Tạo mới trường học"
                open={openModalCreate}
                onOk={() => { form.submit(); }}
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
                        label="Tên trường"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên trường!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Địa chỉ"
                        name="address"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    {/* <Form.Item
                        labelCol={{ span: 24 }}
                        label="Số điện thoại"
                        name="phone"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                    >
                        <Input />
                    </Form.Item> */}
                </Form>

            </Modal>
        </>
    );
};

export default SchoolModalCreate;