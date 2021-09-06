import React, { useRef, useState } from "react";
import Sketch from "react-p5";
import io from "socket.io-client";

let socket;
const BRUSH_MODE = "brush";
const ERASER_MODE= "eraser";
const SHAPE_MODE = "shape";
const RECTANGLE  = "rectangle";
const TRIANGLE   = "triangle";
const ELLIPSE    = "ellipse";
const CANVAS_HEIGHT = 640;
const CANVAS_WIDTH = 1000; 

const Canvas = (props) => {
  const canvasObject = useRef(null);
  const shapeStart = useRef({x : 0, y : 0});
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    canvasObject.current = p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent('canvas-layout');
    p5.background(255);

    socket = io.connect('/');
    socket.on('drawing', data => newDrawing(p5,data));
    socket.on('update_canvas', data => {
      for (var i = 0; i < data.canvasDrawings.length; i++) {
        if (i == data.canvasDrawings.length - 1) {
          console.log("DONE");
        }
        // console.log(data.canvasDrawings[i]);
        newDrawing(p5, data.canvasDrawings[i]);
      }
      setIsLoading(false);
    });
    socket.on('max_users', () => {
      console.log("MAX USERS. FAILED TO CONNECT.");
    });
    socket.on('server_error', () => {
      console.log("SERVER ERROR.");
    })
  };

  const mouseDragged = (p5, event) => {
    if (props.mode === BRUSH_MODE || props.mode === ERASER_MODE) {
      var fillColor = props.mode === BRUSH_MODE ? `rgba(${props.color.r}, ${props.color.g}, ${props.color.b}, ${props.color.a})` : 255;
      var data = {
        x: p5.mouseX,
        y: p5.mouseY,
        brushSize: props.brushSize,
        color: fillColor,
        mode: BRUSH_MODE
      };

      socket.emit('drawing', data);
      p5.noStroke();
      p5.fill(fillColor);
      p5.ellipse(p5.mouseX, p5.mouseY, props.brushSize, props.brushSize);
    }
  }

  const mousePressed= (p5, event) => {
    if (props.shape === RECTANGLE || props.shape === TRIANGLE
        || props.shape === ELLIPSE) {
      shapeStart.current.x = p5.mouseX;
      shapeStart.current.y = p5.mouseY;
      setIsDragging(true);
    }
  }

  const mouseReleased = (p5, event) => {
    if (isDragging) {
      var fillColor = `rgba(${props.color.r}, ${props.color.g}, ${props.color.b}, ${props.color.a})`;
      // Rectangle 
      if (props.shape === RECTANGLE) {
        var width = p5.mouseX - shapeStart.current.x;
        var height = p5.mouseY - shapeStart.current.y;
        p5.noStroke();
        p5.fill(fillColor);
        p5.rect(shapeStart.current.x, shapeStart.current.y, width, height);
        // Create rectangle object to be redrawn by other users
        var data = {
          x: shapeStart.current.x,
          y: shapeStart.current.y,
          width: width,
          height: height,
          color: fillColor,
          mode: SHAPE_MODE,
          shape: RECTANGLE
        };
        // Emit the new object
        socket.emit('drawing', data);
      } else if (props.shape === TRIANGLE) {
      // Triangle 
        var width = p5.mouseX - shapeStart.current.x;
        var height = p5.mouseY - shapeStart.current.y;
        // Get points of the triangle
        var x1 = shapeStart.current.x;
        var x2 = shapeStart.current.x + (width / 2);
        var y1 = p5.mouseY;
        var y2 = shapeStart.current.y;
        p5.noStroke();
        p5.fill(fillColor);
        p5.triangle(x1, y1, x2, y2, p5.mouseX, p5.mouseY);
        // Create triangle object to be redrawn by other users
        var data = {
          x1: x1,
          y1: y1, 
          x2: x2, 
          y2: y2, 
          x3: p5.mouseX,
          y3: p5.mouseY,
          color: fillColor,
          mode: SHAPE_MODE,
          shape: TRIANGLE
        };
        // Emit the new object
        socket.emit('drawing', data);
      } else if (props.shape === ELLIPSE) {
      // Circle
        var width = p5.mouseX - shapeStart.current.x;
        var height = p5.mouseY - shapeStart.current.y;
        // Get radius center
        var x = shapeStart.current.x + (width / 2);
        var y = shapeStart.current.y + (height / 2);
        p5.noStroke();
        p5.fill(fillColor);
        p5.ellipse(x, y, width, height);
        // Create ellipse object to be redrawn by other users
        var data = {
          x: x,
          y: y,
          width: width,
          height: height,
          color: fillColor,
          mode: SHAPE_MODE,
          shape: ELLIPSE
        };
        // Emit the new object
        socket.emit('drawing', data);
      }
    }
    setIsDragging(false);
  }

  const draw = (p5) => {
  };

  // Draw the object emitted from the server 
  const newDrawing = (p5, data) => {
    p5.noStroke();
    p5.fill(data.color);
    if (data.mode === BRUSH_MODE) {
      p5.ellipse(data.x, data.y, data.brushSize, data.brushSize);
    } else if (data.mode === SHAPE_MODE) {
      if (data.shape === RECTANGLE) {
        p5.rect(data.x, data.y, data.width, data.height);
      } else if (data.shape === TRIANGLE) {
        p5.triangle(data.x1, data.y1, data.x2, data.y2, data.x3, data.y3);
      } else if (data.shape === ELLIPSE) {
        p5.ellipse(data.x, data.y, data.width, data.height);
      }
    } 
  }

  const windowResized = (p5) => {
    var newHeight = CANVAS_HEIGHT;
    var newWidth = CANVAS_WIDTH;
    if (window.innerWidth < newWidth) {
      newWidth = window.innerWidth;
      newHeight = newHeight / (CANVAS_WIDTH / newWidth);
    }

    let resized = p5.createGraphics(newWidth, newHeight);

    //Draw and scale the canvas content
    resized.image(canvasObject.current, 0, 0, newWidth, newHeight);
    
    //Manipulate the new pixels array
    resized.loadPixels();
    
    p5.resizeCanvas(newWidth, newHeight, true);
    p5.background(255);

    p5.image(resized, 0, 0);
  }

  window.addEventListener("beforeunload", (event) => 
  {  
    socket.emit('client_disconnect'); 
    socket.disconnect(); 
  });

  return (
    <div>
      <Sketch 
        setup={setup} 
        draw={draw} 
        mousePressed={mousePressed}
        mouseDragged={mouseDragged}
        mouseReleased={mouseReleased}
        windowResized={windowResized}/>
      { isLoading && <h1>LOADING</h1>}
    </div>
  );
};

export default Canvas;
