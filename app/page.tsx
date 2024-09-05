"use client";
import HeaderComponent from "./components/HeaderComponent";
import styles from "./styles/page.module.scss";
import { Layout, Button, Row, Col, Card } from "antd";
import ReactPlayer from "react-player";

const { Header, Content, Footer } = Layout;
const { Meta } = Card;

const Home = () => {
    return (
        <Layout className={styles.layout}>
            <Header style={{ background: "#ffffff", padding: "0px 24px" }}>
                <HeaderComponent />
            </Header>

            <Content className={styles.content}>
                <Row style={{ background: "transparent", padding: "24px 0px" }}>
                    <Col span={24} style={{ textAlign: "center" }}>
                        <h1>cok buyuk bi heyecanla</h1>
                    </Col>

                    <Col span={24} style={{ textAlign: "center" }}>
                        <h3 style={{ margin: "2rem" }}>
                            pembe orasi gay bar la
                        </h3>
                    </Col>

                    <Col span={24} style={{ textAlign: "center" }}>
                        <p style={{ margin: "1rem" }}>
                            hiphopin amisiniz cayir cayir yaniyosunuz
                        </p>
                    </Col>
                </Row>

                <Row
                    style={{
                        justifyContent: "center",
                        display: "flex",
                        gap: "2rem",
                        marginTop: "2rem",
                    }}
                >
                    <Col key={"track.id"}>
                        <Card
                            hoverable
                            className="card-container"
                            cover={
                                <img
                                    alt={"track.name"}
                                    src={"track.album.images[0].url"}
                                />
                            }
                            onClick={() =>
                                window.open(
                                    "track.external_urls.spotify",
                                    "_blank"
                                )
                            }
                        >
                            <Meta
                                className="card-meta"
                                title={"track.name"}
                                description={`${"TR"}`}
                            />
                        </Card>
                    </Col>
                </Row>
                {/* <ReactPlayer url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" controls={true} /> */}
            </Content>
        </Layout>
    );
};

export default Home;
