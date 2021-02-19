import React from 'react'
import { Layout,Breadcrumb } from "antd";
import {
    Switch,
    Route,
    // Redirect
  } from "react-router-dom";

import "../styles/home.scss";
import Sidebar from "../components/SideBar"
import Home from "./Home"
import Ventes from "./Ventes"
import Achat from "./Achats"
import Clients from "./Clients"
const { Header,Content,Footer } = Layout;


export default function Container() {


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar/>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '16px 16px' }}>
        {
          // <Breadcrumb style={{ margin: '16px 0' }}>
          //   <Breadcrumb.Item>User</Breadcrumb.Item>
          //   <Breadcrumb.Item>Bill</Breadcrumb.Item>
          // </Breadcrumb>
        }
          
          <div className="site-layout-background" style={{ padding: 24,minHeight: 360 }}>
          <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/ventes">
            <Ventes />
          </Route>
          <Route exact path="/achats">
            <Achat />
          </Route>
          <Route exact path="/clients">
            <Clients />
          </Route>
          
        </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by Adel DJIDJIK</Footer>
      </Layout>
    </Layout>
  );
}
