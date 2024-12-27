/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, message, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { login } from '../../services/api';
import { doLoginAction } from '../../redux/slice/accountSlide';
import RegisterPage from '../Register/Register'; // Import RegisterPage

const LoginPage = () => {
    const [isSubmit, setIsSubmit] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false); // Trạng thái hiển thị đăng ký
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        const { username, password } = values;

        setIsSubmit(true);
        const res = await login(username, password);
        setIsSubmit(false);

        if (res?.data?.user) {
            localStorage.setItem('access_token', res.data.access_token);
            dispatch(doLoginAction(res.data));
            message.success("Đăng nhập người dùng thành công!!!");
            navigate('/');
        } else {
            notification.error({
                message: "Có lỗi!!!",
                description: res.message,
                duration: 5,
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        message.error("Có lỗi xảy ra!!!", errorInfo);
    };

    if (isRegistering) {
        // Hiển thị RegisterPage khi ở trạng thái đăng ký
        return <RegisterPage onClose={() => setIsRegistering(false)} />;
    }

    return (
        <div
            className="login-page"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: `url('backgrounds.jpeg') no-repeat center center`,
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
            }}
        >
            <div
                style={{
                    padding: '20px',
                    background: '#fff',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
            >
                <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Đăng nhập</h3>
                <Form
                    name="basic"
                    labelCol={{
                        span: 7,
                    }}
                    wrapperCol={{
                        span: 17,
                    }}
                    style={{
                        maxWidth: '400px',
                        margin: '0 auto',
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    {/* Email */}
                    <Form.Item
                        label="Email:"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input style={{ height: '35px', borderRadius: '5px' }} />
                    </Form.Item>

                    {/* Password */}
                    <Form.Item
                        label="Password:"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        style={{ marginBottom: '20px' }}
                    >
                        <Input.Password style={{ height: '35px', borderRadius: '5px' }} />
                    </Form.Item>

                    {/* Remember Me */}
                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 7,
                            span: 17,
                        }}
                        style={{ marginBottom: '20px' }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    {/* Login Button */}
                    <Form.Item
                        wrapperCol={{
                            span: 24,
                        }}
                        style={{ textAlign: 'center', marginBottom: '10px' }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isSubmit}
                            style={{
                                width: '150px',
                                borderRadius: '5px',
                                marginBottom: '10px',
                                backgroundColor: '#FF4D4F',
                                borderColor: '#FF4D4F',
                                color: 'white',
                            }}
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>

                    {/* Register Link */}
                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                        <span style={{ color: '#888' }}>Bạn chưa có tài khoản? </span>
                        <span
                            onClick={() => setIsRegistering(true)}
                            style={{
                                color: '#FF4D4F',
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                fontWeight: '500',
                            }}
                        >
                            Đăng ký ngay
                        </span>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;
