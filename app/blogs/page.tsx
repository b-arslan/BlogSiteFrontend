'use client';
import { useState, useEffect } from "react";
import { Layout, Row, Col, Button, Card, Divider } from "antd";
import { EditOutlined, InstagramOutlined, LinkedinOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from "react";
import styles from '../styles/page.module.scss';
import PSILogo from '../../public/psi.png';
import Image from "next/image";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";

const { Header, Content, Footer } = Layout;

interface Blog {
    video_url: any;
    cover_image_url: string | undefined;
    id: number;
    title: string;
    created_at: string;
    created_by: string;
    content: string;
}

export default function Blogs() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams(); // Get query params
    const blogId = searchParams.get('id'); // Get the selected blog's ID

    useEffect(() => {
        const blogData: Blog[] = JSON.parse(localStorage.getItem('blogData') || '[]');
        blogData.reverse(); // reverse the data
        setBlogs(blogData);

        if (blogId) {
            const selected = blogData.find((blog) => blog.id === Number(blogId));
            setSelectedBlog(selected || null);
        }
    }, [blogId]);

    const handleBlogSelect = (blog: Blog) => {
        setSelectedBlog(blog);
    };

    let blogText;
    let displayMenu;
    let colSpan;
    let colStyle;
    if (blogs == undefined || blogs == null || blogs.length == 0) {
        blogText = 'Blog Bulunamadı';
        displayMenu = 'none';
        colSpan = 24;
        colStyle = undefined;
    } else {
        blogText = 'Henüz Blog Seçilmedi'
        displayMenu = 'block';
        colSpan = 20;
        colStyle = styles.colBlog;
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Layout className={styles.layout}>
                <Header className={styles.header} style={{ background: "#ffffff", padding: "0px 24px", textAlign: 'center' }}>
                    <HeaderComponent />
                </Header>

                <Content className={styles.content}>
                    <Row style={{ height: '100%' }}>
                        <Col span={4} style={{ padding: '0rem 1rem', overflowY: 'auto', display: `${displayMenu}` }}>
                            {blogs.map((blog) => (
                                <Card
                                    key={blog.id}
                                    hoverable
                                    onClick={() => handleBlogSelect(blog)}
                                    style={{
                                        marginBottom: '1rem',
                                        border: selectedBlog?.id === blog.id ? '2px solid #afafaf' : 'none', // Highlight selected blog
                                        borderRadius: '12px'
                                    }}
                                >
                                    <h3>{blog.title}</h3>
                                    <p style={{ fontSize: '0.9rem', color: '#888' }}>
                                        {new Date(blog.created_at).toLocaleDateString('tr-TR', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </p>
                                </Card>
                            ))}
                        </Col>

                        <Col span={colSpan} className={colStyle}>
                            {selectedBlog ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '70%', justifyContent: 'center', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
                                        {selectedBlog.video_url ? (
                                            <video width="400" controls>
                                                <source src={selectedBlog.video_url} type="video/mp4" />
                                                Tarayıcınız bu videoyu oynatamıyor.
                                            </video>
                                        ) : (
                                            <img
                                                src={selectedBlog.cover_image_url}
                                                alt={selectedBlog.title}
                                                style={{ width: '400px', maxHeight: '400px', objectFit: 'cover', marginBottom: '1rem', borderRadius: '12px' }}
                                            />
                                        )}
                                        <h1>{selectedBlog.title}</h1>
                                        <p style={{ fontSize: '1rem', color: '#888' }}>
                                            {new Date(selectedBlog.created_at).toLocaleDateString('tr-TR', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })} - {selectedBlog.created_by}
                                        </p>
                                    </div>
                                    <div style={{ marginTop: '2rem' }} dangerouslySetInnerHTML={{ __html: selectedBlog.content }} />
                                </div>
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <h1>{blogText}</h1>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Content>

                <Footer className={styles.footer} >
                    <FooterComponent />
                </Footer>
            </Layout>
        </Suspense>
    );
};