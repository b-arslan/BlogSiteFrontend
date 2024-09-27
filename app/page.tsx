'use client';
import { useState, useEffect } from "react";
import { Layout, Row, Col, Card, Spin } from "antd";
import styles from "./styles/page.module.scss";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LoadingOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Meta } = Card;

interface Blog {
    id: number;
    title: string;
    content: string;
    created_by: string;
    cover_image_url: string;
}

const Home = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const response = await axios.get('https://blog-site-backend-ebon.vercel.app/api/blogposts');
                setBlogs(response.data.content);
                localStorage.setItem('blogData', JSON.stringify(response.data.content));
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        getBlogs();
    }, []);

    useEffect(() => {
        if (blogs.length > 0) {
            setLoading(false);
        }
    }, [blogs]);

    return (
        <Layout className={styles.layout}>
            <Content className={styles.content}>
                <Row style={{ background: "transparent", padding: "24px 0px" }}>
                    <Col span={24} style={{ textAlign: "center" }}>
                        <h2>Giriş Metni Başlık</h2>
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

                <Row style={{ width: '100%', height: '100%' }}>
                    <Col span={24} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3rem'}}>
                        <h2 style={{fontSize: '1.9em'}}>Bloglar</h2>
                    </Col>

                    {loading ? (
                        <Col span={24} style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
                            <Spin indicator={<LoadingOutlined spin style={{ fontSize: '64px', color: '#000', marginTop: '2rem' }} />} />
                        </Col>
                    ) : (
                        blogs.map((blog) => (
                            <Col key={blog.id} span={24} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem'}}>
                                <Card
                                    hoverable
                                    className='card-container'
                                    style={{ width: 300, height: 475 }}
                                    cover={
                                        <img
                                            alt={blog.title}
                                            src={blog.cover_image_url}
                                            style={{ width: 300, height: 180, objectFit: 'cover' }}
                                        />
                                    }
                                    onClick={() => router.push(`/blogs?id=${blog.id}`)}
                                >
                                    <Meta
                                        title={
                                            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                                {blog.title}
                                            </div>
                                        }
                                        description={
                                            <div
                                                style={{ color: '#000' }}
                                                dangerouslySetInnerHTML={{
                                                    __html: `${blog.content.substring(0, 247)}...`,
                                                }}
                                            />
                                        }
                                    />
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>
            </Content>
        </Layout>
    );
};

export default Home;