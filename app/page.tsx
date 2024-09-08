'use client';
import { useState, useEffect } from "react";
import { Layout, Button, Row, Col, Card } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./styles/page.module.scss";
import axios from "axios"; // Assuming axios is used for API calls
import { useRouter } from "next/navigation";
import PSILogo from '../public/psi.png';
import Image from "next/image";

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
    const router = useRouter();

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const response = await axios.get('https://blog-site-backend-ebon.vercel.app/api/blogposts'); // Call your GET API here
                setBlogs(response.data.content); // Assuming API returns 'content' field with blogs array
                localStorage.setItem('blogData', JSON.stringify(response.data.content));
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        getBlogs();
    }, []);

    const handleBlogClick = (blog: Blog) => {
        localStorage.setItem('selectedBlogId', blog.id.toString()); // Store selected blog ID in localStorage
        router.push('/blogs'); // Navigate to the blogs page
    };

    return (
        <Layout className={styles.layout}>
            <Header style={{ background: "#ffffff", padding: "0px 24px", height: '8vh', textAlign: 'center' }}>
                <Row style={{ height: '100%' }}>
                    <Col span={12} className={styles.headerCol1}>
                        <h1 style={{ color: '#111827', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => router.push('/')}><Image style={{marginRight: '12px'}} width={40} src={PSILogo} alt='psi logo'/>Psikolog Mehmet Aker</h1>
                    </Col>

                    <Col span={12} className={styles.headerCol2}>
                        <Button href="/blogs" type='text' className={styles.btn}><EditOutlined /> Blog</Button>
                        <Button href="/about" type='text' className={styles.btn}><UserOutlined /> Hakkımda</Button>
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
                                style={{ width: 300, height: 475 }} // Fixed card size
                                cover={
                                    <img
                                        alt={blog.title}
                                        src={blog.cover_image_url}
                                        style={{ width: 300, height: 180, objectFit: 'cover' }} // 40% height for the image
                                    />
                                }
                                onClick={() => router.push(`/blogs?id=${blog.id}`)}
                            >
                                <Meta
                                    title={
                                        <div style={{ fontSize: '24px', fontWeight: 'bold' }}> {/* Set title font size */}
                                            {blog.title}
                                        </div>
                                    }
                                    description={
                                        <div
                                            style={{ color: '#000' }}
                                            dangerouslySetInnerHTML={{
                                                __html: `${blog.content.substring(0, 150)}...`, // Add ellipsis after 150 characters
                                            }}
                                        />
                                    } // Render HTML content safely
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