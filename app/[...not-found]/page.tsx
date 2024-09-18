'use client';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';


const NotFoundPage = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Hide header and footer on admin page
        const header = document.getElementById('header-component');
        const footer = document.getElementById('footer-component');

        if (header) header.style.display = 'none';
        if (footer) footer.style.display = 'none';

        setTimeout(() => {
            setLoading(false);
        }, 500);

        // Clean up when component unmounts
        return () => {
            if (header) header.style.display = 'block';
            if (footer) footer.style.display = 'block';
        };
    }, []);

    if (loading) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <Spin indicator={<LoadingOutlined style={{fontSize: 48, color: '#212121'}} />} />
            </div>
        )
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '2rem'}}>
            <h1>404 - Sayfa Bulunamadı</h1>
            <p>Üzgünüz, aradığınız sayfa mevcut değil.</p>
        </div>
    );
};

export default NotFoundPage;
