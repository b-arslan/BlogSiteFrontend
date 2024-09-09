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
        <div className={styles.headerRow}>
            <div className={styles.headerCol1}>
                <h1
                    className={styles.titleHeader}
                    onClick={() => router.push("/")}
                >
                    <Image
                        className={styles.logoHeader}
                        src={PSILogo}
                        alt="psi logo"
                    />
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
        </div >
        // <Row style={{ height: "100%" }} className={styles.headerRow}>
        //     <Col span={12} className={styles.headerCol1}>
        //         <h1
        //             className={styles.titleHeader}
        //             onClick={() => router.push("/")}
        //         >
        //             <Image
        //                 className={styles.logoHeader}
        //                 src={PSILogo}
        //                 alt="psi logo"
        //             />
        //             Psikolog Mehmet Aker
        //         </h1>
        //     </Col>

        //     <Col  span={12} className={styles.headerCol2} >
        //         <Button href="/blogs" type="text" className={styles.btn}>
        //             <EditOutlined /> Blog
        //         </Button>
        //         <Button href="/about" type="text" className={styles.btn}>
        //             <UserOutlined /> Hakkımda
        //         </Button>
        //     </Col>
        // </Row>
    );
};

export default HeaderComponent;
