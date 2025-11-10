// src/components/LogoutPage.tsx
import React, { useState, useEffect } from "react";
import { Card, Typography, Spin, Result, Button } from "antd";
import { LogoutOutlined, CheckCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function LogoutPage() {
  const [loading, setLoading] = useState(true);
  const [serviceUrl, setServiceUrl] = useState("");
  const [appCode, setAppCode] = useState("");
  const [ticket, setTicket] = useState("");
  const [logoutComplete, setLogoutComplete] = useState(false);

  useEffect(() => {
    // Lấy parameters từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const service = urlParams.get("service") || "";
    const app = urlParams.get("appCode") || "NET_VISION";
    const ticketParam = urlParams.get("ticket") || "";

    setServiceUrl(service);
    setAppCode(app);
    setTicket(ticketParam);

    console.log("🎭 Mock VSA Logout loaded:", {
      service,
      appCode: app,
      ticket: ticketParam,
      flow: "BE SSO → Mock SSO FE → App Service",
    });

    // Giả lập quá trình logout
    handleLogout(ticketParam, service, app);
  }, []);

  const handleLogout = (ticket: string, service: string, appCode: string) => {
    setLoading(true);

    // Giả lập xử lý logout (xóa dữ liệu từ Hazelcast, etc.)
    setTimeout(() => {
      console.log("🔄 Mock logout processing:", {
        ticket,
        service,
        appCode,
        action: "removeFromHazelcast",
      });

      // Giả lập xóa session, hazelcast data
      if (ticket.startsWith("PT")) {
        console.log("🗑️ Removing OTP data for partner token");
      }

      setLoading(false);
      setLogoutComplete(true);

      // Auto redirect ngay lập tức nếu có service URL
      if (service) {
        setTimeout(() => {
          console.log("🔄 Redirecting back to service:", service);
          window.location.href = service;
        }, 500); // Redirect sau 500ms - rất nhanh
      }
    }, 1000); // Giảm thời gian processing xuống 1s
  };

  const handleManualRedirect = () => {
    if (serviceUrl) {
      window.location.href = serviceUrl;
    }
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

          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              background: "#f9f9f9",
              borderRadius: "4px",
              fontSize: "12px",
            }}
          >
            <Text strong>Logout Info:</Text>
            <div>Ticket: {ticket || "N/A"}</div>
            <div>Service: {serviceUrl || "N/A"}</div>
            <div>AppCode: {appCode}</div>
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
              ? "Đang chuyển hướng về ứng dụng..."
              : "Bạn đã đăng xuất khỏi hệ thống."
          }
        />

        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            background: "#f6ffed",
            borderRadius: "4px",
            fontSize: "12px",
            border: "1px solid #b7eb8f",
          }}
        >
          <Text strong style={{ color: "#52c41a" }}>
            Logout Success Info:
          </Text>
          <div>✅ Session invalidated</div>
          <div>✅ Hazelcast data removed</div>
          {ticket.startsWith("PT") && <div>✅ OTP data cleared</div>}
          <div>Service: {serviceUrl || "N/A"}</div>
          <div>AppCode: {appCode}</div>
          <div>Ticket: {ticket}</div>
        </div>
      </Card>
    </div>
  );
}

export default LogoutPage;
