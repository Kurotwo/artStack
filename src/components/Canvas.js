import React from "react";
import Sketch from "react-p5";
import io from "socket.io-client";

let socket;

const Canvas = (props) => {
  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(1000, 640).parent('canvas-layout');
    p5.background(255)

    socket = io.connect('/')
    socket.on('drawing', data => newDrawing(p5,data))
  };

  const mouseDragged = (p5, event) => {
    var data = {
        x: p5.mouseX,
        y: p5.mouseY,
        color: 255
    }

    socket.emit('drawing', data)

    p5.noStroke()
    p5.fill(0)
    p5.ellipse(p5.mouseX, p5.mouseY, 36, 36)
  }

  const draw = (p5) => {
    // p5.background(0);
    // p5.ellipse(x, y, 70, 70);
    // NOTE: Do not use setState in the draw function or in functions that are executed
    // in the draw function...
    // please use normal variables or class properties for these purposes
    // x++;

    // p5.noStroke()
    // p5.fill(255)
    // p5.ellipse(p5.mouseX, p5.mouseY, 70, 70)
  };

  const newDrawing = (p5, data) => {
    p5.noStroke()
    p5.fill(data.color)
    p5.ellipse(data.x, data.y, 36, 36)
  }

  return <Sketch setup={setup} draw={draw} mouseDragged={mouseDragged} />;
};

export default Canvas;
