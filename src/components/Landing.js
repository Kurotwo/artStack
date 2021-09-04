import React, { useState } from "react";
import { Layout, Button, Drawer } from "antd";
import Canvas from "./Canvas";
import "./landing.css";
import { ToolFilled } from "@ant-design/icons";

const Landing = () => {
  const [brushSize, setBrushSize] = useState(25);
  const [visible, setVisible] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Button
        size="large"
        type="primary"
        shape="circle"
        icon={<ToolFilled />}
        onClick={() => setVisible(true)}
        style={{ position: "absolute", top: "2rem", left: "2rem" }}
      />
      <Drawer
        title="Settings"
        placement="right"
        onClose={() => setVisible(false)}
        visible={visible}
        mask={false}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
      <Layout id="canvas-layout" style={{ width: "100%" }}>
        <Canvas />
      </Layout>
    </Layout>
  );
};

export default Landing;
