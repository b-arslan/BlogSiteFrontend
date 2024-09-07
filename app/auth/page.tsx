'use client';
import { useState } from "react";
import axios from "axios";
import { Layout, Row, Col, Button, Form, Input, FormProps } from 'antd';
import { useRouter } from "next/navigation";
import styles from '../styles/admin.module.scss';

const { Content } = Layout;

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/login', { email, password });
            const { token } = res.data;

            localStorage.setItem('token', token);

            router.push('/admin');
        } catch (error) {
            console.error('Login failed: ', error);
        }
    };

    return (

        <Layout style={{ height: '100vh' }}>
            <Content style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Row>
                    <Col span={24} className={styles.myBoxShadow} >
                        
                        <h1>Admin Login</h1>

                        <Form
                            name="basic"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 18 }}
                            style={{ width: '100%', color: '#000' }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item<FieldType>
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 6, span: 24 }}>
                                <Button type="primary" htmlType="submit">
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