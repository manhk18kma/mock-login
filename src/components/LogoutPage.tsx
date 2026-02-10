// src/components/LogoutPage.tsx
import React, { useState, useEffect } from "react";
import { Card, Typography, Spin, Result } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function LogoutPage() {
  const [loading, setLoading] = useState(true);
  const [serviceUrl, setServiceUrl] = useState("");
  const [appCode, setAppCode] = useState("");
  const [ticket, setTicket] = useState("");
  const [logoutComplete, setLogoutComplete] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const service = urlParams.get("service") || "";
    const app = urlParams.get("appCode") || "NET_VISION";
    const ticketParam = urlParams.get("ticket") || "";

    setServiceUrl(service);
    setAppCode(app);
    setTicket(ticketParam);

    handleLogout(ticketParam, service, app);
  }, []);

  const handleLogout = (ticket: string, service: string, appCode: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLogoutComplete(true);
      if (service) {
        setTimeout(() => {
          // Redirect về trang login với service parameter
          const loginUrl = `/sso/login?service=${encodeURIComponent(service)}&appCode=${encodeURIComponent(appCode)}`;
          window.location.href = loginUrl;
        }, 500);
      }
    }, 1000);
  };

  if (loading) {
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
        <Card style={{ width: "100%", maxWidth: "400px", textAlign: "center" }}>
          <Spin size="large" />
          <div style={{ marginTop: "20px" }}>
            <Title level={3} style={{ color: "#ff4d4f" }}>
              🔄 Đang đăng xuất...
            </Title>
            <Text type="secondary">Đang xử lý yêu cầu đăng xuất</Text>
          </div>
        </Card>
      </div>
    );
  }

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
        <Result
          icon={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
          title="Đăng xuất thành công!"
          subTitle={
            serviceUrl
              ? "Đang chuyển hướng về trang đăng nhập..."
              : "Bạn đã đăng xuất khỏi hệ thống."
          }
        />
      </Card>
    </div>
  );
}

export default LogoutPage;
