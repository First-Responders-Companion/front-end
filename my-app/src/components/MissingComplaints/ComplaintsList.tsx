import { useNavigate } from "react-router-dom";
import { List, Typography } from "antd";
import { RightOutlined } from "@ant-design/icons";
import moment from "moment";
import styles from "../../styles/ComplaintsList.module.css";

const { Text } = Typography;

// eslint-disable-next-line react/prop-types
const ComplaintsList: React.FC<{ data: any[]; isMissingCasePage: boolean }> = ({
  data,
  isMissingCasePage,
}) => {
  const navigate = useNavigate();
  return (
    <List
      id="complaints-list"
      size="large"
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <div
            className={styles.complaintsListItem}
            onClick={() => navigate(item._id)}
          >
            <div className={styles.clickableDiv}>
              <div>{item.name}</div>
              <Text>
                {isMissingCasePage
                  ? moment(item.caseClosedAt).format("D MMM YYYY")
                  : moment(item.complaintFiledAt).format("D MMM YYYY")}
              </Text>
              <RightOutlined />
            </div>
          </div>
        </List.Item>
      )}
    />
  );
};
export default ComplaintsList;
