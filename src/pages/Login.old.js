import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Layout,Form,Input,Button,Checkbox } from "antd";
import firebase from "firebase/app";
import "firebase/auth";

import {
    GoogleCircleFilled
} from '@ant-design/icons';
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const { Content } = Layout;


export default function Logino() {
    return <div>
        <Layout className="layout">
            <Content
                className="site-layout"
                style={{ padding: "0 50px",marginTop: 64 }}
            >
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                //   onFinish={onFinish}
                //   onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                        <div>
                        <br/>
                        <br/>
                            <Button
                                onClick={() => {
                                    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                                    firebase.auth().signInWithPopup(googleAuthProvider);
                                }}
                                icon={<GoogleCircleFilled />}
                            >
                                Sign In with Google
                </Button>
                        </div>

                    </Form.Item>
                </Form>





            </Content>
        </Layout>
    </div>
};
