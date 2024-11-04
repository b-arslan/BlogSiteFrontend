"use client";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import styles from "../styles/page.module.scss";
import { Button, Layout } from "antd";
import Image from "next/image";
import PSILogo from "../../public/favicon.ico";
import { useRouter } from "next/navigation";

const { Header } = Layout;

const HeaderComponent = () => {
    const router = useRouter();

    return (
        <Header id="header-component" className={styles.header} style={{ background: "#ffffff", padding: "12px 24px", textAlign: 'center' }}>
            <div className={styles.headerRow}>
                <div className={styles.headerCol1} onClick={() => router.push("/")}>
                    <Image
                        className={styles.logoHeader}
                        src={PSILogo}
                        alt="psi logo"
                    />
                    <h1
                        className={styles.titleHeader}
                    >
                        
                        Psikolog Mehmet Aker
                    </h1>
                </div>
                <div className={styles.headerCol2}>
                    <Button href="/blogs" type="text" className={styles.btn}>
                        <EditOutlined /> Blog
                    </Button>
                    <Button href="/about" type="text" className={styles.btn}>
                        <UserOutlined /> Hakkımda
                    </Button>
                </div>
            </div>
        </Header>
    );
};

export default HeaderComponent;