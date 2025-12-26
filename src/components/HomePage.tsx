// src/components/HomePage.tsx
import React from "react";
import { Card, Typography, Button, Space, Divider } from "antd";
import { LoginOutlined, LogoutOutlined, LinkOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

function HomePage() {
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
              <Text strong>Example:</Text>
              <br />
              <Text code>
                /sso/login?service=[service-url]&appCode=NET_VISION
              </Text>
            </Paragraph>
            <Button
              type="primary"
              icon={<LoginOutlined />}
              onClick={() =>
                (window.location.href =
                  "/sso/login?service=[service-url]&appCode=NET_VISION")
              }
            >
              Test Login
            </Button>
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
              <Text strong>Example:</Text>
              <br />
              <Text code>
                /sso/logout?ticket=ST-123456&service=[service-url]&appCode=NET_VISION
              </Text>
            </Paragraph>
            <Button
              type="default"
              icon={<LogoutOutlined />}
              onClick={() =>
                (window.location.href =
                  "/sso/logout?ticket=ST-123456&service=[service-url]&appCode=NET_VISION")
              }
            >
              Test Logout
            </Button>
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
          <Text strong>Login Mock:</Text>
          <ul>
            <li>Accepts any username/password (default: admin/123456)</li>
            <li>Generates dynamic ticket: ST-&#123;Date.now()&#125;</li>
            <li>Redirects to service URL with ticket parameter</li>
          </ul>

          <Text strong>Logout Mock:</Text>
          <ul>
            <li>Simulates Hazelcast data removal</li>
            <li>Handles partner token (PT) special processing</li>
            <li>Redirects back to service URL after logout</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}

export default HomePage;
