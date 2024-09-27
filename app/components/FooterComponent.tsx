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
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const { Footer } = Layout;
const { TextArea } = Input;

const FooterComponent = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);

    useEffect(() => {
        const coordinates: L.LatLngExpression = [37.86994421452708, 32.474147158457434]; // Coordinates for Konya I&G Danışmanlık
    
        if (!mapInstanceRef.current && mapContainerRef.current) {
          const map = L.map(mapContainerRef.current).setView(coordinates, 13); // Center map on Konya I&G Danışmanlık
    
          // Use Stadia Maps tiles for a more modern look
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(map);  
    
          // Custom marker icon resembling Google Maps pin
          const customIcon = L.icon({
            iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/1200px-Map_marker.svg.png', // Apple Maps-like pin,
            iconSize: [25, 40], // Size of the icon
            iconAnchor: [13, 40], // Point of the icon which will correspond to marker's location
            popupAnchor: [0, -40] // Point from which the popup should open relative to the iconAnchor
          });
    
          // Add a custom marker at Konya I&G Danışmanlık location
          L.marker(coordinates, { icon: customIcon }).addTo(map)
            .bindPopup('İ&G Danışmanlık') // Customize the popup text
            .openPopup(); // Popup will be open by default
    
          mapInstanceRef.current = map; // Store the map instance in the ref
        }
    
        return () => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.remove();
            mapInstanceRef.current = null;
          }
        };
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
                <Col span={24} style={{marginTop: '2rem'}} className={styles.footerCol}>
                
                    <div style={{width: '49%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexDirection: 'column'}}>

                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '3rem'}}>
                            <div style={{textAlign: 'center', display: 'flex', gap: '1.5rem', flexDirection: 'column'}}>
                                <h2 style={{fontSize: '24px'}}>Adres</h2>
                                <p style={{fontSize: '16px'}}>Melikşah, Melikşah Cd. No:9 D:3, 42090 Meram/Konya</p>
                            </div>
                        </div>

                        <div ref={mapContainerRef} id="map" style={{ width: '80%', height: '350px', border: '2px solid #c1c1c1', borderRadius: '12px' }} />
                    </div>

                    <Divider type="vertical" style={{height: '100%'}} />

                    <div style={{width: '49%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem'}}>

                        <div  style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '3rem'}}>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1.5rem'}}>
                                <h2 style={{fontSize: '24px'}}>İletişim</h2>
                                <p style={{fontSize: '16px'}}>Bana ulaşın</p>
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