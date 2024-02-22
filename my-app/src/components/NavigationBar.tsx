import { FunctionComponent } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import styles from "../styles/NavigationBar.module.css";

export interface IProps {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

const NavigationBar: FunctionComponent<IProps> = ({
  title,
  showBackButton,
  onBack,
}) => {
  return (
    <Layout.Header className={styles.header}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {showBackButton && (
          <Button
            type="text"
            icon={<ArrowLeftOutlined style={{ color: "white" }} />}
            onClick={onBack}
            style={{ marginRight: 16 }}
          />
        )}
        <h2 style={{ flex: 1 }}>{title}</h2>
      </div>
    </Layout.Header>
  );
};

export default NavigationBar;
