import ROLES from "../utils/Roles";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import request from "../utils/request";
import IUser from "../models/User";
import NavigationBar from "../components/NavigationBar";
import MissingComplaintForm from "../components/MissingComplaints/MissingComplaintForm";
import MissingComplaintReport from "../components/MissingComplaints/MissingComplaintReport";
import styles from "../styles/MissingComplaintDetailsPage.module.css";

const MissingComplaintDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const currentMissingComplaintId = useLocation().pathname.split("/")[2];
  const [missingComplaintInitialFormData, setMissingComplaintInitialFormData] =
    useState<any>();
  const [missingComplaintReportData, setMissingComplaintReportData] =
    useState();
  const [isCaseClosed, setIsCaseClosed] = useState<boolean>(false);
  const [allUsersList, setAllUsersList] = useState<IUser[]>([]);
  const currentUserRole = localStorage.getItem("role") || "";

  useEffect(() => {
    if (
      !(currentUserRole === ROLES.CITIZEN || currentUserRole === ROLES.POLICE)
    ) {
      navigate("/");
    }
    const tkn = localStorage.getItem("token");
    if (tkn == null || tkn == "") {
      navigate("/");
    }
    getAllUsersList();
    getMissingComplaintDetail();
  }, []);

  const getMissingComplaintDetail = async () => {
    const detail = await request(
      `/api/missingComplaints/complaint/${currentMissingComplaintId}`
    );
    if (detail.isCaseClosed) setIsCaseClosed(true);
    setMissingComplaintReportData(detail);
    setMissingComplaintInitialFormData({
      complaintFiledBy: detail.complaintFiledBy.username,
      complaintFiledAt: detail.complaintFiledAt,
      email: detail.email ? detail.email : "",
      name: detail.name ? detail.name : "",
      age: detail.age ? detail.age : "",
      phoneNumber: detail.phoneNumber ? detail.phoneNumber : "",
      assignedTo: detail.assignedTo ? detail.assignedTo.username : "",
      sex: detail.sex ? detail.sex : "",
      birthmark: detail.birthmark ? detail.birthmark : "",
      medications: detail.medications ? detail.medications : "",
      allergies: detail.allergies ? detail.allergies : "",
      conditions: detail.conditions ? detail.conditions : "",
      username: detail.username ? detail.username.username : "",
      height: detail.height ? detail.height : "",
      weight: detail.weight ? detail.weight : "",
    });
  };

  const getAllUsersList = async () => {
    const users = (await request("/api/users/all")) as IUser[];
    setAllUsersList(users);
  };

  return (
    <div className={styles.missingComplaintDetailsPageContainer}>
      <NavigationBar
        title={
          currentUserRole === "Police"
            ? "Missing Case Report"
            : "Missing Complaint"
        }
        showBackButton={true}
        onBack={() => {
          navigate(-1);
        }}
      />
      <div className={styles.missingComplaintFormFlexContainer}>
        {!isCaseClosed ? (
          <MissingComplaintForm
            allUsersList={allUsersList}
            MissingComplaintFormInitialValues={missingComplaintInitialFormData}
            isEditing={true}
            isMissingCasePage={false}
          ></MissingComplaintForm>
        ) : (
          <MissingComplaintReport
            reportData={missingComplaintReportData}
          ></MissingComplaintReport>
        )}
      </div>
    </div>
  );
};

export default MissingComplaintDetailsPage;
