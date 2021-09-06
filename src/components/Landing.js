import React, { useState, useEffect, useContext } from "react";
import { UserContext } from '../providers/UserProvider';
import { Redirect, useHistory } from 'react-router-dom';
import { logOut } from "../services/firebase";
import {
  Layout,
  Button,
  Drawer,
  Divider,
  Row,
  Col,
  Slider,
  InputNumber,
  Radio,
} from "antd";
import Canvas from "./Canvas";
import "./landing.css";
import { ToolFilled } from "@ant-design/icons";
import { CirclePicker } from "react-color";
import {
  BsFillSquareFill,
  BsFillCircleFill,
  BsFillTriangleFill,
} from "react-icons/bs";
import { FaEraser, FaBrush } from "react-icons/fa";

const colorOptions = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#607d8b",
  "#000000",
  "#ffffff",
];

const BRUSH_MODE = "brush";
const ERASER_MODE= "eraser";
const SHAPE_MODE = "shape";
const RECTANGLE  = "rectangle";
const TRIANGLE   = "triangle";
const ELLIPSE    = "ellipse";

const Landing = (props) => {
  const [brushSize, setBrushSize] = useState(25);
  const [visible, setVisible] = useState(false);
  const [color, setColor] = useState({ r: 0, g: 0, b: 0, a: 1 });
  const [shape, setShape] = useState("");
  const [mode, setMode] = useState(BRUSH_MODE);
  const user = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  // const history = useHistory();

  useEffect(() => {
    console.log(user)
    if (!user) {
      setRedirect("/");
    }
  }, [user]);

  if (redirect) {
    return <Redirect to={redirect} />;
    // history.push(redirect)
  }
  
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
        bodyStyle={{ backgroundColor: "#FAFAFA" }}
        headerStyle={{ backgroundColor: "#FAFAFA" }}
      >
        <Radio.Group
          buttonStyle="solid"
          style={{ display: "flex" }}
          onChange={(e) => {
            setMode(e.target.value);
            setShape("");
          }}
          value={mode}
        >
          <Radio.Button style={{ width: "50%" }} value={BRUSH_MODE}>
            <FaBrush /> Brush
          </Radio.Button>
          <Radio.Button style={{ width: "50%" }} value={ERASER_MODE}>
            <FaEraser /> Eraser
          </Radio.Button>
        </Radio.Group>

        <Divider orientation="left">Brush Size</Divider>
        <Row>
          <Col span={16}>
            <Slider
              min={1}
              max={100}
              onChange={(val) => setBrushSize(val)}
              value={typeof brushSize === "number" ? brushSize : 1}
            />
          </Col>
          <Col span={2}>
            <InputNumber
              min={1}
              max={100}
              style={{ width: "72px" }}
              value={brushSize}
              formatter={(value) => `${value}px`}
              onChange={(val) => setBrushSize(val)}
            />
          </Col>
        </Row>

        <Divider orientation="left">Color Picker</Divider>
        <CirclePicker
          width={220}
          colors={colorOptions}
          color={color}
          onChangeComplete={(color) => setColor(color.rgb)}
        />

        <Divider orientation="left">Shape</Divider>

        <Radio.Group
          buttonStyle="solid"
          style={{ display: "flex" }}
          onChange={(e) => {
            setShape(e.target.value);
            setMode(SHAPE_MODE);
          }}
          value={shape}
        >
          <Radio.Button
            style={{
              width: "48px",
              height: "48px",
              display: "grid",
              placeItems: "center",
            }}
            value={ELLIPSE}
          >
            <BsFillCircleFill width={36} />
          </Radio.Button>
          <Radio.Button
            style={{
              width: "48px",
              height: "48px",
              display: "grid",
              placeItems: "center",
            }}
            value={RECTANGLE}
          >
            <BsFillSquareFill width={36} />
          </Radio.Button>
          <Radio.Button
            style={{
              width: "48px",
              height: "48px",
              display: "grid",
              placeItems: "center",
            }}
            value={TRIANGLE}
          >
            <BsFillTriangleFill width={36} />
          </Radio.Button>
        </Radio.Group>

        <Divider orientation="left">Account Setting</Divider>
        <Button block onClick={logOut}>
          Logout
        </Button>
      </Drawer>
      <Layout id="canvas-layout" style={{ width: "100%" }}>
        <Canvas brushSize={brushSize} color={color} mode={mode} shape={shape} socket={props.socket}/>
      </Layout>
    </Layout>
  );
};

export default Landing;
