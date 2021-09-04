import React, { useRef, useState } from "react";
import Sketch from "react-p5";
import io from "socket.io-client";

let socket;

const BRUSH_MODE = "brush_mode";
const RECTANGLE_MODE = "rect_mode";
const TRIANGLE_MODE = "triangle_mode";
const ELLIPSE_MODE = "ellipse_mode";

const Canvas = (props) => {
  const shapeStart = useRef({x : 0, y : 0});
  const [drawMode, setDrawMode] = useState(BRUSH_MODE)
  const [isDragging, setIsDragging] = useState(false)

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(500, 500).parent(canvasParentRef);
    p5.background(51);

    socket = io.connect('/');
    socket.on('drawing', data => newDrawing(p5,data));
  };

  const mouseDragged = (p5, event) => {
    if (drawMode === BRUSH_MODE) {
      var data = {
        x: p5.mouseX,
        y: p5.mouseY,
        color: 255,
        mode: BRUSH_MODE
      };

      socket.emit('drawing', data);
      p5.noStroke();
      p5.fill(255);
      p5.ellipse(p5.mouseX, p5.mouseY, 10, 10);
    }
  }

  const mousePressed= (p5, event) => {
    if (drawMode === RECTANGLE_MODE || drawMode === TRIANGLE_MODE
        || drawMode === ELLIPSE_MODE) {
      shapeStart.current.x = p5.mouseX;
      shapeStart.current.y = p5.mouseY;
      setIsDragging(true);
    }
  }

  const mouseReleased = (p5, event) => {
    if (isDragging) {
      // Rectangle 
      if (drawMode === RECTANGLE_MODE) {
        var width = p5.mouseX - shapeStart.current.x;
        var height = p5.mouseY - shapeStart.current.y;
        p5.noStroke();
        p5.rect(shapeStart.current.x, shapeStart.current.y, width, height);
        // Create rectangle object to be redrawn by other users
        var data = {
          x: shapeStart.current.x,
          y: shapeStart.current.y,
          width: width,
          height: height,
          color: 255,
          mode: RECTANGLE_MODE
        };
        // Emit the new object
        socket.emit('drawing', data);
      } else if (drawMode === TRIANGLE_MODE) {
      // Triangle 
        var width = p5.mouseX - shapeStart.current.x;
        var height = p5.mouseY - shapeStart.current.y;
        // Get points of the triangle
        var x1 = shapeStart.current.x;
        var x2 = shapeStart.current.x + (width / 2);
        var y1 = p5.mouseY;
        var y2 = shapeStart.current.y;
        p5.noStroke();
        p5.triangle(x1, y1, x2, y2, p5.mouseX, p5.mouseY);
        // Create triangle object to be redrawn by other users
        var data = {
          x1: x1,
          y1: y1, 
          x2: x2, 
          y2: y2, 
          x3: p5.mouseX,
          y3: p5.mouseY,
          color: 255,
          mode: TRIANGLE_MODE
        };
        // Emit the new object
        socket.emit('drawing', data);
      } else if (drawMode === ELLIPSE_MODE) {
      // Circle
        var width = p5.mouseX - shapeStart.current.x;
        var height = p5.mouseY - shapeStart.current.y;
        // Get radius center
        var x = shapeStart.current.x + (width / 2);
        var y = shapeStart.current.y + (height / 2);
        p5.noStroke();
        p5.ellipse(x, y, width, height);
        // Create ellipse object to be redrawn by other users
        var data = {
          x: x,
          y: y,
          width: width,
          height: height,
          color: 255,
          mode: ELLIPSE_MODE
        };
        // Emit the new object
        socket.emit('drawing', data);
      }
    }
    setIsDragging(false);
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
    p5.noStroke();
    p5.fill(data.color);
    if (data.mode === BRUSH_MODE) {
      p5.ellipse(data.x, data.y, 36, 36);
    } else if (data.mode === RECTANGLE_MODE) {
      p5.rect(data.x, data.y, data.width, data.height);
    } else if (data.mode === TRIANGLE_MODE) {
      p5.triangle(data.x1, data.y1, data.x2, data.y2, data.x3, data.y3);
    } else if (data.mode === ELLIPSE_MODE) {
      p5.ellipse(data.x, data.y, data.width, data.height);
    }
  }

  return (
    <div>
      <Sketch 
        setup={setup} 
        draw={draw} 
        mousePressed={mousePressed}
        mouseDragged={mouseDragged}
        mouseReleased={mouseReleased}/>
      <select onChange={(event) => setDrawMode(event.target.value)}>
        <option value={BRUSH_MODE}>Brush</option>
        <option value={RECTANGLE_MODE}>Rectangle</option>
        <option value={TRIANGLE_MODE}>Triangle</option>
        <option value={ELLIPSE_MODE}>Ellipse</option>
      </select>
    </div>
  );
};

export default Canvas;
