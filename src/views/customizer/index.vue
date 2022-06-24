<template>
  <div>
    <header>
      <div class="header-center-content">
        <div>
          <el-row>
            <el-col :span="2">
              <p>
                <el-image :src="url"></el-image>
              </p>
            </el-col>
            <el-col :span="21" :offset="1">
              <h3>WELCOME TO CUSTOMIZER</h3>
              <p>
                Customizer is the easiest way to take great 3D printable designs
                and make them your own.
              </p>
              <p>
                <i class="el-icon-caret-bottom"></i>How do I use Customizer?
              </p>
            </el-col>
          </el-row>
        </div>
        <div class="header-content-right-text">
          <p>Make Your Designs</p>
          <a href="#CUSTOMIZABLE"
            ><h3>CUSTOMIZABLE<i class="el-icon-caret-bottom"></i></h3
          ></a>
        </div>
      </div>
    </header>
    <section class="customizer-featured">
      <div class="center-content featured-content">
        <el-row>
          <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
            <h2>Featured Customizer</h2>
            <el-image
              :fit="'fill'"
              :src="'https://s3.amazonaws.com/thingiverse-resources/Cuztomizable-Prosthetic.jpg'"
            ></el-image>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
            <h2>Customizer Versions</h2>
            <el-image
              :src="'https://cdn.thingiverse.com/renders/8c/14/d6/7c/7f/220d7405c1d88652226a850ab055783b_display_medium.jpg'"
            >
            </el-image>
            <el-image
              :src="'https://cdn.thingiverse.com/renders/ea/93/00/06/8d/54578611656798245210940077c32ced_display_medium.jpg'"
            >
            </el-image>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
            <p>
              <a href="#" class="featured-name"
                >THE UNLIMBITED ARM V2.1 - ALFIE EDITION</a
              >
              by
              <a href="">Team_UnLimbited</a>
              Jul 14, 2016
            </p>
            <p>
              <a href="#">@Team_UnLimbited'</a>
              <b>s UnLimbited Arm 2.0 - Alfie Edition</b>
              is a remarkable design that properly scales a prosthetic arm to a
              recipient's real world measurements. Read on, get inspired, then
              fire up Customizer to see the magic happen.
            </p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
            <el-button type="primary" class="img-btn"
              >Open in Customizer</el-button
            >
          </el-col>
        </el-row>
      </div>
    </section>
    <section class="customizer-explore">
      <div class="customizer-explore-content center-content">
        <h1>Explore Customizers</h1>
        <p>Discover the best Customizers on Thingiverse.</p>
        <div class="customizer-explore-header">
          <h2>Popular</h2>
          <a href="" class="read-more">See more</a>
        </div>
        <el-row>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8"
            ><popular-card></popular-card
          ></el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8"
            ><popular-card></popular-card
          ></el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8"
            ><popular-card></popular-card
          ></el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <show-card></show-card>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <show-card></show-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <show-card></show-card>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <show-card></show-card>
          </el-col>
        </el-row>
      </div>
    </section>
    <section class="customizer-what-is">
      <div class="center-content">
        <h1>HOW DO I USE CUSTOMIZER?</h1>
        <p>
          Check for the 'Customize' button on a Thing page. Launch the
          'Customizer App'. Adjust settings. 'Create Thing'. Download, print,
          and share.
        </p>
        <img
          class="mac"
          src="https://cdn.thingiverse.com/site/img/customizer/mac.jpg"
        />
        <el-carousel height="275px" indicator-position="outside">
          <el-carousel-item v-for="(item, index) in slideImg" :key="index">
            <el-image :src="item.url" :alt="item.alt"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
    </section>
    <section class="customizer-contribute">
      <div id="CUSTOMIZABLE" class="center-content">
        <h3>CONTRIBUTE</h3>
        <p>
          Make your OpenSCAD designs infinitely more valuable by empowering the
          community to customize them.
        </p>
        <el-row>
          <el-col
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
            :xl="8"
            class="justify-circles"
          >
            <img
              class="circles"
              src="https://cdn.thingiverse.com/site/img/customizer/step1.png"
            />
            <p>step1</p>
            <p>Make an OpenSCAD file for Customizer</p></el-col
          >
          <el-col
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
            :xl="8"
            class="justify-circles"
          >
            <img
              class="circles"
              src="https://cdn.thingiverse.com/site/img/customizer/step2.png"
            />
            <p>step2</p>
            <p>Upload to Thingiverse</p></el-col
          >
          <el-col
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
            :xl="8"
            class="justify-circles"
          >
            <img
              class="circles"
              src="https://cdn.thingiverse.com/site/img/customizer/step3.png"
            />
            <p>step3</p>
            <p>Publish</p></el-col
          >
        </el-row>
        <div class="justify-cta">
          <div class="create-cta cta">
            <h4>Create your own Customizer</h4>
            <p>
              Learn how to create your own Customizer by learning
              <a href="#">OpenSCAD</a>
              or view the OpenSCAD to Customizer
              <a href="#">documentation</a>.
            </p>
          </div>
          <div class="join-cta cta">
            <h4 class="justify-join-cta-icon">
              <div class="join-cta-icon"></div>
              <div>Join the Community</div>
            </h4>
            <p>
              The Thingiverse
              <a href="#">OpenSCAD group</a>
              is a great place to start topic threads, share Things made with
              OpenSCAD, and receive answers to questions about this design tool.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import PopularCard from "./components/PopularCard";
