"use client";
import { useState, useEffect } from "react";
import HeaderComponent from "./components/HeaderComponent";
import styles from "./styles/page.module.scss";
import { Layout, Button, Row, Col, Card } from "antd";
import ReactPlayer from "react-player";
import { fetchBlogs } from "./api/getBlogs";
import { EditOutlined, UserOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
const { Meta } = Card;

interface Blog {
    id: number;
    title: string;
    content: string;
    created_by: string;
}

const Home = () => {

    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {

        const getBlogs = async () => {
            const response = await fetchBlogs();
            setBlogs(response);
            console.log(blogs);
        }

        try {
            getBlogs();
        } catch (error) {
            console.error(error);
        }

    }, []);

    return (
        <Layout className={styles.layout}>
            <Header style={{ background: "#ffffff", padding: "0px 24px", height: '8vh', textAlign: 'center'}}>
                <Row style={{height: '100%'}}>
                    <Col span={12} className={styles.headerCol1}>
                        <h1 style={{color: '#111827'}}>Mehmet Aker</h1>

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
                        <h1>Giris Metni Baslik</h1>
                    </Col>

                    <Col span={24} style={{ textAlign: "center" }}>
                        <h3 style={{ margin: "2rem" }}>
                            Kisa onsoz
                        </h3>
                    </Col>

                    <Col span={24} style={{ textAlign: "center" }}>
                        <p style={{ margin: "1rem" }}>
                            ACIKLAMA: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, dicta eaque ad officia quasi similique possimus pariatur, quod quas at blanditiis reiciendis. Doloribus pariatur dignissimos dolor vel, corrupti autem accusamus!
                        </p>
                    </Col>
                </Row>

                <Row style={{ justifyContent: 'center', display: 'flex', gap: '2rem', marginTop: '2rem' }}>
                    {blogs.map((blog) => (
                        <Col key={blog.id}>
                            <Card
                                hoverable
                                className='card-container'
                                cover={<img alt={blog.created_by} />}
                            >
                                <Meta className='card-meta' title={blog.title} description={blog.content} />
                            </Card>
                        </Col>
                    ))}
                </Row>
                {/* <ReactPlayer url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" controls={true} /> */}
            </Content>
        </Layout>
    );
};

export default Home;
