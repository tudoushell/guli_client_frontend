<template>
  <div>
    <!-- 幻灯片 开始 -->
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div
          v-for="banner in bannerList"
          :key="banner.id"
          class="swiper-slide"
          style="background: #040B1B;"
        >
          <a target="_blank" :href="banner.linkUrl">
            <img :src="banner.imageUrl" :alt="banner.title" />
          </a>
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-white"></div>
      <div
        class="swiper-button-prev swiper-button-white"
        slot="button-prev"
      ></div>
      <div
        class="swiper-button-next swiper-button-white"
        slot="button-next"
      ></div>
    </div>
    <!-- 幻灯片 结束 -->

    <div id="aCoursesList">
      <!-- 网校课程 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">热门课程</span>
            </h2>
          </header>
          <div>
            <article class="comm-course-list">
              <ul class="of" id="bna">
                <li v-for="hotCourse in hotCourseList" :key="hotCourse.id">
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <img
                        :src="hotCourse.cover"
                        class="img-responsive"
                        :alt="hotCourse.title"
                      />
                      <div class="cc-mask">
                        <a href="#" title="开始学习" class="comm-btn c-btn-1"
                          >开始学习</a
                        >
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <a
                        href="#"
                        :title="hotCourse.title"
                        class="course-title fsize18 c-333"
                        >{{ hotCourse.title }}</a
                      >
                    </h3>
                    <section class="mt10 hLh20 of">
                      <span class="fr jgTag bg-green">
                        <i
                          class="c-fff fsize12 f-fA"
                          v-if="hotCourse.price === 0"
                          >免费</i
                        >
                        <i class="c-fff fsize12 f-fA" v-else>{{
                          hotCourse.price
                        }}</i>
                      </span>
                      <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">{{ hotCourse.buyCount }}人学习</i>
                        |
                        <i class="c-999 f-fA">{{ hotCourse.viewCount }}评论</i>
                      </span>
                    </section>
                  </div>
                </li>
              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <a href="#" title="全部课程" class="comm-btn c-btn-2">全部课程</a>
            </section>
          </div>
        </section>
      </div>
      <!-- /网校课程 结束 -->
      <!-- 网校名师 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">名师大咖</span>
            </h2>
          </header>
          <div>
            <article class="i-teacher-list">
              <ul class="of">
                <li v-for="teacher in teacherList" :key="teacher.id">
                  <section class="i-teach-wrap">
                    <div class="i-teach-pic">
                      <a href="/teacher/1" title="姚晨">
                        <img
                          :alt="teacher.name"
                          :src="teacher.avatar"
                        />
                      </a>
                    </div>
                    <div class="mt10 hLh30 txtOf tac">
                      <a href="/teacher/1" title="姚晨" class="fsize18 c-666"
                        > {{teacher.name}} </a
                      >
                    </div>
                    <div class="hLh30 txtOf tac">
                      <span class="fsize14 c-999"
                        >{{teacher.career}} </span
                      >
                    </div>
                    <div class="mt15 i-q-txt">
                      <p class="c-999 f-fA">
                        {{teacher.intro}}
                      </p>
                    </div>
                  </section>
                </li>
              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <a href="#" title="全部讲师" class="comm-btn c-btn-2">全部讲师</a>
            </section>
          </div>
        </section>
      </div>
      <!-- /网校名师 结束 -->
    </div>
  </div>
</template>

<script>
import indexApi from "@/api/index";
import courseApi from "@/api/course";
import teacherApi from "@/api/teacher";
export default {
  data() {
    return {
      swiperOption: {
        //配置分页
        pagination: {
          el: ".swiper-pagination" //分页的dom节点
        },
        //配置导航
        navigation: {
          nextEl: ".swiper-button-next", //下一页dom节点
          prevEl: ".swiper-button-prev" //前一页dom节点
        }
      },
      bannerList: [],
      hotCourseList: [],
      teacherList: []
    };
  },
  created() {
    this.listBanners();
    this.listHotCourse();
    this.listTeacher();
  },
  methods: {
    listTeacher() {
      teacherApi.listTeacher().then(response => {
        this.teacherList = response.data;
      });
    },
    //列出热门课程
    listHotCourse() {
      courseApi.listCourse(1, 10, {}).then(response => {
        this.hotCourseList = response.data.items;
      });
    },
    //列出banner
    listBanners() {
      indexApi.listBanner().then(response => {
        this.bannerList = response.data;
        console.log(this.bannerList);
      });
    }
  }
};
</script>
