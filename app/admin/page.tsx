'use client';
import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button, Layout, Row, Col, Spin, Alert, message, Card, Statistic } from "antd";
import {
    FileWordOutlined,
    PictureOutlined,
    CloseOutlined,
    LoadingOutlined
} from '@ant-design/icons';
import styles from '../styles/admin.module.scss'; // Dark mode CSS'leri buraya ekleyeceğiz

const { Content, Header } = Layout;

const Admin = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [uploadedImageName, setUploadedImageName] = useState<string | null>(null);
    const [uploadedWordDocName, setUploadedWordDocName] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const wordInputRef = useRef<HTMLInputElement>(null);
    const [isAuthorized, setIsAuthorized] = useState(true);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [totalViews, setTotalViews] = useState(0);
    const [totalVisitor, setTotalVisitor] = useState(0);
    const router = useRouter();

    useEffect(() => {

        const getViews = async () => {
            try {
        
                const response = await axios.get('/api/getViews');
                
                if (response.data.success) {
                    let datas: any[] = response.data.content;
                    let totalView: number = 0;
                    let totalVisitor: number = 0;
                    datas.forEach(item => {
                        if (item.view) {
                            totalView += item.view;
                        }
                        totalVisitor += 1;
                    })
                    setTotalViews(totalView);
                    setTotalVisitor(totalVisitor);
                }
                console.log('Tracking successful:', response.data);
            } catch (error) {
                console.error('Error tracking visitor:', error);
            }
        }

        getViews();

        // Hide header and footer on admin page
        const header = document.getElementById('header-component');
        debugger
        setTimeout(() => {
            const footer = document.getElementById('footer-component');
            if (footer) footer.style.display = 'none';
            if (header) header.style.display = 'none';
            return () => {
                if (footer) footer.style.display = 'block';
                if (header) header.style.display = 'block';
            };
        }, 50);

    }, []);

    useEffect(() => {
        const token = localStorage.getItem('akerToken');
        const tokenExpiry = localStorage.getItem('akerTokenExpiry');

        // If no token or token expiry is found, redirect to login page
        if (!token || !tokenExpiry) {
            router.push('/auth');
            return;
        }

        // Check if the token matches (for example, assuming 'sampleAuthToken')
        const isTokenValid = token === 'Authorized'; // Adjust this to your real logic
        if (!isTokenValid) {
            router.push('/auth');
            return;
        }

        // Check if token has expired
        const currentTime = new Date().getTime();
        if (currentTime > Number(tokenExpiry)) {
            localStorage.removeItem('token'); // Clear expired token
            localStorage.removeItem('tokenExpiry');
            router.push('/auth');
        } else {
            setIsAuthorized(true); // Allow access if token is valid and not expired
        }
    }, [router]);

    const handleCoverImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedImageName(file.name); // Just store the image locally
        }
    };

    const handleWordUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploadedWordDocName(file.name); // Store the Word document name locally
    };

    const handleWordRemove = () => {
        setUploadedWordDocName(null); // Remove the Word document
    };

    const handleImageRemove = () => {
        setUploadedImageName(null);
    };

    const handleSubmit = async () => {
        setLoadingBtn(true);
        const formData = new FormData();
        
        // If a Word document is uploaded, append it to the formData
        if (wordInputRef.current?.files?.[0]) {
            formData.append('wordFile', wordInputRef.current.files[0]);
        } else {
            message.error("Lütfen bir Word dosyası yükleyin.");
            setLoadingBtn(false);
            return;
        }

        // Add the cover image to the blog post API request if present
        if (fileInputRef.current?.files?.[0]) {
            formData.append('coverImage', fileInputRef.current.files[0]);
        }

        try {
            // Use the wordBlog endpoint to submit the document
            const endpoint = '/api/wordBlog';

            const res = await axios.post(endpoint, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 5000);
            setUploadedImageName(null);
            setUploadedWordDocName(null);
            setLoadingBtn(false);
        } catch (error) {
            console.error('Error posting blog:', error);
            setShowError(true);
            setTimeout(() => setShowError(false), 5000);
            setLoadingBtn(false);
        }
    };
    
    if (!isAuthorized) {
        return (
            <Row>
                <Col span={24} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                    <Spin indicator={<LoadingOutlined spin style={{ fontSize: '64px', color: '#000', marginTop: '2rem' }} />} />
                </Col>
            </Row>
        );
    }

    return (
        <Layout style={{ height: '100vh', display: 'flex', flexDirection: 'column' }} className={darkMode ? styles.darkMode : ''}>
            <Header style={{background: 'transparent', borderBottom: '2px solid #c1c1c1', height: '15vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Row>
                    <Col span={24} style={{textAlign: 'center'}}>
                        <h1>Blog Editör</h1>
                    </Col>
                </Row>
            </Header>

            <Content className={darkMode ? styles.darkMode : ''} style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: '5rem', padding: '24px', height: '85vh' }}>

                <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Col className={styles.adminBox} span={24} >
                        <div style={{position: 'absolute', top: '0', width: '100%', textAlign: 'center', padding: '16px 16px'}}>
                            <h3>Toplam Görüntülenme: {totalViews}</h3>
                            <h3 style={{marginTop: '0.5rem'}}>Toplam Ziyaretçi: {totalVisitor}</h3>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                            {/* Middle Section with Buttons */}
                            <div className={styles.secondDiv} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Button
                                icon={<PictureOutlined />}
                                onClick={() => fileInputRef.current?.click()}
                                style={{ fontSize: '16px' }}
                                disabled={!!uploadedImageName}
                            >
                                Kapak Fotoğrafı Yükle
                            </Button>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleCoverImageUpload}
                            />
            
                            {uploadedImageName && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span>{uploadedImageName}</span>
                                <CloseOutlined onClick={handleImageRemove} style={{ cursor: 'pointer', color: 'red' }} />
                                </div>
                            )}
                            </div>
            
                            <div className={styles.secondDiv} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Button
                                icon={<FileWordOutlined />}
                                onClick={() => wordInputRef.current?.click()}
                                style={{ fontSize: '16px' }}
                                disabled={!!uploadedWordDocName}
                            >
                                Word Dosyası Yükle
                            </Button>
                            <input
                                type="file"
                                accept=".doc,.docx"
                                ref={wordInputRef}
                                style={{ display: 'none' }}
                                onChange={handleWordUpload}
                            />
            
                            {uploadedWordDocName && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span>{uploadedWordDocName}</span>
                                <CloseOutlined onClick={handleWordRemove} style={{ cursor: 'pointer', color: 'red' }} />
                                </div>
                            )}
                            </div>
                        </div>
            
                        {/* Footer Section */}
                        <div style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', padding: '16px 36px' }}>
                            <Button onClick={handleSubmit} loading={loadingBtn} style={{ width: '100%', background: darkMode ? '#555' : '#1890ff', color: darkMode ? '#fff' : '#fff' }}>Kaydet</Button>
                        </div>

                    </Col>
                </Row>
        
                {/* Alerts outside the Card, positioned at the top-right corner */}
                {showSuccess && (
                <Alert message="İşlem Başarılı!" type="success" style={{ position: 'fixed', top: '1rem', right: '1rem', width: '350px' }} />
                )}
                {showError && (
                <Alert message="İşlem Başarısız!" type="error" style={{ position: 'fixed', top: '1rem', right: '1rem', width: '350px' }} />
                )}
            </Content>
        </Layout>
    );
};

export default Admin;