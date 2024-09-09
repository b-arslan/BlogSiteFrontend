'use client';
import React from 'react';
import { Layout, Row, Col, Button } from 'antd';
import styles from '../styles/page.module.scss';
import { EditOutlined, InstagramOutlined, LinkedinOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import PSILogo from '../../public/psi.png';
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';

const { Header, Content, Footer } = Layout;

const About = () => {

    const router = useRouter();

    return (
        <Layout className={styles.layout}>
            <Header className={styles.header} style={{ background: "#ffffff", padding: "0px 24px", textAlign: 'center' }}>
                <HeaderComponent />
            </Header>

            <Content className={styles.content}>
                {/* <Row style={{ height: '100%' }}>
                    <Col span={12} style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <div className={styles.myImg} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                            <h1 style={{ alignSelf: 'center', marginTop: '24px' }}>The Best Psikolog Ever</h1> {/* Aligned to the top of the div
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexGrow: 1, padding: '0px 24px', textAlign: 'justify', marginTop: '-24px' }}>
                                <p>Test Detay</p>
                                <p>Psikolojik master</p>
                                <p>En sevdiği yemek</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga quasi alias molestias officia modi reiciendis officiis eveniet ducimus, dolores iusto. Sunt delectus tenetur, suscipit fugit labore corrupti laboriosam. Sunt, quia?</p>
                            </div>
                        </div>
                    </Col>
                </Row> */}

                <Row style={{ height: '100%' }}>
                    <Col span={24} style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <div className={styles.myDiv} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                            <h1 style={{ alignSelf: 'center', marginTop: '24px' }}>Hakkımda</h1> {/* Aligned to the top of the div */}
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexGrow: 1, padding: '0px 24px', textAlign: 'justify', marginTop: '-24px' }}>
                                <p>Yakında...</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Content>

            <Footer className={styles.footer} >
                <FooterComponent />
            </Footer>
        </Layout>
    )
}

export default About