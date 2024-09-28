"use client";
import { useState, useEffect, useRef } from "react";
import { Form, Input, Button, message, Row, Col, Layout, Divider } from "antd";
import {
    InstagramOutlined,
    LinkedinOutlined,
    MailOutlined,
} from "@ant-design/icons";
import styles from "../styles/page.module.scss";
import emailjs from '@emailjs/browser';
import dynamic from 'next/dynamic';

const { Footer } = Layout;
const { TextArea } = Input;

const LeafletMap = dynamic(() => import('./LeafletMap'), { ssr: false });

const FooterComponent = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {

        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setIsMobileView(window.innerWidth < 1024);
            };
    
            window.addEventListener("resize", handleResize);
            handleResize();
    
            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }

    }, []);

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
                    name: values.name,
                    email: values.email,
                    message: values.content,
                    emailTo: 'psikolog@mehmetaker.com',
                    reply_to: values.email
                },
                `${process.env.EMAILJS_PUBLIC_KEY}`       // Public Key
            ).then(
                (result) => {
                    message.success('Mesaj başarıyla gönderildi!');
                    form.resetFields();
                    setLoading(false);
                },
                (error) => {
                    message.error('Mesaj gönderilemedi.');
                    console.log('FAILED...', error.text);
                    setLoading(false);
                }
            );
        } catch (err) {
            message.error('Bir hata oluştu. Lütfen tekrar deneyin.');
            setLoading(false);
        }
    };

    return (
        <Footer id="footer-component" className={styles.footer}>
            <Row style={{height: '100%'}}>

                <Col span={24}>
                
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center', gap: '1.5rem'}}>

                        <h2 style={{fontSize: '24px'}}>Sosyal</h2>

                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Button type="text" className={styles.instagram} onClick={() => window.open("https://www.instagram.com/psikolog.mehmetaker/")}><InstagramOutlined className={styles.iconBtn} /> Instagram</Button>
                            <Button type="text" className={styles.linkedin} onClick={() => window.open("https://www.linkedin.com/in/pskmehmetaker/")}><LinkedinOutlined className={styles.iconBtn} /> LinkedIn</Button>
                            <Button type="text" className={styles.mailIcon} onClick={copyToClipboard}><MailOutlined className={styles.iconBtn} /> psikolog@mehmetaker.com</Button>  
                        </div>
                        </div>
                    </div>

                </Col>

                <Divider type="horizontal"/>

                <Col span={24} className={styles.footerCol}>
                
                    <div className={styles.adresDiv}>

                        <div className={styles.adresHeaderDiv}>
                            <div className={styles.adresHeaderTextDiv}>
                                <h2 style={{fontSize: '24px'}}>Adres</h2>
                                <p style={{fontSize: '18px'}}>Melikşah, Melikşah Cd. No:9 D:3, 42090 Meram/Konya</p>
                            </div>
                        </div>

                        <LeafletMap />
                    </div>

                    <Divider type={isMobileView ? 'horizontal' : 'vertical'} style={{height: '100%'}} />

                    <div className={styles.iletisimDiv}>

                        <div className={styles.iletisimHeaderDiv}>
                            <div className={styles.iletisimHeaderTextDiv}>
                                <h2 style={{fontSize: '24px'}}>İletişim</h2>
                                <p style={{fontSize: '18px'}}>Bana ulaşın</p>
                            </div>
                        </div>

                        <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
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
                                    <Button className={styles.formBtn} type="primary" htmlType="submit" loading={loading}>Gönder</Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Footer>
    );
};

export default FooterComponent;