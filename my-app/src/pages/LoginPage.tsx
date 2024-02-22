import Loading from "../components/Loading";
import { Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import LoginForm, { IProps as ILoginFormProps } from "../components/LoginForm";
import request from "../utils/request";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const clearData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
  };
  const [loading, setLoading] = useState(false);
  const login: ILoginFormProps["login"] = async ({ username, password }) => {
    try {
      setLoading(true);
      const user = await request("/api/login", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const { token, _id, role } = user as {
        token: string;
        _id: string;
        role: string;
      };
      localStorage.setItem("token", token);
      localStorage.setItem("uid", _id);
      localStorage.setItem("username", username);
      localStorage.setItem("role", role);

      navigate("/missing-complaints");
    } catch ({ status, message }) {
      navigate("/");
      setLoading(false);
      alert(`Error: ${message} (${status})`);
    }
  };

  useEffect(() => {
    clearData();
  }, []);

  return (
    <Space
      direction="vertical"
      size="middle"
      align="center"
      style={{ width: "100%", marginTop: "5rem" }}
    >
      <Typography.Title level={1}>Incident Response</Typography.Title>
      {loading ? <Loading /> : <LoginForm login={login} />}
    </Space>
  );
};
export default LoginPage;
