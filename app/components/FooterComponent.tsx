"use client";
import { useState } from "react";
import { Form, Input, Button, message, Row, Col, Layout, Divider } from "antd";
import {
    InstagramOutlined,
    LinkedinOutlined,
    MailOutlined,
} from "@ant-design/icons";
import styles from "../styles/page.module.scss";
import emailjs from '@emailjs/browser';

const { Footer } = Layout;
const { TextArea } = Input;

const FooterComponent = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const copyToClipboard = () => {
        navigator.clipboard.writeText('psikolog@mehmetaker.com');
        message.success({
            duration: 1.4,
            content: 'Başarıyla Kopyalandı!'
        })
    }

    const onFinish = async (values: any) => {
        setLoading(true);

        try {
            emailjs.send(
                `${process.env.EMAILJS_SERVICE_ID}`,     // EmailJS Service ID
                `${process.env.EMAILJS_TEMPLATE_ID}`,    // EmailJS Template ID
                {
                    from_name: values.name,
                    from_email: values.email,
                    message: values.content,
                    emailTo: 'psikolog@mehmetaker.com'
                },
                `${process.env.EMAILJS_PUBLIC_KEY}`       // Public Key
            ).then(
                (result) => {
                    message.success('Mesaj başarıyla gönderildi!');
                    form.resetFields();
                },
                (error) => {
                    message.error('Mesaj gönderilemedi.');
                    console.log('FAILED...', error.text);
                }
            );
        } catch (err) {
            message.error('Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Footer id="footer-component" className={styles.footer}>
            <Row style={{height: '100%'}}>
                <Col
                    span={24}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        width: "100%",
                    }}
                >
                    <div style={{ position: "absolute", top: "0" }}>
                        <h2 className={styles.footerTitle}>Sosyal</h2>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            width: "100%",
                            gap: '0.2rem',
                            marginTop: '4rem'
                        }}
                    >
                        <Button type="text" className={styles.instagram} onClick={() => window.open("https://www.instagram.com/psikolog.mehmetaker/")}><InstagramOutlined className={styles.iconBtn} /> Instagram</Button>
                        <Button type="text" className={styles.linkedin} onClick={() => window.open("https://www.linkedin.com/in/pskmehmetaker/")}><LinkedinOutlined className={styles.iconBtn} /> LinkedIn</Button>
                        <Button type="text" className={styles.mailIcon} onClick={copyToClipboard}><MailOutlined className={styles.iconBtn} /> psikolog@mehmetaker.com</Button>

                    </div>
                </Col>
                
                <Divider type="horizontal" style={{height: 'auto'}} />
                
                <Col span={24}>

                    <div style={{ position: "absolute", top: "0", width: '100%', textAlign: 'center' }}>
                        <h2 className={styles.footerTitle}>İletişim</h2>
                    </div>

                    <div 
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            width: "100%",
                            gap: '0.2rem',
                            marginTop: '4rem'
                        }}
                    >

                        <Form form={form} name="contact" layout="vertical" onFinish={onFinish} className={styles.contactForm}>
                            <Form.Item label='Adınız' name='name' rules={[{required: true, message: 'Lütfen adınızı giriniz!'}]}>
                                <Input className={styles.formInput} placeholder="Adınızı giriniz"/>
                            </Form.Item>

                            <Form.Item label='E-posta' name='email' rules={[{required: true, message: 'Lütfen e-posta adresinizi giriniz!'}, {type: 'email', message: 'Lütfen geçerli bir e-posta adresi giriniz!'}]}>
                                <Input className={styles.formInput} placeholder="E-posta adresinizi giriniz"/>
                            </Form.Item>

                            <Form.Item label='Mesaj' name='content' rules={[{required: true, message: 'Lütfen mesajınızı giriniz!'}]}>
                                <TextArea autoSize showCount maxLength={500} className={styles.formInput} rows={7} placeholder="Mesajınızı yazınız"/>
                            </Form.Item>

                            <Form.Item>
                                <Button disabled={loading} className={styles.formBtn} type="primary" htmlType="submit" loading={loading}>Gönder</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Footer>
    );
};

export default FooterComponent;