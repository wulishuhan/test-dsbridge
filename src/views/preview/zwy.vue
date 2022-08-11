<template>
  <div>
    <app-header></app-header>
    <!-- <reply-widget style="margin-top: 50px"></reply-widget> -->
    <!-- <comment-widget></comment-widget> -->
    <canvas class="myCanvas"></canvas>

    <Adsense data-ad-client="ca-pub-8955820679883171" data-ad-slot="7648853051">
    </Adsense>
  </div>
</template>
<script>
// 用来预览组件
import AppHeader from "@/components/AppHeader.vue";
// import ReplyWidget from "@/components/Comment/ReplyWidget.vue";
// import CommentWidget from "@/components/Comment/CommentWidget.vue";
import { mat4 } from "gl-matrix";
export default {
  // eslint-disable-next-line
  name: "zwy",
  components: {
    AppHeader,
    // ReplyWidget,
    // CommentWidget,
  },
  mounted() {
    let canvas = document.querySelector(".myCanvas");
    canvas.width = 1200;
    canvas.height = 800;
    canvas.style.background = "#aaa";

    var gl = canvas.getContext("webgl");

    if (!gl) {
      throw "WebGL is not support!";
    }

    const vertexShaderSource = `
    attribute vec4 aVertexPosition;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
  `;

    const fsSource = `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  `;

    const shaderProgram = this.initShaderProgram(
      gl,
      vertexShaderSource,
      fsSource
    );
    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(
          shaderProgram,
          "uProjectionMatrix"
        ),
        modelViewMatrix: gl.getUniformLocation(
          shaderProgram,
          "uModelViewMatrix"
        ),
      },
    };

    this.drawScene(gl, programInfo, this.initBuffers(gl));
  },
  methods: {
    loadShader(gl, type, source) {
      const shader = gl.createShader(type);

      // Send the source to the shader object

      gl.shaderSource(shader, source);

      // Compile the shader program

      gl.compileShader(shader);

      // See if it compiled successfully

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(
          "An error occurred compiling the shaders: " +
            gl.getShaderInfoLog(shader)
        );
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    },

    initShaderProgram(gl, vsSource, fsSource) {
      const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
      const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

      // 创建着色器程序

      const shaderProgram = gl.createProgram();
      gl.attachShader(shaderProgram, vertexShader);
      gl.attachShader(shaderProgram, fragmentShader);
      gl.linkProgram(shaderProgram);

      // 创建失败， alert
      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert(
          "Unable to initialize the shader program: " +
            gl.getProgramInfoLog(shaderProgram)
        );
        return null;
      }

      return shaderProgram;
    },
    initBuffers(gl) {
      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

      var vertices = [0, 0, 0, Math.random(), 0.7, 0];

      console.log(new Float32Array(vertices));
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vertices),
        gl.STATIC_DRAW
      );

      return {
        position: positionBuffer,
      };
    },
    drawScene(gl, programInfo, buffers) {
      gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
      gl.clearDepth(1.0); // Clear everything
      gl.enable(gl.DEPTH_TEST); // Enable depth testing
      gl.depthFunc(gl.LEQUAL); // Near things obscure far things

      // Clear the canvas before we start drawing on it.

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      // Create a perspective matrix, a special matrix that is
      // used to simulate the distortion of perspective in a camera.
      // Our field of view is 45 degrees, with a width/height
      // ratio that matches the display size of the canvas
      // and we only want to see objects between 0.1 units
      // and 100 units away from the camera.

      const fov = (45 * Math.PI) / 180; // in radians
      const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
      const zNear = 0.1;
      const zFar = 100.0;
      const projectionMatrix = mat4.create();
      // note: glmatrix.js always has the first argument
      // as the destination to receive the result.
      mat4.perspective(projectionMatrix, fov, aspect, zNear, zFar);
      console.log("fov:" + fov);
      console.log("aspect:" + aspect);
      console.log("projectionMatrix:" + projectionMatrix);
      // Set the drawing position to the "identity" point, which is
      // the center of the scene.
      const modelViewMatrix = mat4.create();

      // Now move the drawing position a bit to where we want to
      // start drawing the square.
      console.log("modelViewMatrix:", modelViewMatrix);
      mat4.translate(
        modelViewMatrix, // destination matrix
        modelViewMatrix, // matrix to translate
        [-0.0, 0.0, -6.0]
      ); // amount to translate
      console.log("modelViewMatrix:", modelViewMatrix);
      // Tell WebGL how to pull out the positions from the position
      // buffer into the vertexPosition attribute.
      {
        const numComponents = 2; // pull out 3 values per iteration
        const type = gl.FLOAT; // the data in the buffer is 32bit floats
        const normalize = false; // don't normalize
        const stride = 0; // how many bytes to get from one set of values to the next
        // 0 = use type and numComponents above
        const offset = 0; // how many bytes inside the buffer to start from
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
        // console.log(buffers);
        //绑定顶点属性数据，并且激活
        gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
        gl.vertexAttribPointer(
          programInfo.attribLocations.vertexPosition,
          numComponents,
          type,
          normalize,
          stride,
          offset
        );
      }

      // Tell WebGL to use our program when drawing

      gl.useProgram(programInfo.program);

      // Set the shader uniforms

      gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix
      );
      gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix
      );

      {
        const offset = 0;
        const vertexCount = 3;
        gl.drawArrays(gl.LINE_LOOP, offset, vertexCount);
      }
    },
    setRectangle(gl, x, y, width, height) {
      var x1 = x;
      var x2 = x + width;
      var y1 = y;
      var y2 = y + height;

      // 注意: gl.bufferData(gl.ARRAY_BUFFER, ...) 将会影响到
      // 当前绑定点`ARRAY_BUFFER`的绑定缓冲
      // 目前我们只有一个缓冲，如果我们有多个缓冲
      // 我们需要先将所需缓冲绑定到`ARRAY_BUFFER`

      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
        gl.STATIC_DRAW
      );
    },
    //生成顶点着色器需要的所有点的位置
    initVertexBuffers(gl) {
      let circleCenter = [0, 0];
      let n = 36;
      let stepAngle = 360 / n;
      let arr = [circleCenter[0], circleCenter[1]];
      for (let i = 0; i < n; i++) {
        let xy = this.getXYByIndex(i, stepAngle);
        let { x, y } = xy;
        arr.push(x);
        arr.push(y);
      }
      //如果没有下面3行代码，会出现一个缺口
      let xyRight = this.getXYByIndex(0, n);
      arr.push(xyRight.x);
      arr.push(xyRight.y);
      let verticesColors = new Float32Array(arr);
      let buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);
      let a_Position = gl.getAttribLocation(gl.program, "a_Position");
      gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(a_Position);
      return n + 2;
    },
    getXYByIndex(index, stepAngle) {
      let pai = 3.1415926;
      let circleRadius = 0.6;
      let angle = stepAngle * index;
      let angleInRadian = (angle * pai) / 180;
      let x = Math.cos(angleInRadian) * circleRadius;
      let y = Math.sin(angleInRadian) * circleRadius;
      return { x, y };
    },
  },
};
</script>
