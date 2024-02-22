import React, { useEffect } from "react";
import IUser from "../../models/User";
import {
  Button,
  Form,
  Input,
  Select,
  message,
  Typography,
  Divider,
  Radio,
  InputNumber,
  Row,
  Col,
} from "antd";
import { EditOutlined, BookOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import styles from "../../styles/MissingComplaintForm.module.css";
import IMissingComplaintFormData from "../../models/MissingComplaint";
const { Title } = Typography;

export interface IProps {
  onSubmit?: (data: any) => void;
  isEditing: boolean;
  allUsersList?: Array<IUser>;
  MissingComplaintFormInitialValues?: IMissingComplaintFormData;
  isMissingCasePage?: boolean;
}

const MissingComplaintForm: React.FC<IProps> = ({
  onSubmit,
  isEditing,
  allUsersList,
  MissingComplaintFormInitialValues,
  isMissingCasePage,
}) => {
  const [form] = Form.useForm();
  const currentUid = localStorage.getItem("uid");
  const [messageApi, contextHolder] = message.useMessage();
  const checkDisabled = (item: IUser) => {
    if (currentUid === item._id) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    form.setFieldsValue(MissingComplaintFormInitialValues);
  }, [MissingComplaintFormInitialValues]);

  const onReset = () => {
    form.setFieldsValue(MissingComplaintFormInitialValues);
    messageApi.open({
      type: "success",
      content: "Form reset to last saved version",
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      className={styles.formContainer}
      initialValues={MissingComplaintFormInitialValues}
      scrollToFirstError={true}
      disabled={isEditing}
    >
      {contextHolder}
      {!isMissingCasePage && (
        <>
          <Title level={4} style={{ color: "#1677ff", marginBottom: "0" }}>
            {isEditing ? (
              <BookOutlined style={{ marginRight: "4px" }} />
            ) : (
              <EditOutlined style={{ marginRight: "4px" }} />
            )}
            {isEditing
              ? "View Missing Complaint Details"
              : "Add New Missing Complaint"}
          </Title>
          <Divider style={{ margin: "16px 0px" }} />
        </>
      )}

      <Title level={5} style={{ marginBottom: "0.5rem" }}>
        {isMissingCasePage ? "Case Details:" : "Complaint Details:"}
      </Title>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="complaintFiledBy" label="Filled By">
            <Input disabled size="large" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="complaintFiledAt" label="Filled At">
            <Input disabled size="large" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="assignedTo" label="Assigned To">
            <Input disabled size="large" />
          </Form.Item>
        </Col>
      </Row>

      <Title level={5} style={{ marginBottom: "1rem" }}>
        Missing Person Details:
      </Title>

      <Form.Item name="username" label="Username">
        <Select
          size="large"
          placeholder="Select Users"
          optionFilterProp="label"
          allowClear={true}
        >
          {(allUsersList ?? []).map((item: IUser) => (
            <Select.Option
              key={item._id}
              value={isMissingCasePage ? item.username : item._id}
              disabled={checkDisabled(item)}
              label={item.username}
            >
              <span>{item.username}</span>
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: "Name can not be empty!",
            whitespace: true,
          },
        ]}
      >
        <Input size="large" placeholder="Enter name" />
      </Form.Item>

      <Form.Item
        label="Phone:"
        name="phoneNumber"
        rules={[
          {
            pattern: new RegExp(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/),
            message: "Please enter a valid phone number.",
          },
        ]}
      >
        <Input type="tel" size="large" placeholder="(XXX)-XXX-XXXXX" />
      </Form.Item>

      <Form.Item
        label="Email:"
        name="email"
        rules={[
          {
            pattern: new RegExp(/^\S+@\S+\.\S+$/),
            message: "Please enter a valid email address.",
          },
        ]}
      >
        <Input type="email" size="large" placeholder="name@example.com" />
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

      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            name="age"
            label="Age"
            rules={[
              {
                required: true,
                message: "Age can not be empty!",
              },
            ]}
          >
            <InputNumber
              size="large"
              min="1"
              max="120"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="height" label="Height">
            <InputNumber<string>
              min="50"
              max="270"
              size="large"
              style={{ width: "100%" }}
              placeholder="in cm"
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="weight" label="Weight">
            <InputNumber<string>
              min="10"
              max="830"
              size="large"
              style={{ width: "100%" }}
              placeholder="in pounds"
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="birthmark"
        label="Birthmark"
        rules={[
          {
            whitespace: true,
          },
        ]}
      >
        <Input size="large" placeholder="Enter birthmark" />
      </Form.Item>

      <Form.Item label="Conditions:" name="conditions">
        <TextArea placeholder="Enter comma separate values (e.g. 'Diabetes,Amnesia,Epilepsy')" />
      </Form.Item>
      <Form.Item label="Medications:" name="medications">
        <TextArea placeholder="Enter comma separate values (e.g. 'Epipen,Albuterol')" />
      </Form.Item>
      <Form.Item label="Allergies:" name="allergies">
        <TextArea placeholder="Enter comma separate values (e.g. 'Dogs,Cats,Peanuts')" />
      </Form.Item>

      <div className={styles.buttonContainer}>
        <Form.Item style={{ marginBottom: "0" }}>
          <Button size="middle" onClick={onReset}>
            Cancel
          </Button>
        </Form.Item>
        <Form.Item style={{ marginBottom: "0", marginLeft: "1rem" }}>
          <Button size="middle" type="primary" htmlType="submit">
            {isMissingCasePage ? "Find Matches" : "Submit"}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default MissingComplaintForm;
