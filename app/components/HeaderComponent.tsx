"use client";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import styles from "../styles/page.module.scss";
import { Row, Col, Button } from "antd";
import Image from "next/image";
import PSILogo from "../../public/psi.png";
import { useRouter } from "next/navigation";

const HeaderComponent = () => {
    const router = useRouter();

    return (
        <Row style={{ height: "100%" }}>
            <Col span={12} className={styles.headerCol1}>
                <h1
                    style={{
                        color: "#111827",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onClick={() => router.push("/")}
                >
                    <Image
                        style={{ marginRight: "12px" }}
                        width={40}
                        src={PSILogo}
                        alt="psi logo"
                    />
                    Psikolog Mehmet Aker
                </h1>
            </Col>

            <Col span={12} className={styles.headerCol2}>
                <Button href="/blogs" type="text" className={styles.btn}>
                    <EditOutlined /> Blog
                </Button>
                <Button href="/about" type="text" className={styles.btn}>
                    <UserOutlined /> Hakkımda
                </Button>
            </Col>
        </Row>
    );
};

export default HeaderComponent;
