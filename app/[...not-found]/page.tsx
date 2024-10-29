'use client';
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';
import { useEffect, useState } from 'react';
import styles from '../styles/page.module.scss';


const NotFoundPage = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Hide header and footer on not found page
        const header = document.getElementById('header-component');
        debugger
        setTimeout(() => {
            const footer = document.getElementById('footer-component');
            if (footer) footer.style.display = 'none';
            if (header) header.style.display = 'none';
            // return () => {
            //     if (footer) footer.style.display = 'block';
            //     if (header) header.style.display = 'block';
            // };
        }, 50);

        setTimeout(() => {
            setLoading(false);
        }, 500);
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
            <h1 style={{textAlign: 'center', fontSize: '48px', fontWeight: '800'}}>Sayfa Bulunamadı</h1>
            <p style={{fontSize: '18px'}}>Üzgünüz, aradığınız sayfa mevcut değil.</p>
            <Button type='primary' className={styles.notFoundBtn} href='/'>Ana Sayfaya Dön</Button>
        </div>
    );
};

export default NotFoundPage;
