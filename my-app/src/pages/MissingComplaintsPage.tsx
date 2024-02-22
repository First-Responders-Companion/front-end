import ROLES from "../utils/Roles";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import request from "../utils/request";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Tabs } from "antd";
// eslint-disable-next-line no-duplicate-imports
import type { TabsProps } from "antd";
import NavigationBar from "../components/NavigationBar";
import ComplaintsList from "../components/MissingComplaints/ComplaintsList";
import styles from "../styles/MissingComplaintsPage.module.css";

const MissingComplaintsPage: React.FC = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const currentUserID = localStorage.getItem("uid") || "";
  const [resolvedComplaintsList, setResolvedComplaintsList] = useState([]);
  const [unresolvedComplaintsList, setUnresolvedComplaintsList] = useState([]);

  useEffect(() => {
    const tkn = localStorage.getItem("token");
    if (tkn == null || tkn == "") {
      navigate("/");
    }
    getAllComplaints();
  }, []);

  if (!(role === ROLES.CITIZEN)) {
    navigate("/");
    return <></>;
  }

  const getAllComplaints = async () => {
    const complaintsList = await request(
      `/api/missingComplaints/${currentUserID}`
    );
    setResolvedComplaintsList(filterCases(complaintsList, true));
    setUnresolvedComplaintsList(filterCases(complaintsList, false));
  };

  const filterCases = (data: any, isCaseClosed: boolean) => {
    const filteredCases = data.filter(
      (item: any) => item.isCaseClosed === isCaseClosed
    );
    return filteredCases;
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <span>
          <CloseCircleFilled style={{ color: "#f5222d" }} />
          Unresolved
        </span>
      ),
      children: (
        <ComplaintsList
          data={unresolvedComplaintsList}
          isMissingCasePage={false}
        />
      ),
    },
    {
      key: "2",
      label: (
        <span>
          <CheckCircleFilled style={{ color: "#52c41a" }} />
          Resolved
        </span>
      ),
      children: (
        <ComplaintsList
          data={resolvedComplaintsList}
          isMissingCasePage={false}
        />
      ),
    },
  ];

  return (
    <div className={styles.MissingComplaintsPageContainer}>
      <NavigationBar
        title={"Missing Complaints"}
        showBackButton={true}
        onBack={() => {
          navigate("/");
        }}
      />

      <Tabs
        id="groups-tab"
        defaultActiveKey="1"
        size="large"
        items={items}
        className={styles.tabsContainer}
      />
      <div className={styles.buttonContainer}>
        <Button
          shape="circle"
          size="large"
          type="primary"
          onClick={() => navigate("new")}
          icon={<PlusOutlined />}
        ></Button>
      </div>
    </div>
  );
};
export default MissingComplaintsPage;
