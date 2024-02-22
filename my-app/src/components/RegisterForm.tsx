import { DatePicker, Radio, Button, Form, Input, Select } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/RegisterForm.module.css";
import dayjs from "dayjs";

export interface IFormData {
  username: string;
  password: string;
  confirmPassword: string;
  role: string;
  name: string;
  sex: string;
  dob: number;
}

export interface IProps {
  onSubmit: (data: IFormData) => void;
}

const RegisterForm: React.FC<IProps> = ({ onSubmit }) => {
  const [form] = Form.useForm();

  return (
    <Form
      className={styles.registerForm}
      form={form}
      layout="vertical"
      onFinish={onSubmit}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Username can not be empty" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords  do not match!"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Role"
        name="role"
        rules={[{ required: true, message: "Please select a role" }]}
      >
        <Select placeholder="Select a role">
          <Select.Option value="Citizen">Citizen</Select.Option>
          <Select.Option value="Dispatch">Dispatch</Select.Option>
          <Select.Option value="Police">Police</Select.Option>
          <Select.Option value="Fire">Fire</Select.Option>
          <Select.Option value="Nurse">Nurse</Select.Option>
          <Select.Option value="Administrator">Administrator</Select.Option>
          <Select.Option value="SWAT">SWAT</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Name:"
        name="name"
        rules={[
          {
            required: true,
            message: "Name can not be empty!",
          },
        ]}
      >
        <Input placeholder="John Smith" />
      </Form.Item>
      <Form.Item
        label="Date of birth:"
        name="dob"
        rules={[
          {
            required: true,
            message: "Date of birth can not be empty!",
          },
        ]}
      >
        <DatePicker disabledDate={(d) => d && d > dayjs().endOf("day")} />
      </Form.Item>
      <Form.Item
        label="Sex"
        name="sex"
        rules={[
          {
            required: true,
            message: "Sex can not be empty!",
          },
        ]}
      >
        <Radio.Group>
          <Radio value="male">Male</Radio>
          <Radio value="female">Female</Radio>
          <Radio value="other">Other</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Register
        </Button>
      </Form.Item>
      <Form.Item>
        <Button block>
          <Link to="/">Login</Link>
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
