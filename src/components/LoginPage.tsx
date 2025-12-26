import React, { useState, useEffect } from "react";
import { Button, Card, Input, Typography, Form, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [serviceUrl, setServiceUrl] = useState("");
  const [appCode, setAppCode] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let service = urlParams.get("service") || "";
    const app = urlParams.get("appCode") || "NET_VISION";
    if (service.endsWith("/")) {
      service = service.slice(0, -1);
    }
    setServiceUrl(service);
    setAppCode(app);
  }, []);

  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    if (!serviceUrl) {
      message.error("Lỗi: Không có service URL!");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const ticket = values.username;
      message.success("Đăng nhập thành công! Chuyển hướng...");
      setTimeout(() => {
        const callbackUrl = `${serviceUrl.replace(
          /\/+$/,
          ""
        )}?ticket=${ticket}`;
        window.location.href = callbackUrl;
      }, 1000);
    }, 500);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0f2f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Card style={{ width: "100%", maxWidth: "400px" }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <Title level={2} style={{ color: "#1890ff" }}>
            🔐 VSA Login Portal
          </Title>
          <Text type="secondary">Mock Authentication Service</Text>
        </div>
        <Form
          initialValues={{ username: "", password: "" }}
          onFinish={handleLogin}
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Nhập ticket!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Ticket" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Nhập password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: "100%" }}
            >
              {loading ? "Đang xử lý..." : "Đăng nhập"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default LoginPage;
