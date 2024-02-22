import ROLES from "../utils/Roles";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IUser from "../models/User";
import request from "../utils/request";
import moment from "moment";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import NavigationBar from "../components/NavigationBar";
import MissingComplaintForm from "../components/MissingComplaints/MissingComplaintForm";
import IMissingComplaintFormData from "../models/MissingComplaint";
import styles from "../styles/AddGroupPage.module.css";

const AddMissingComplaintPage: React.FC = () => {
  const navigate = useNavigate();
  const [allUsersList, setAllUsersList] = useState<IUser[]>([]);
  const [missingComplaintInitialFormData, setMissingComplaintInitialFormData] =
    useState<IMissingComplaintFormData>();
  const { confirm } = Modal;
  const currentUserID = localStorage.getItem("uid") || "";
  const currentUser = localStorage.getItem("username") || "";
  const role = localStorage.getItem("role");

  if (!(role === ROLES.CITIZEN)) {
    navigate("/");
  }

  const initialFormData = {
    complaintFiledBy: currentUser,
    complaintFiledAt: moment().format("YYYY-MM-DD"),
    email: "",
    name: "",
    phoneNumber: "",
    sex: "",
    height: "",
    weight: "",
    birthmark: "",
    medications: "",
    allergies: "",
    conditions: "",
  };

  const successModal = (data: {
    assignedTo: {
      username:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | Iterable<React.ReactNode>
        | React.ReactPortal
        | null
        | undefined;
    };
  }) => {
    Modal.success({
      title: "Complaint Submitted Successfully",
      content: (
        <span>
          Your complaint has been assigned to{" "}
          <strong>{data.assignedTo.username}</strong>
          <br></br>Please contact the assigned police officer for updates on the
          complaint
        </span>
      ),
      centered: true,
      onOk() {
        navigate(-1);
      },
    });
  };

  const errorModal = (contentText: string) => {
    Modal.error({
      centered: true,
      content: contentText,
    });
  };

  const getAllUsersList = async () => {
    const users = (await request("/api/users/all")) as IUser[];
    setAllUsersList(users);
  };

  useEffect(() => {
    const tkn = localStorage.getItem("token");
    if (tkn == null || tkn == "") {
      navigate("/login");
    }
    getAllUsersList();
    setMissingComplaintInitialFormData(initialFormData);
  }, []);

  const showComplaintSubmitConfirmModal = (form: {
    complaintFiledBy: string;
    username: any;
  }) => {
    confirm({
      title: "Submit Missing Complaint",
      icon: <ExclamationCircleFilled />,
      centered: true,
      content: "Once complaint is submitted you cannot edit the details!!",
      onOk() {
        form.complaintFiledBy = currentUserID;
        if (!form.username) delete form.username;
        createNewMissingComplaint(form);
      },
    });
  };

  const createNewMissingComplaint = async (formData: {
    complaintFiledBy: string;
    username: any;
  }) => {
    try {
      const data = await request("/api/missingComplaints", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      successModal(data);
    } catch (error: any) {
      const { status, message } = error;
      errorModal(message);
    }
  };

  return (
    <div className={styles.addGroupContainer}>
      <NavigationBar title={"Missing Complaint"} />
      <div className={styles.groupFormFlexContainer}>
        <MissingComplaintForm
          onSubmit={showComplaintSubmitConfirmModal}
          allUsersList={allUsersList}
          MissingComplaintFormInitialValues={missingComplaintInitialFormData}
          isEditing={false}
          isMissingCasePage={false}
        ></MissingComplaintForm>
      </div>
    </div>
  );
};

export default AddMissingComplaintPage;
