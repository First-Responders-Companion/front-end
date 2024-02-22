import Loading from "../components/Loading";
import { Space, Typography, Alert, Button } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import RegisterForm, {
  IProps as IRegisterFormProps,
} from "../components/RegisterForm";
import request from "../utils/request";

const RegisterPage: React.FC = () => {
  const [alertDescription, setAlertDescription] = useState(
    "Are you sure you want to create a new Account?"
  );
  const [form, setForm] = useState<any>();
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  const createNewUser = async () => {
    setLoading(true);
    setShowAlert(false);
    try {
      await request("/api/users", {
        method: "POST",
        body: JSON.stringify(form),
      });

      navigator("/login");
    } catch ({ status, message }) {
      window.alert(`Error: ${message} (${status})`);
    }
  };

  const onSubmit: IRegisterFormProps["onSubmit"] = (form) => {
    if (form.dob) {
      form.dob = new Date(form.dob).getTime();
    }
    setForm(form);
    const description = `Are you sure you want to create a new ${form.role} account?`;
    setAlertDescription(description);
    setShowAlert(true);
  };

  return (
    <Space
      direction="vertical"
      size="middle"
      align="center"
      style={{ width: "100%", marginTop: "3rem" }}
    >
      <img src="/logo.png" alt="logo" style={{ width: "10rem" }} />
      <Typography.Title level={2}>Register</Typography.Title>
      {showAlert && (
        <Alert
          type="info"
          message="Alert!"
          description={alertDescription}
          action={
            <Space direction="vertical">
              <Button size="small" type="primary" onClick={createNewUser}>
                Yes
              </Button>
              <Button
                size="small"
                type="default"
                onClick={() => navigator("/login")}
              >
                No
              </Button>
            </Space>
          }
        />
      )}
      {loading ? <Loading /> : <RegisterForm onSubmit={onSubmit} />}
    </Space>
  );
};

export default RegisterPage;
