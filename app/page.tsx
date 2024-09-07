'use client';
import { useState, useEffect } from "react";
import { Layout, Button, Row, Col, Card } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./styles/page.module.scss";
import axios from "axios"; // Assuming axios is used for API calls

const { Header, Content } = Layout;
const { Meta } = Card;

interface Blog {
    id: number;
    title: string;
    content: string;
    created_by: string;
    cover_image_url: string; // Assuming this is the field for the image URL
}

const Home = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const response = await axios.get('https://blog-site-backend-ebon.vercel.app/api/blogposts'); // Call your GET API here
                setBlogs(response.data.content); // Assuming API returns 'content' field with blogs array
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        getBlogs();
    }, []);

    return (
        <Layout className={styles.layout}>
            <Header style={{ background: "#ffffff", padding: "0px 24px", height: '8vh', textAlign: 'center' }}>
                <Row style={{ height: '100%' }}>
                    <Col span={12} className={styles.headerCol1}>
                        <h1 style={{ color: '#111827' }}>Mehmet Aker</h1>
                    </Col>

                    <Col span={12} className={styles.headerCol2}>
                        <Button type='text' className={styles.btn}><EditOutlined /> Blog</Button>
                        <Button type='text' className={styles.btn}><UserOutlined /> Hakkımda</Button>
                    </Col>
                </Row>
            </Header>

            <Content className={styles.content}>
                <Row style={{ background: "transparent", padding: "24px 0px" }}>
                    <Col span={24} style={{ textAlign: "center" }}>
                        <h1>Giriş Metni Başlık</h1>
                    </Col>

                    <Col span={24} style={{ textAlign: "center" }}>
                        <h3 style={{ margin: "2rem" }}>Kısa önsöz</h3>
                    </Col>

                    <Col span={24} style={{ textAlign: "center" }}>
                        <p style={{ margin: "1rem" }}>
                            AÇIKLAMA: Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        </p>
                    </Col>
                </Row>

                <Row style={{ justifyContent: 'center', display: 'flex', gap: '2rem', marginTop: '2rem' }}>
                    {blogs.map((blog) => (
                        <Col key={blog.id}>
                            <Card
                                hoverable
                                className='card-container'
                                style={{ width: 300, height: 350 }} // Fixed card size
                                cover={
                                    <img
                                        alt={blog.title}
                                        src={blog.cover_image_url}
                                        style={{ width: 300, height: 150, objectFit: 'cover' }} // Fixed image size
                                    />
                                }
                            >
                                <Meta
                                    title={blog.title}
                                    description={
                                        typeof blog.content === 'string'
                                            ? `${blog.content.substring(0, 100)}...` // Shortened to fit space
                                            : 'Content not available'
                                    }
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>

            </Content>
        </Layout>
    );
};

export default Home;