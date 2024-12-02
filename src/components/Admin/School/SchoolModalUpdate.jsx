import { Form, Input, message, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { callUpdateSchool } from "../../../services/api";

const SchoolModalUpdate = (props) => {
    const { openModalUpdate, setOpenModalUpdate, fetchSchool, dataSchoolUpdate } = props;

    const [isSubmit, setIsSubmit] = useState(false);
    const [form] = Form.useForm();
    useEffect(() => {
        if (openModalUpdate && dataSchoolUpdate) {
            form.setFieldsValue(dataSchoolUpdate); // Set form values when modal opens and dataSchoolUpdate is available
        }
    }, [openModalUpdate, dataSchoolUpdate, form]); // Include openModalUpdate as a dependency
    const handleCancel = () => {
        setOpenModalUpdate(false);
        form.resetFields();
    };

    const onFinish = async (values) => {
        console.log('Success:', values);
        setIsSubmit(true);
        const res = await callUpdateSchool(values);
        if (res && res.data) {
            message.success('Cập nhật trường học thành công');
            form.resetFields();
            setOpenModalUpdate(false);
            await fetchSchool();
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message,
            });
        }
        setIsSubmit(false);
    };

    return (
        <>
            <Modal title="Basic Modal"
                open={openModalUpdate}
                onOk={() => { form.submit() }}
                onCancel={handleCancel}
                okText={"Cập nhật"}
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
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                    >
                        <Input disabled={true} />
                    </Form.Item>
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
                        name="id"
                        hidden={true}
                    >
                        <Input type="hidden" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default SchoolModalUpdate;
