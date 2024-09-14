'use client';
import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import { Card, Tooltip, Menu, Dropdown, Button, Switch, Layout, Row, Col, Spin, Alert, Input, message } from "antd";
import {
    BoldOutlined,
    ItalicOutlined,
    UnderlineOutlined,
    UnorderedListOutlined,
    OrderedListOutlined,
    AlignLeftOutlined,
    AlignCenterOutlined,
    AlignRightOutlined,
    LinkOutlined,
    PictureOutlined,
    HddOutlined,
    LoadingOutlined,
    CloseOutlined,
    VideoCameraOutlined
} from '@ant-design/icons';
import { EditorContent, useEditor } from "@tiptap/react";
import styles from '../styles/admin.module.scss'; // Dark mode CSS'leri buraya ekleyeceğiz

const { Content } = Layout;

const Admin = () => {

    const [darkMode, setDarkMode] = useState(false);
    const [uploadedImageName, setUploadedImageName] = useState<string | null>(null);
    const [uploadedVideoName, setUploadedVideoName] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef2 = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [title, setTitle] = useState('');
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const tokenExpiry = localStorage.getItem('tokenExpiry');

        // If no token or token expiry is found, redirect to login page
        if (!token || !tokenExpiry) {
            router.push('/auth');
            return;
        }

        // 2. Check if the token matches (for example, assuming 'sampleAuthToken')
        const isTokenValid = token === 'Authorized'; // Adjust this to your real logic
        if (!isTokenValid) {
            router.push('/auth');
            return;
        }

        // 3. Check if token has expired
        const currentTime = new Date().getTime();
        if (currentTime > Number(tokenExpiry)) {
            localStorage.removeItem('token'); // Clear expired token
            localStorage.removeItem('tokenExpiry');
            router.push('/auth');
        } else {
            setIsAuthorized(true); // Allow access if token is valid and not expired
        }
    }, [router]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph']
            }),
            Heading.configure({
                levels: [1, 2, 3]
            }),
            Image
        ],
        content: '<p>Yazmaya başla...</p>'
    });

    if (!isAuthorized) {
        return (
            <Row>
                <Col span={24} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                    <Spin indicator={<LoadingOutlined spin style={{ fontSize: '64px', color: '#000', marginTop: '2rem' }} />} />
                </Col>
            </Row>
        );
    }

    const handleCoverImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedImageName(file.name); // Just store the image locally
        }
    };
    

    //const fileInputRef = useRef<HTMLInputElement>(null);
    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            message.error("No file selected.");
            return;
        }
    
        const formData = new FormData();
        formData.append("image", file);
    
        try {
            const response = await axios.post('/api/upload-image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
    
            const imageUrl = response.data.url;
    
            // Insert image URL into the editor
            editor?.chain().focus().setImage({ src: imageUrl }).run();
            message.success("Image uploaded and inserted into content!");
    
        } catch (error) {
            console.error("Image upload error:", error);
            message.error("Image upload failed.");
        }
    };

    // const handleVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = event.target.files?.[0];
    //     if (file) setUploadedVideoName(file.name);
    // };

    const handleImageRemove = () => {
        // Yüklenen fotoğraf temizlenir
        setUploadedImageName(null);
        // Editördeki içeriği temizlemek gerekmiyor, çünkü fotoğraf editor'e eklenmiyor
    };

    if (!editor) {
        return null;
    }

    const TitleOnChange = (e: any) => {
        setTitle(e.target.value);
        console.log(e.target.value);
    }

    const handleSubmit = async () => {
        setLoadingBtn(true);
        const content = editor?.getHTML();
        const formData = new FormData();
    
        formData.append('title', title || '');
        formData.append('author', 'Mehmet Aker');
        formData.append('content', content || '');
    
        // Add the cover image to the blog post API request
        if (fileInputRef.current?.files?.[0]) {
            formData.append('coverImage', fileInputRef.current.files[0]); // Now it's only sent with the blog post
        }
    
        try {
            const res = await axios.post('/api/blog', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 5000);
            setTitle('');
            setUploadedImageName(null);
            editor?.commands.clearContent();
            setLoadingBtn(false);
        } catch (error) {
            console.error('Error posting blog:', error);
            setShowError(true);
            setTimeout(() => setShowError(false), 5000);
            setLoadingBtn(false);
        }
    };
    

    return (

        <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }} className={darkMode ? styles.darkMode : ''}>
            <Content className={darkMode ? styles.darkMode : ''} style={{ flexGrow: 1 }}>
                <Row>
                    <Col span={24}>
                        <Card title={<span style={{ color: darkMode ? '#fff' : '#000' }}>Blog Editör</span>} style={{ width: '100%', display: 'flex', flexDirection: 'column' }} className={darkMode ? styles.darkMode : ''}>
                            <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>

                                {showSuccess && (
                                    <Alert message="İşlem Başarılı!" type="success" style={{ position: 'fixed', top: '0', right: '0', width: '350px' }} />
                                )}
                                {showError && (
                                    <Alert message="İşlem Başarısız!" type="error" style={{ position: 'fixed', top: '0', right: '0', width: '350px' }} />
                                )}

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <Button
                                        icon={<PictureOutlined />}
                                        onClick={() => fileInputRef2.current?.click()}
                                        style={{ fontSize: '16px' }}
                                        disabled={!!uploadedImageName} // Yüklenmiş bir kapak fotoğrafı varsa buton devre dışı bırakılır
                                    >
                                        Kapak Fotoğrafı Yükle
                                    </Button>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={fileInputRef2}
                                        style={{ display: 'none' }}
                                        onChange={handleCoverImageUpload}
                                    />

                                    {/* Resim yüklendiyse adı ve silme ikonu gösterilir */}
                                    {uploadedImageName && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span>{uploadedImageName}</span>
                                            <CloseOutlined onClick={handleImageRemove} style={{ cursor: 'pointer', color: 'red' }} />
                                        </div>
                                    )}

                                    {/* <Button icon={<VideoCameraOutlined />} onClick={() => videoInputRef.current?.click()} disabled={!!uploadedVideoName}>
                                        Video Ekle
                                    </Button>
                                    <input type="file" accept="video/*" ref={videoInputRef} style={{ display: 'none' }} onChange={handleVideoUpload} />
                                    {uploadedVideoName && <span>{uploadedVideoName} <CloseOutlined onClick={() => setUploadedVideoName(null)} /></span>} */}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <p style={{ width: '140px', marginRight: '2px' }}>Blog Başlığı</p>
                                    <Input placeholder="Başlık" onChange={TitleOnChange} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', height: '100%' }}>
                                <div style={{ display: 'flex', gap: '10px', height: '100%' }}>
                                    <Tooltip title="Kalın">
                                        <BoldOutlined onClick={() => editor.chain().focus().toggleBold().run()} style={{ fontSize: '16px', cursor: 'pointer' }} />
                                    </Tooltip>
                                    <Tooltip title='İtalik'>
                                        <ItalicOutlined onClick={() => editor.chain().focus().toggleItalic().run()} style={{ fontSize: '16px', cursor: 'pointer' }} />
                                    </Tooltip>
                                    <Tooltip title='Altı Çizili'>
                                        <UnderlineOutlined onClick={() => editor.chain().focus().toggleItalic().run()} style={{ fontSize: '16px', cursor: 'pointer' }} />
                                    </Tooltip>
                                    <Tooltip title='Madde İşaretleri'>
                                        <UnorderedListOutlined onClick={() => editor.chain().focus().toggleItalic().run()} style={{ fontSize: '16px', cursor: 'pointer' }} />
                                    </Tooltip>
                                    <Tooltip title='Numaralı Liste'>
                                        <OrderedListOutlined onClick={() => editor.chain().focus().toggleItalic().run()} style={{ fontSize: '16px', cursor: 'pointer' }} />
                                    </Tooltip>
                                    <Tooltip title='Sola Hizala'>
                                        <AlignLeftOutlined onClick={() => editor.chain().focus().toggleItalic().run()} style={{ fontSize: '16px', cursor: 'pointer' }} />
                                    </Tooltip>
                                    <Tooltip title='Ortala'>
                                        <AlignCenterOutlined onClick={() => editor.chain().focus().toggleItalic().run()} style={{ fontSize: '16px', cursor: 'pointer' }} />
                                    </Tooltip>
                                    <Tooltip title='Sağa Hizala'>
                                        <AlignRightOutlined onClick={() => editor.chain().focus().toggleItalic().run()} style={{ fontSize: '16px', cursor: 'pointer' }} />
                                    </Tooltip>
                                    <Tooltip title='Link Ekle'>
                                        <LinkOutlined onClick={() => editor.chain().focus().setLink({ href: 'https://example.com' }).run()} style={{ fontSize: '16px', cursor: 'pointer' }} />
                                    </Tooltip>
                                    <Dropdown overlay={
                                        <Menu>
                                            <Menu.Item onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</Menu.Item>
                                            <Menu.Item onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</Menu.Item>
                                            <Menu.Item onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</Menu.Item>
                                        </Menu>
                                    }>
                                        <Tooltip title='Başlık Boyutu'>
                                            <HddOutlined style={{ fontSize: '16px', cursor: 'pointer' }} />
                                        </Tooltip>
                                    </Dropdown>
                                    <Tooltip title='Görsel Ekle'>
                                        <PictureOutlined onClick={() => fileInputRef.current?.click()} style={{ fontSize: '16px', cursor: 'pointer' }} />
                                    </Tooltip>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleImageUpload}
                                    />
                                </div>
                                <Switch
                                    checkedChildren="Koyu"
                                    unCheckedChildren="Açık"
                                    onChange={toggleDarkMode}
                                    checked={darkMode}
                                    style={{ marginLeft: 'auto' }}
                                />
                            </div>
                            <EditorContent editor={editor} style={{ margin: '1rem 0rem', fontSize: '16px' }} className={darkMode ? styles.darkModeEditor : ''} />
                        </Card>
                    </Col>
                </Row>
            </Content>
            <div style={{ padding: '1rem', background: darkMode ? '#333' : '#fff', position: 'sticky', bottom: 0, width: '100%' }}>
                <Row>
                    <Col span={24}>
                        <Button onClick={handleSubmit} loading={loadingBtn} style={{ width: '100%', background: darkMode ? '#555' : '#1890ff', color: darkMode ? '#fff' : '#fff' }}>Kaydet</Button>
                    </Col>
                </Row>
            </div>
        </Layout>


    );
};

export default Admin;