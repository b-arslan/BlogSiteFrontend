'use client';
import axios from "axios";
import { Layout, Row, Col, Button, Form, Input, FormProps } from 'antd';
import { useRouter } from "next/navigation";
import styles from '../styles/admin.module.scss';
import { useEffect } from "react";

const { Content } = Layout;

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const LoginPage = () => {

    const router = useRouter();

    useEffect(() => {
        // Hide header and footer on admin page
        const header = document.getElementById('header-component');
        const footer = document.getElementById('footer-component');
    
        if (header) header.style.display = 'none';
        if (footer) footer.style.display = 'none';
    
        // Clean up when component unmounts
        return () => {
          if (header) header.style.display = 'block';
          if (footer) footer.style.display = 'block';
        };
    }, []);

    const onFinish = async (values: FieldType) => {
        try {
            // Make an API call to your backend for login
            const res = await axios.post('/api/login', {
                email: values.username, // Or map it properly to the "email" in your form
                password: values.password
            });
            
            const token = 'Authorized'; // Expect the token to come from your API response
            const expiresIn = 3600; // 1 hour in seconds
    
            const expirationTime = new Date().getTime() + expiresIn * 1000; // Setting expiration 1 hour from now
    
            localStorage.setItem('token', token);
            localStorage.setItem('tokenExpiry', expirationTime.toString());
            
            // Redirect to the admin page after successful login
            router.push('/admin');
        } catch (error) {
            console.error('Login failed: ', error);
        }
    };

    return (
        <Layout style={{ height: '100vh', zIndex: '999', opacity: '1' }}>
            <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Row>
                    <Col span={24} className={styles.myBoxShadow} >
                        <h1>Admin Login</h1>
                        <Form
                            name="basic"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ width: '100%', color: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item<FieldType>
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                                style={{width: '100%', display: 'flex', flexDirection: 'column'}}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                                style={{width: '100%'}}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item style={{width: '100%'}} wrapperCol={{ span: 24 }}>
                                <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                                    Log In
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default LoginPage;