import React, { useState, useEffect } from "react";
import { Button, Card, Input, Typography, Form, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [serviceUrl, setServiceUrl] = useState("");
  const [appCode, setAppCode] = useState("");

  useEffect(() => {
    // Lấy parameters từ URL
    const urlParams = new URLSearchParams(window.location.search);
    let service = urlParams.get("service") || "";
    const app = urlParams.get("appCode") || "NET_VISION";

    // Xóa dấu '/' cuối nếu có
    if (service.endsWith("/")) {
      service = service.slice(0, -1);
    }

    setServiceUrl(service);
    setAppCode(app);

    console.log("🎭 Mock VSA Login loaded:", { service, appCode: app });
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

    // Giả lập loading
    setTimeout(() => {
      const ticket =
        "ST-272-4-ujGCiVQsDvmHuRbpO6D9X8bWQvtn-cds-app-10211202001"; // fixed test ticket

      console.log("🎫 Mock login successful:", {
        username: values.username,
        ticket,
        serviceUrl,
      });

      message.success("Đăng nhập thành công! Chuyển hướng...");

      // Redirect về BE với ticket
      setTimeout(() => {
        // Đảm bảo serviceUrl không có dấu '/' cuối
        const callbackUrl = `${serviceUrl.replace(
          /\/+$/,
          ""
        )}?ticket=${ticket}`;
        console.log("🔄 Redirecting to:", callbackUrl);
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
          initialValues={{ username: "admin", password: "123456" }}
          onFinish={handleLogin}
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Nhập username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
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

        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            background: "#f9f9f9",
            borderRadius: "4px",
            fontSize: "12px",
          }}
        >
          <Text strong>Connection Info:</Text>
          <div>Service: {serviceUrl || "N/A"}</div>
          <div>AppCode: {appCode}</div>
          <div>Mode: Login</div>
        </div>
      </Card>
    </div>
  );
}

export default LoginPage;
