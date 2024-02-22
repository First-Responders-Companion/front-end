import React from "react";
import { Typography } from "antd";
import styles from "../../styles/MissingComplaintReport.module.css";

const { Title, Text } = Typography;

const MissingComplaintReport: React.FC<{ reportData: any }> = ({
  reportData,
}) => {
  return (
    <div className={styles.reportContainer}>
      <Title level={4} style={{ color: "#1677ff", marginBottom: "0" }}>
        {reportData.name} Conclusion Report
      </Title>
      <Title level={5}>Complaint Filled By</Title>
      <div className={styles.descriptionBox}>
        <Text>
          {reportData.complaintFiledBy
            ? reportData.complaintFiledBy.username
            : ""}
        </Text>
      </div>
      <Title level={5}>Case Assigned To</Title>
      <div className={styles.descriptionBox}>
        <Text>
          {reportData.assignedTo ? reportData.assignedTo.username : "N/A"}
        </Text>
      </div>
      <Title level={5}>Case Closed On</Title>
      <div className={styles.descriptionBox}>
        <Text>{reportData.caseClosedAt ? reportData.caseClosedAt : "N/A"}</Text>
      </div>
      <Title level={5}>Missing person username</Title>
      <div className={styles.descriptionBox}>
        <Text>
          {reportData.missingCitizen
            ? reportData.missingCitizen.username
            : "N/A"}
        </Text>
      </div>
      <Title level={5}>Case Conclusion</Title>
      <div className={styles.descriptionBox}>
        <Text>
          {reportData.caseConclusion ? reportData.caseConclusion : "N/A"}
        </Text>
      </div>
    </div>
  );
};

export default MissingComplaintReport;
