// src/components/HomePage.tsx
import React, { useEffect } from "react";
import { Card, Typography, Button, Space, Divider } from "antd";
import { LoginOutlined, LogoutOutlined, LinkOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

function HomePage() {
  useEffect(() => {
    // Nếu có service parameter, tự động redirect về /sso/login
    const urlParams = new URLSearchParams(window.location.search);
    const service = urlParams.get("service");
    const appCode = urlParams.get("appCode") || "NET_VISION";

    if (service) {
      const loginUrl = `/sso/login?service=${encodeURIComponent(service)}&appCode=${encodeURIComponent(appCode)}`;
      window.location.href = loginUrl;
    }
  }, []);

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
      <Card style={{ width: "100%", maxWidth: "600px" }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <Title level={2} style={{ color: "#1890ff" }}>
            🎭 Mock SSO Portal
          </Title>
          <Text type="secondary">Development Authentication Service</Text>
        </div>

        <Divider orientation="left">Available Routes</Divider>

        <Space direction="vertical" style={{ width: "100%" }} size="large">
          <Card type="inner" title="Login Endpoint" extra={<LoginOutlined />}>
            <Paragraph>
              <Text strong>URL:</Text> /sso/login
            </Paragraph>
            <Paragraph>
              <Text strong>Parameters:</Text>
              <ul>
                <li>
                  <Text code>service</Text> - Callback URL sau khi đăng nhập
                </li>
                <li>
                  <Text code>appCode</Text> - Mã ứng dụng (mặc định: NET_VISION)
                </li>
              </ul>
            </Paragraph>
            <Paragraph>
              <Text strong>Usage:</Text> Access via URL with service and appCode parameters
            </Paragraph>
          </Card>

          <Card type="inner" title="Logout Endpoint" extra={<LogoutOutlined />}>
            <Paragraph>
              <Text strong>URL:</Text> /sso/logout
            </Paragraph>
            <Paragraph>
              <Text strong>Parameters:</Text>
              <ul>
                <li>
                  <Text code>ticket</Text> - Ticket cần xóa khỏi session
                </li>
                <li>
                  <Text code>service</Text> - Callback URL sau khi đăng xuất
                </li>
                <li>
                  <Text code>appCode</Text> - Mã ứng dụng
                </li>
              </ul>
            </Paragraph>
            <Paragraph>
              <Text strong>Usage:</Text> Access via URL with ticket, service and appCode parameters
            </Paragraph>
          </Card>
        </Space>

        <Divider orientation="left" style={{ marginTop: "30px" }}>
          Mock Behavior
        </Divider>

        <div
          style={{
            background: "#f9f9f9",
            padding: "15px",
            borderRadius: "4px",
          }}
        >
          <Paragraph>
            <Text strong>Mock Authentication Service</Text> - Provides login and logout endpoints for development testing.
          </Paragraph>
        </div>
      </Card>
    </div>
  );
}

export default HomePage;
