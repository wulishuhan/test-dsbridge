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
