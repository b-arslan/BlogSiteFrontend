import { EditOutlined, UserOutlined } from '@ant-design/icons';
import styles from '../styles/header.module.scss';
import { Row, Col, Button, Typography } from 'antd';

const { Text } = Typography;

const HeaderComponent = () => {

    return (
        <Row>
            <Col span={12} className={styles.headerCol1}>
                <h1 style={{color: '#111827'}}>Mehmet Aker</h1>

            </Col>

            <Col span={12} className={styles.headerCol2}>
                <Button type='text' className={styles.btn}><EditOutlined /> Blog</Button>
                <Button type='text' className={styles.btn}><UserOutlined />Hakkımda</Button>
            </Col>
        </Row>
    );

}

export default HeaderComponent;