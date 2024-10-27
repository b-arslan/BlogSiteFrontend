'use client';
import { useState, useEffect } from "react";
import { Layout, Row, Col, Card, Button } from "antd";
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from "react";
import styles from '../styles/page.module.scss';
import axios from "axios";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from 'uuid';

const { Content } = Layout;

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
    const [isMobileView, setIsMobileView] = useState(false); // Ekran genişliğini takip etmek için
    const router = useRouter();
    const searchParams = useSearchParams(); // Sorgu parametrelerini almak için
    const blogId = searchParams.get('id'); // Seçili blogun ID'si

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

        const trackVisitors = async (param?: any) => {
            try {
                let visitorId = localStorage.getItem('aker_visitor_id');
        
                if (!visitorId) {
                    visitorId = uuidv4();
                    localStorage.setItem('aker_visitor_id', visitorId);
                }
        
                const response = await axios.post('/api/view', {
                    visitor: param ? param : visitorId
                });
        
                console.log('Tracking successful:', response.data);
            } catch (error) {
                console.error('Error tracking visitor:', error);
            }
        };

        trackVisitors();
    }, []);

    useEffect(() => {
        const blogDataString = localStorage.getItem('blogData');
        
        if (blogDataString) {
            const blogData: Blog[] = JSON.parse(blogDataString);
            //blogData.reverse(); // Verileri ters çevir
            setBlogs(blogData);
    
            if (blogId) {
                const selected = blogData.find((blog) => blog.id === Number(blogId));
                setSelectedBlog(selected || null);
            }
        }
    }, [blogId]);

    useEffect(() => {
        if (blogs.length === 0) {
            const getBlogs = async () => {
                try {
                    const response = await axios.get('/api/blogposts');
                    setBlogs(response.data.content);
                    localStorage.setItem('blogData', JSON.stringify(response.data.content));
                } catch (error) {
                    console.error('Error fetching blogs:', error);
                }
            };
    
            getBlogs();
        }
    }, [blogs]);

    const handleBlogSelect = (blog: Blog) => {
        setSelectedBlog(blog);
    };

    const handleBackToList = () => {
        setSelectedBlog(null);
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
        blogText = 'Henüz Blog Seçilmedi';
        displayMenu = 'block';
        colSpan = 20;
        colStyle = styles.colBlog;
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Layout className={styles.layout}>
                <Content className={styles.content} style={{gap: isMobileView ? '0' : '5rem', padding: isMobileView ? '12px 12px' : '48px 12px', alignItems: isMobileView ? 'flex-start' : 'center'}}>
                    {/* Geri Dön Butonu için ayrı bir Row ve Col */}
                    {isMobileView && selectedBlog && (
                        <Row>
                            <Col span={24} style={{padding: '0px 0px 12px 0px'}}>
                                <Button type="text" onClick={handleBackToList} className={styles.btn} style={{border: '2px solid #c1c1c1', borderRadius: '7px'}}>
                                    <ArrowLeftOutlined /> Bloglar
                                </Button>
                            </Col>
                        </Row>
                    )}
                    <Row style={{ height: '100%', width: '100%' }}>
                        {(!isMobileView || (isMobileView && selectedBlog == null)) && (
                            <Col
                                span={isMobileView ? 24 : 4} // Mobilde tam genişlik, desktopta 4 sütun
                                style={{ padding: '0rem 1rem', overflowY: 'auto', display: displayMenu }}
                            >
                                {blogs.map((blog) => (
                                    <Card
                                        key={blog.id}
                                        hoverable
                                        onClick={() => handleBlogSelect(blog)}
                                        style={{
                                            marginBottom: '1rem',
                                            border: selectedBlog?.id === blog.id ? '2px solid #afafaf' : 'none',
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
                        )}

                        {(!isMobileView || (isMobileView && selectedBlog != null)) && (
                            <Col
                                span={isMobileView ? 24 : colSpan} // Mobilde tam genişlik
                                className={colStyle}
                            >
                                {selectedBlog ? (
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '1rem',
                                            width: '90%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
                                            {selectedBlog.video_url ? (
                                                <video width={isMobileView ? "350" : "400"} controls>
                                                    <source src={selectedBlog.video_url} type="video/mp4" />
                                                    Tarayıcınız bu videoyu oynatamıyor.
                                                </video>
                                            ) : (
                                                <img
                                                    src={selectedBlog.cover_image_url}
                                                    alt={selectedBlog.title}
                                                    style={{
                                                        width: isMobileView ? '99%' : '400px', // Mobilde resim genişliği azaltıldı
                                                        maxHeight: '400px',
                                                        objectFit: 'cover',
                                                        marginBottom: '1rem',
                                                        borderRadius: '12px'
                                                    }}
                                                />
                                            )}
                                            <h1 style={{textAlign: 'center'}}>{selectedBlog.title}</h1>
                                            <p style={{ fontSize: '1rem', color: '#888' }}>
                                                {new Date(selectedBlog.created_at).toLocaleDateString('tr-TR', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })} - {selectedBlog.created_by}
                                            </p>
                                        </div>
                                        <div style={{ marginTop: '2rem', textAlign: isMobileView ? 'left' : 'justify' }} dangerouslySetInnerHTML={{ __html: selectedBlog.content }} />
                                    </div>
                                ) : (
                                    !isMobileView && (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <h1>{blogText}</h1>
                                        </div>
                                    )
                                )}
                            </Col>
                        )}
                    </Row>
                </Content>
            </Layout>
        </Suspense>
    );
};
