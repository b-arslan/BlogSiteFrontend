"use client";
import React from "react";
import { Layout, Row, Col } from "antd";
import Image from "next/image";
import styles from "../styles/page.module.scss";
import ProfileImg from "../../public/profile.jpg";
import aboutText from "../../public/about.json";

const { Content } = Layout;

const About = () => {
    return (
        <Layout className={styles.layout}>
            <Content className={styles.content}>
                <Row style={{ height: "100%", width: "100%" }}>
                    <Col
                        span={24}
                        style={{
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                    >
                        <div
                            className={styles.myDiv}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                position: "relative",
                            }}
                        >
                            {/* <h1 style={{ alignSelf: 'center', marginTop: '24px' }}>Hakkımda</h1> */}
                            <div className={styles.mySecDiv}>
                                <div>
                                    <Image
                                        priority={true}
                                        src={ProfileImg}
                                        alt="Profil Resmi"
                                        className={styles.profileImg}
                                    ></Image>
                                </div>

                                <div>
                                    {aboutText.aboutText.map(
                                        (paragraph, index) => (
                                            <p
                                                key={index}
                                                style={
                                                    index === 0
                                                        ? {
                                                              textAlign:
                                                                  "center",
                                                              margin: "24px 0px",
                                                              fontSize: "16px",
                                                              fontWeight: "500",
                                                          }
                                                        : {
                                                              margin: "14px 0px",
                                                              fontSize: "16px",
                                                              fontWeight: "500",
                                                          }
                                                }
                                            >
                                                {paragraph}
                                            </p>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default About;
