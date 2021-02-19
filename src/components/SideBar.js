import React,{ useState } from 'react'
import { Layout,Menu } from "antd";
import {
    Link
  } from "react-router-dom";
import {
    // DesktopOutlined,
    // PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    QrcodeOutlined
} from '@ant-design/icons';


const { Sider } = Layout;
const { SubMenu } = Menu;

export default function SideBar(props) {
    const [collapsed,setcollapsed] = useState(false)
    const onCollapse = () => {
        setcollapsed(!collapsed)
    }

    return <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<QrcodeOutlined />}> <Link to="/">Stock </Link></Menu.Item>
            <Menu.Item key="2" icon={<FileOutlined />}> <Link to="/ventes">Ventes </Link> </Menu.Item>
            <Menu.Item key="3" icon={<FileOutlined />}>  <Link to="/achats">Achats </Link> </Menu.Item>
            <Menu.Item key="4" icon={<TeamOutlined />}> <Link to="/clients">Clients </Link>   </Menu.Item>
        </Menu>
    </Sider>
};
