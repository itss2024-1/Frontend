import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, message, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { callRegister, login } from '../../services/api';
import { doLoginAction } from '../../redux/slice/accountSlide';
import './login.scss';

const LoginPage = () => {
    const [isSubmit, setIsSubmit] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        const { username, password } = values;

        setIsSubmit(true);
        if (isLogin) {
            const res = await login(username, password);
            setIsSubmit(false);

            if (res?.data?.user) {
                localStorage.setItem('access_token', res.data.access_token)
                dispatch(doLoginAction(res.data))
                message.success("Đăng nhập người dùng thành công!!!");
                navigate('/')
            } else {
                notification.error({
                    message: "Have error!!!",
                    description: res.message,
                    duration: 5
                })
            }
        } else {
            const res = await callRegister(values);
            setIsSubmit(false);

            if (res?.data?.data) {
                message.success("Đăng ký người dùng thành công!!!");
                setIsLogin(true);
            } else {
                notification.error({
                    message: "Have error!!!",
                    description: res.message,
                    duration: 5
                })
            }
        }
    };

    const onFinishFailed = (errorInfo) => {
        message.success("Có lỗi xảy ra!!!", errorInfo);
    };

    const handleChange = () => {
        setIsLogin(!isLogin);
    }

    const loginForm = () => {
        return (
            <>
                <h3>Đăng nhập</h3>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    style={{ maxWidth: 600, margin: "0 auto" }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="username"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Button type="primary" htmlType="submit" loading={isSubmit}>
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
                <Button type="link" onClick={() => handleChange()}>
                    Chuyển sang Đăng ký
                </Button>
            </>
        )
    }

    const registerForm = () => {
        return (
            <>
                <h3>Đăng ký</h3>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Tên hiển thị"
                        name="name"
                        rules={[{ required: true, message: 'Name không được để trống!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Số điện	thoại"
                        name="phone"
                        rules={[{ required: true, message: 'Phone không được để trống!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Button type="primary" htmlType="submit" loading={isSubmit}>
                            Đăng ký
                        </Button>
                    </Form.Item>
                    <Button type="link" onClick={() => handleChange()}>
                        Chuyển sang Đăng nhập
                    </Button>
                </Form>
            </>
        )
    }

    return (
        <div className='login-page'>
            <div className='login-container'>
                <div className='login-image'></div>
                <div className='login-form'>

                    {isLogin ? loginForm() : registerForm()}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
