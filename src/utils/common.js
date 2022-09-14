export function throttle(func, delay) {
  delay = delay || 1000;
  var previousDate = new Date();
  var previous = previousDate.getTime(); // 初始化一个时间，也作为高频率事件判断事件间隔的变量，通过闭包进行保存。

  return function (...args) {
    var context = this;
    var nowDate = new Date();
    var now = nowDate.getTime();
    if (now - previous >= delay) {
      // 如果本次触发和上次触发的时间间隔超过设定的时间
      func.apply(context, args); // 就执行事件处理函数 （eventHandler）
      previous = now; // 然后将本次的触发时间，作为下次触发事件的参考时间。
    }
  };
}

export function debounce(func, delay) {
  var timer = null;
  return function (...args) {
    if (timer !== null) {
      clearTimeout(timer);
    }
    var context = this;
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

/**
 * W：宽
 * H：高
 * borderWidth：border宽
 * borderColor：border颜色
 * color：背景颜色
 * textColor：文字颜色
 * fontText：圆内的文字
 *  */
export function createCanvas(
  W,
  H,
  borderWidth,
  borderColor,
  color,
  textColor,
  fontText
) {
  var canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  // 画圆
  ctx.arc(W / 2, H / 2, 55, 0, Math.PI * 2, true);
  ctx.closePath();
  // 填充背景颜色
  ctx.fillStyle = color;
  ctx.fill();

  // 填充边框颜色
  ctx.lineWidth = borderWidth;
  ctx.lineCap = "round";
  ctx.strokeStyle = "red";
  ctx.stroke(); //

  // 填充文字颜色
  ctx.font = "20px Arial";
  ctx.fillStyle = textColor;
  ctx.textAlign = "center";
  ctx.fillText(fontText, (W + borderWidth) / 2, (H + borderWidth * 2) / 2);
  // 转base64
  let res = canvas.toDataURL("image/jpeg", 1);
  return res;
}
