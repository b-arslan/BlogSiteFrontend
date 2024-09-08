'use client';
import React from 'react';
import { Layout, Row, Col, Button } from 'antd';
import styles from '../styles/page.module.scss';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import Image from 'next/image';
import ProfileImg from '../../public/profile.png';
import { useRouter } from 'next/navigation';
import PSILogo from '../../public/psi.png';

const { Header, Content } = Layout;

const About = () => {

    const router = useRouter();

    return (
        <Layout className={styles.layout}>
            <Header style={{ background: "#ffffff", padding: "0px 24px", height: '8vh', textAlign: 'center' }}>
                <Row style={{ height: '100%' }}>
                    <Col span={12} className={styles.headerCol1}>
                    <h1 style={{ color: '#111827', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => router.push('/')}><Image style={{marginRight: '12px'}} width={40} src={PSILogo} alt='psi logo'/>Psikolog Mehmet Aker</h1>                    </Col>

                    <Col span={12} className={styles.headerCol2}>
                        <Button href="/blogs" type='text' className={styles.btn}><EditOutlined /> Blog</Button>
                        <Button href="/about" type='text' className={styles.btn}><UserOutlined /> Hakkımda</Button>
                    </Col>
                </Row>
            </Header>

            <Content className={styles.content}>
                <Row style={{ height: '100%' }}>
                    {/* <Col span={12} style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Image src={ProfileImg} alt='profile image' className={styles.myImg} />
                    </Col> */}


                    <Col span={12} style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <div className={styles.myImg} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                            <h1 style={{ alignSelf: 'center', marginTop: '24px' }}>The Best Psikolog Ever</h1> {/* Aligned to the top of the div */}
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexGrow: 1, padding: '0px 24px', textAlign: 'justify', marginTop: '-24px' }}>
                                <p>Test Detay</p>
                                <p>Psikolojik master</p>
                                <p>En sevdiği yemek</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga quasi alias molestias officia modi reiciendis officiis eveniet ducimus, dolores iusto. Sunt delectus tenetur, suscipit fugit labore corrupti laboriosam. Sunt, quia?</p>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row style={{ height: '100%' }}>
                    <Col span={24} style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <div className={styles.myDiv} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                            <h1 style={{ alignSelf: 'center', marginTop: '24px' }}>Mehmet Aker Psikoloji</h1> {/* Aligned to the top of the div */}
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexGrow: 1, padding: '0px 24px', textAlign: 'justify', marginTop: '-24px' }}>
                                <p>Test Detay</p>
                                <p>Psikolojik master</p>
                                <p>En sevdiği yemek</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga quasi alias molestias officia modi reiciendis officiis eveniet ducimus, dolores iusto. Sunt delectus tenetur, suscipit fugit labore corrupti laboriosam. Sunt, quia?</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga quasi alias molestias officia modi reiciendis officiis eveniet ducimus, dolores iusto. Sunt delectus tenetur, suscipit fugit labore corrupti laboriosam. Sunt, quia?</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga quasi alias molestias officia modi reiciendis officiis eveniet ducimus, dolores iusto. Sunt delectus tenetur, suscipit fugit labore corrupti laboriosam. Sunt, quia?</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga quasi alias molestias officia modi reiciendis officiis eveniet ducimus, dolores iusto. Sunt delectus tenetur, suscipit fugit labore corrupti laboriosam. Sunt, quia?</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga quasi alias molestias officia modi reiciendis officiis eveniet ducimus, dolores iusto. Sunt delectus tenetur, suscipit fugit labore corrupti laboriosam. Sunt, quia?</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga quasi alias molestias officia modi reiciendis officiis eveniet ducimus, dolores iusto. Sunt delectus tenetur, suscipit fugit labore corrupti laboriosam. Sunt, quia?</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga quasi alias molestias officia modi reiciendis officiis eveniet ducimus, dolores iusto. Sunt delectus tenetur, suscipit fugit labore corrupti laboriosam. Sunt, quia?</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}

export default About