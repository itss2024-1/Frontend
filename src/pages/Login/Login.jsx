import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, message, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../services/api';
import { doLoginAction } from '../../redux/slice/accountSlide';

const LoginPage = () => {

    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        const { username, password } = values;
        setIsSubmit(true);
        const res = await login(username, password);
        setIsSubmit(false);
        if (res?.data?.user) {
            localStorage.setItem('access_token', res.data.access_token)
            dispatch(doLoginAction(res.data))
            message.success("Đăng nhập người dùng thành công!!!");
            navigate('/')
        }
        else {
            notification.error({
                message: "Have error!!!",
                description: res.message,
                duration: 5
            })
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='register-page' style={{ padding: '50px' }}>
            <h3 style={{ textAlign: 'center' }}>Đăng nhập</h3>
            <Form
                name="basic"
                labelCol={{
                    span: 6,
                }}
                style={{
                    maxWidth: 600, margin: "0 auto"
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" loading={isSubmit}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
};
export default LoginPage;