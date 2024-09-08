'use client';
import { useState, useEffect } from "react";
import { Layout, Row, Col, Button, Card, Divider } from "antd";
import { EditOutlined, InstagramOutlined, LinkedinOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from "react";
import styles from '../styles/page.module.scss';
import PSILogo from '../../public/psi.png';
import Image from "next/image";

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

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Layout className={styles.layout}>
                <Header style={{ background: "#ffffff", padding: "0px 24px", height: '8vh', textAlign: 'center' }}>
                    <Row style={{ height: '100%' }}>
                        <Col span={12} className={styles.headerCol1}>
                            <h1 style={{ color: '#111827', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => router.push('/')}><Image style={{marginRight: '12px'}} width={40} src={PSILogo} alt='psi logo'/>Psikolog Mehmet Aker</h1>                        </Col>

                        <Col span={12} className={styles.headerCol2}>
                            <Button href="/blogs" type='text' className={styles.btn}><EditOutlined /> Blog</Button>
                            <Button href="/about" type='text' className={styles.btn}><UserOutlined /> Hakkımda</Button>
                        </Col>
                    </Row>
                </Header>

                <Content className={styles.content}>
                    <Row style={{ height: '100%' }}>
                        <Col span={4} style={{ padding: '0rem 1rem', overflowY: 'auto' }}>
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

                        <Col span={20} className={styles.colBlog}>
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
                                    <h1>Herhangi Bir Blog Seçilmedi...</h1>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Content>

                <Footer style={{background: '#fff', height: '8vh'}}>
                    <Row>
                        <Col span={12} style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '3rem', paddingBottom: '1rem'}}>
                            <InstagramOutlined className={styles.instagram} onClick={() => window.open('https://www.instagram.com/psikolog.mehmetaker/')} />
                            <LinkedinOutlined className={styles.linkedin} onClick={() => window.open('https://www.linkedin.com/in/pskmehmetaker/')}/>
                        </Col>
                        <Col span={12} style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '3rem', paddingBottom: '1rem'}}>
                            <p style={{fontSize: '20px', fontWeight: '600', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'}}><MailOutlined className={styles.mailIcon}/>psikolog@mehmetaker.com</p>
                        </Col>
                    </Row>
                </Footer>
            </Layout>
        </Suspense>
    );
};