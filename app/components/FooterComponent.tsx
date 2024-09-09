"use client";
import { useState } from "react";
import { Form, Input, Button, message, Row, Col, Layout } from "antd";
import {
    InstagramOutlined,
    LinkedinOutlined,
    MailOutlined,
} from "@ant-design/icons";
import styles from "../styles/page.module.scss";

const { Footer } = Layout;

const FooterComponent = () => {
    const [loading, setLoading] = useState(false);

    return (
        <Footer className={styles.footer}>
            <Row>
                <Col
                    span={24}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        width: "100%",
                    }}
                >
                    <div style={{ position: "absolute", top: "0" }}>
                        <h2 className={styles.footerTitle}>Sosyal</h2>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            width: "100%",
                            gap: '1rem',
                            marginTop: '4rem'
                        }}
                    >
                        <p
                            style={{
                                fontSize: "20px",
                                fontWeight: "600",
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                            }}
                        >
                            <InstagramOutlined
                                className={styles.instagram}
                                onClick={() =>
                                    window.open(
                                        "https://www.instagram.com/psikolog.mehmetaker/"
                                    )
                                }
                            />
                            <span style={{ marginLeft: "auto" }}>
                                Instagram
                            </span>
                        </p>

                        <p
                            style={{
                                fontSize: "20px",
                                fontWeight: "600",
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                            }}
                        >
                            <LinkedinOutlined
                                className={styles.linkedin}
                                onClick={() =>
                                    window.open(
                                        "https://www.linkedin.com/in/pskmehmetaker/"
                                    )
                                }
                            />
                            <span style={{ marginLeft: "auto" }}>Linkedin</span>
                        </p>
                        <p
                            style={{
                                fontSize: "20px",
                                fontWeight: "600",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "16px",
                            }}
                        >
                            <MailOutlined className={styles.mailIcon} />{" "}
                            psikolog@mehmetaker.com
                        </p>
                    </div>
                </Col>
                {/*
                <Col
                    span={12}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                    }}
                >
                    <h2>İletişim Formu</h2>
                    <Form
                        layout="vertical"
                        onFinish={(values) => sendEmail(values)}
                        style={{ width: "70%" }}
                    >
                        <Form.Item
                            label="Ad Soyad"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your name",
                                },
                            ]}
                        >
                            <Input placeholder="Ad Soyad yazınız..." />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    type: "email",
                                    message: "Please enter a valid email",
                                },
                            ]}
                        >
                            <Input placeholder="Email yazınız..." />
                        </Form.Item>
                        <Form.Item
                            label="Mesaj"
                            name="message"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your message",
                                },
                            ]}
                        >
                            <Input.TextArea
                                placeholder="Mesajınızı yazınız..."
                                rows={4}
                            />
                        </Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            style={{
                                width: "100%",
                                background: "transparent",
                                border: "1px solid #afafaf",
                                color: "#000",
                            }}
                        >
                            Gönder
                        </Button>
                    </Form>
                </Col>
                */}
            </Row>
        </Footer>
    );
};

export default FooterComponent;
