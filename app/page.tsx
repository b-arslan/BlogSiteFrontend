'use client';
import { useState, useEffect, useRef, useCallback } from "react";
import { Layout, Row, Col, Card, Spin } from "antd";
import styles from "./styles/page.module.scss";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LoadingOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from 'uuid';

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
    const [contentLimits, setContentLimits] = useState<{ [key: number]: number }>({});
    const router = useRouter();

    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const setCardRef = useCallback((node: HTMLDivElement | null, index: number) => {
        if (node && !contentLimits[index]) { // Eğer limit önceden ayarlanmadıysa sadece o zaman hesapla
            const cardHeight = node.offsetHeight;
            const titleHeight = 60; // Kart başlığı için sabit yükseklik (yaklaşık)
            const imageHeight = 180; // Karttaki resmin sabit yüksekliği
            const padding = 32; // Kartın iç boşlukları (padding) toplamı
            const availableHeight = cardHeight - titleHeight - imageHeight - padding;

            // Her kelimenin ortalama yüksekliği 18px civarında olabilir (font-size ve line-height'a göre)
            const wordsPerLine = Math.floor(availableHeight / 14);

            setContentLimits((prev) => ({
                ...prev,
                [index]: wordsPerLine
            }));
        }
    }, [contentLimits]);

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const response = await axios.get('/api/blogposts');
                setBlogs(response.data.content);
                localStorage.setItem('blogData', JSON.stringify(response.data.content));
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

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

        getBlogs();
        trackVisitors();
    }, []);

    useEffect(() => {
        if (blogs.length > 0) {
            setLoading(false);
        }
    }, [blogs]);

    const truncateByWords = (content: string, maxWords: number) => {
        const wordsArray = content.split(' ');
        if (wordsArray.length > maxWords) {
            return wordsArray.slice(0, maxWords).join(' ') + '...';
        }
        return content;
    };

    return (
        <Layout className={styles.layout}>
            <Content className={styles.content}>
                <Row style={{ width: '100%', height: '100%' }}>
                    <Col span={24} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '2rem'}}>
                        <h2 style={{fontSize: '1.9em'}}>Bloglar</h2>
                    </Col>

                    {loading ? (
                        <Col span={24} style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
                            <Spin indicator={<LoadingOutlined spin style={{ fontSize: '64px', color: '#000', marginTop: '2rem' }} />} />
                        </Col>
                    ) : (
                        <Col span={24} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5rem', flexWrap: 'wrap'}}>
                            {blogs.map((blog, index) => (
                                <Card
                                    key={blog.id}
                                    hoverable
                                    ref={(node) => setCardRef(node, index)} // Her kart için referans belirliyoruz
                                    className='card-container'
                                    style={{ width: 300, height: 500 }}
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
                                            <div style={{ fontSize: '24px', fontWeight: 'bold', whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                                {blog.title}
                                            </div>
                                        }
                                        description={
                                            <div
                                                style={{ color: '#000' }}
                                                dangerouslySetInnerHTML={{
                                                    __html: truncateByWords(blog.content, contentLimits[index] || 0), // İçerik kelime sınırı
                                                }}
                                            />
                                        }
                                    />
                                </Card>
                            ))}
                        </Col>
                    )}
                </Row>
            </Content>
        </Layout>
    );
};

export default Home;