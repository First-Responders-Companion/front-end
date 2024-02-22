import React from "react";
import { FunctionComponent } from "react";
import { Layout } from "antd";
import styles from "../styles/NavigationBar.module.css";

export interface IProps {
  title: string;
}

const NavigationBar: FunctionComponent<IProps> = ({ title }) => {
  return (
    <Layout.Header className={styles.header}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 style={{ flex: 1 }}>{title}</h2>
      </div>
    </Layout.Header>
  );
};

export default NavigationBar;