import ShowCard from "./components/ShowCard";
export default {
  // eslint-disable-next-line
  name: "Customizer",
  components: { PopularCard, ShowCard },
  data() {
    return {
      url: "https://cdn.thingiverse.com/site/img/customizer/customizer_logo.png",
      slideImg: [
        {
          url: "https://cdn.thingiverse.com/site/img/customizer/img_01.jpg",
          alt: "Slideshow Image 1",
        },
        {
          url: "https://cdn.thingiverse.com/site/img/customizer/img_02.jpg",
          alt: "Slideshow Image 2",
        },
        {
          url: "https://cdn.thingiverse.com/site/img/customizer/img_03.jpg",
          alt: "Slideshow Image 3",
        },
        {
          url: "https://cdn.thingiverse.com/site/img/customizer/img_04.jpg",
          alt: "Slideshow Image 4",
        },
        {
          url: "https://cdn.thingiverse.com/site/img/customizer/img_05.jpg",
          alt: "Slideshow Image 5",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
header {
  background-color: #72b878;
  color: #fff;
  overflow: hidden;
  padding: 40px 0;
}
section {
  padding: 40px 0;
  display: block;
  color: #666;
}
.header-center-content {
  margin: 0 auto;
  box-sizing: border-box;
  width: 970px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-around;
}
.center-content {
  margin: 0 auto;
  box-sizing: border-box;
  width: 970px;
}
.customizer-featured {
  padding: 40px 0;
  width: 100%;
  height: 501px;
  display: block;
  color: #666;
  background: url(https://cdn.thingiverse.com/site/img/customizer/tilingBackground_24bit.png)
    #f5f5f5;
  .featured-content {
    height: 501px;
    font-size: 11px;
    h2 {
      font-family: "AntennaLight", Helvetica, Arial, sans-serif;
      font-weight: normal;
      font-size: 18px;
      margin: 0 0 6px;
      color: #666;
    }
    .featured-name {
      font-size: 20px;
      font-weight: bold;
    }
    a {
      color: #248bfb;
      text-decoration: none;
    }
  }
}
.img-btn {
  background: url(https://cdn.thingiverse.com/site/img/customizer/customizer_logo.png)
    22px center no-repeat #248bfb;
  width: 300px;
  height: 50px;
  margin-top: 20px;
  font-size: 16px;
}
.customizer-explore {
  width: 100%;
  .customizer-explore-content {
    height: 100%;
    .customizer-explore-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .read-more {
        text-decoration: none;
        color: #248bfb;
      }
    }
  }
}
.customizer-what-is {
  background-color: #72b878;
  color: #fff;
  height: 580px;
}
.customizer-contribute {
  background: url(https://cdn.thingiverse.com/site/img/customizer/tilingBackground_24bit_dark.png)
    repeat-x;
  background-color: #666;
  color: #fff;
  background-position: bottom;
  .circles {
    width: 185px;
    height: 185px;
    border-radius: 50%;
    background-position: center;
  }
  .justify-circles {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
  }
}
.justify-cta {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
}
.cta {
  box-sizing: border-box;
  width: 460px;
  height: 140px;
  padding: 10px;
  background-color: #fff;
  border: #ccc solid 2px;
  color: #666;
  font-size: 14px;
  h4 {
    margin: 4px 0 10px 0;
    font-size: 18px;
    font-weight: 600;
  }
  a {
    color: #248bfb;
  }
  .create-cta {
    margin: 0 auto 20px auto;
  }
  .join-cta-icon {
    background: url(https://cdn.thingiverse.com/site/img/customizer/chat_icon.png);
    width: 26px;
    height: 26px;
  }
  .justify-join-cta-icon {
    display: inline-flex;
  }
}
.el-carousel {
  position: relative;
  top: -440px;
  left: 35px;
  width: 486px;
}
.header-content-right-text {
  a {
    text-decoration: none;
    color: #fff;
  }
}
@media screen and (max-width: 768px) {
  .header-center-content {
    width: 100%;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .header-content-right-text {
    margin-left: 60px;
  }
  .center-content {
    width: 100%;
  }
  .mac {
    width: 100%;
  }
  .el-carousel {
    width: 100%;
    top: 0px;
    left: 0px;
  }
  .justify-cta {
    flex-wrap: wrap;
  }
  .cta {
    width: 100%;
  }
  .el-image {
    width: 100%;
  }
}
</style>
