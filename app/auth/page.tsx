'use client';
import axios from "axios";
import { Layout, Row, Col, Button, Form, Input, FormProps, message } from 'antd';
import { useRouter } from "next/navigation";
import styles from '../styles/admin.module.scss';
import { useEffect, useState } from "react";

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
    const [loadingBtn, setLoadingBtn] = useState(false);

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
        setLoadingBtn(true);
        try {
            // Make an API call to your backend for login
            const res = await axios.post('/api/login', {
                email: values.username, // Or map it properly to the "email" in your form
                password: values.password
            });
    
            if (res.data.success) {
                message.success({
                    content: res.data.message,
                    duration: 1
                });
    
                const token = 'Authorized'; // Expect the token to come from your API response
                const expiresIn = 3600; // 1 hour in seconds
        
                const expirationTime = new Date().getTime() + expiresIn * 1000; // Setting expiration 1 hour from now
        
                localStorage.setItem('akerToken', token);
                localStorage.setItem('akerTokenExpiry', expirationTime.toString());
            
                router.push('/admin');
            } else {
                message.error(res.data.message || 'Giriş Başarısız.');
            }
        } catch (error: any) {
            if (error.response) {
                const statusCode = error.response.status;
                const errorMessage = error.response.data?.message || 'Hata Oluştu';
    
                if (statusCode === 404) {
                    message.error(errorMessage);
                } else {
                    message.error('Giriş Başarısız.');
                }
            } else {
                // General error handling (e.g., network issues)
                message.error('Hata Oluştu.');
            }
        } finally {
            setLoadingBtn(false);
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
                                <Button loading={loadingBtn} type="primary" htmlType="submit" style={{width: '100%'}}>
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