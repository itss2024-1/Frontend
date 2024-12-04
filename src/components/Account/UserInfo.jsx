import React, { useState } from "react";
import { Avatar, Button, Col, Form, Input, message, Modal, Row, Upload } from "antd";
import { AntDesignOutlined, UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { doUpdateUserInfoAction, doUploadAvatarAction } from "../../redux/slice/accountSlide";
import { callUpdateUser, callUploadSingleFile } from "../../services/api";

const UserInfo = (props) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const user = useSelector(state => state.account.user);
    const tempAvatar = useSelector(state => state.account.tempAvatar);

    const [userAvatar, setUserAvatar] = useState(user?.avatar ?? "");
    const [isSubmit, setIsSubmit] = useState(false);

    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}storage/avatar/${tempAvatar || user?.avatar}`;

    const handleUploadAvatar = async ({ file, onSuccess, onError }) => {
        const res = await callUploadSingleFile(file, "avatar");
        if (res && res.data) {
            const newAvatar = res.data.fileName;
            dispatch(doUploadAvatarAction({ avatar: newAvatar }))
            setUserAvatar(newAvatar);
            onSuccess('ok')
        } else {
            onError('Đã có lỗi khi upload file');
        }
    };

    const propsUpload = {
        maxCount: 1,
        multiple: false,
        showUploadList: false,
        customRequest: handleUploadAvatar,
        onChange(info) {
            if (info.file.status !== 'uploading') {
            }
            if (info.file.status === 'done') {
                message.success(`Upload file thành công`);
            } else if (info.file.status === 'error') {
                message.error(`Upload file thất bại`);
            }
        },
    };

    const onFinish = async (values) => {
        const { name, phone, id } = values;
        setIsSubmit(true)
        const res = await callUpdateUser({ name, phone, id, avatar: userAvatar });

        if (res && res.data) {
            //update redux
            dispatch(doUpdateUserInfoAction({ avatar: userAvatar, phone, name }));
            message.success("Cập nhật thông tin user thành công");

            //force renew token
            // localStorage.removeItem('access_token');
        } else {
            notification.error({
                message: "Đã có lỗi xảy ra",
                description: res.message
            })
        }
        setIsSubmit(false)
    }

    return (
        <div style={{ minHeight: 400 }}>
            <Row>
                <Col sm={24} md={12}>
                    <Row gutter={[30, 30]}>
                        <Col span={24}>
                            <Avatar
                                size={{ xs: 32, sm: 64, md: 80, lg: 128, xl: 160, xxl: 200 }}
                                icon={<AntDesignOutlined />}
                                src={urlAvatar}
                                shape="circle"
                            />
                        </Col>
                        <Col span={24}>
                            <Upload {...propsUpload}>
                                <Button icon={<UploadOutlined />}>
                                    Upload Avatar
                                </Button>
                            </Upload>
                        </Col>
                    </Row>
                </Col>
                <Col sm={24} md={12}>
                    <Form
                        onFinish={onFinish}
                        form={form}
                    >
                        <Form.Item
                            hidden
                            labelCol={{ span: 24 }}
                            label="Id"
                            name="id"
                            initialValue={user?.id}

                        >
                            <Input disabled hidden />
                        </Form.Item>

                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Email"
                            name="email"
                            initialValue={user?.email}

                        >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Tên hiển thị"
                            name="name"
                            initialValue={user?.name}
                            rules={[{ required: true, message: 'Tên hiển thị không được để trống!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Số điện thoại"
                            name="phone"
                            initialValue={user?.phone}
                            rules={[{ required: true, message: 'Số điện thoại không được để trống!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Button loading={isSubmit} onClick={() => form.submit()}>Cập nhật</Button>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default UserInfo;

