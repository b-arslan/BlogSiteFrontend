'use client';
import React from 'react';
import { Layout, Row, Col } from 'antd';
import styles from '../styles/page.module.scss';

const { Content } = Layout;

const About = () => {

    return (
        <Layout className={styles.layout}>
            <Content className={styles.content}>
                <Row style={{ height: '100%' }}>
                    <Col span={24} style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <div className={styles.myDiv} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                            <h1 style={{ alignSelf: 'center', marginTop: '24px' }}>Hakkımda</h1>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexGrow: 1, padding: '0px 24px', textAlign: 'justify', marginTop: '-24px' }}>
                                <p>Yakında...</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}

export default About