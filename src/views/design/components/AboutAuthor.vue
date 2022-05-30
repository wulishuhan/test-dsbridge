<template>
  <div class="about">
    <p>About</p>
    <span><a href="">www.baidu.com</a></span>
    <p>I AM A...</p>
    <span>Designer, Maker</span>
    <p>3D Design Skill Level</p>
    <span>intermediate</span>
    <p>Tools I Use</p>
    <span>Printer: Ortur Obsdian</span>
    <span>Software: Sketchup,Photoshop</span>
  </div>
</template>
<script>
export default {
  name: "AboutAuthor",
};
</script>
<style lang="scss" scoped>
.about {
  margin-top: 20px;
  width: 300px;
  height: 361px;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  p {
    font-size: 18px;
    font-weight: 400;
    margin-top: 15px;
  }
  span {
    color: #555;
    font-size: 12px;
  }
}
</style>
