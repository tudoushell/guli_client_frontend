<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li @click="isAllSubject" :class="isAllStyle ? 'current' : ''">
                  <a title="全部" href="#">全部</a>
                </li>
                <li
                  :class="index === clickIndex ? 'current' : ''"
                  v-for="(subject, index) in subjects"
                  :key="index"
                >
                  <a
                    @click="isCurrent(index, subject.id)"
                    :title="subject.title"
                    href="#"
                  >
                    {{ subject.title }}
                  </a>
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li
                  :class="index === subIndex ? 'current' : ''"
                  v-for="(subSubject, index) in subSubjects"
                  :key="index"
                >
                  <a
                    @click="chooseSubSuject(index)"
                    :title="subSubject.title"
                    href="#"
                  >
                    {{ subSubject.title }}
                  </a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li>
                <a title="关注度" href="#">关注度</a>
              </li>
              <li>
                <a title="最新" href="#">最新</a>
              </li>
              <li class="current bg-orange">
                <a title="价格" href="#"
                  >价格&nbsp;
                  <span>↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="courseList.length == 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam"
              >没有相关数据，小编正在努力整理中...</span
            >
          </section>
          <!-- /无数据提示 结束-->
          <article class="comm-course-list">
            <ul class="of" id="bna">
              <li v-for="course in courseList" :key="course.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img
                      :src="course.cover"
                      class="img-responsive"
                      alt="听力口语"
                    />
                    <div class="cc-mask">
                      <a title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a
                      :href="'/course/' + course.id"
                      :title="course.title"
                      class="course-title fsize18 c-333"
                      >{{ course.title }}</a
                    >
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span
                      v-if="Number(course.price) === 0"
                      class="fr jgTag bg-green"
                    >
                      <i class="c-fff fsize12 f-fA">免费 </i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{ course.buyCount }}人学习</i>
                      |
                      <i class="c-999 f-fA">{{ course.viewCount }}评论</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <a
              :class="{ undisable: !hasPrevious }"
              @click.prevent="gotoPage(1)"
              href="#"
              title="首页"
              >首</a
            >
            <a
              :class="{ undisable: !hasPrevious }"
              @click.prevent="gotoPage(current - 1)"
              href="#"
              title="前一页"
              >&lt;</a
            >
            <a
              v-for="page in pages"
              v-bind:key="page"
              :class="{
                current: current == page,
                undisable: current == page
              }"
              @click.prevent="gotoPage(page)"
              href="#"
              :title="'第' + page + '页'"
              >{{ page }}</a
            >
            <a
              :class="{ undisable: !hasNext }"
              @click.prevent="gotoPage(current + 1)"
              href="#"
              title="后一页"
              >&gt;</a
            >
            <a
              :class="{ undisable: !hasNext }"
              @click.prevent="gotoPage(pages)"
              href="#"
              title="末页"
              >末</a
            >
            <div class="clear"></div>
          </div>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import courseApi from "@/api/course";
export default {
  data() {
    return {
      subjects: [],
      subSubjects: [],
      clickIndex: -1,
      isAllStyle: false,
      subIndex: -1,
      courseList: [],
      courseQueryDto: {},
      hasPrevious: true,
      current: 1,
      pages: 1
    };
  },
  created() {
    this.listSubject();
    this.listCourse();
  },
  methods: {
    gotoPage(page) {
      courseApi.listCourse(page, 8).then(response => {
        this.coursePagination(response);
      });
    },
    //列出课程
    listCourse() {
      courseApi.listCourse(1, 8, this.courseQueryDto).then(response => {
        this.coursePagination(response);
      });
    },
    coursePagination(response) {
      this.courseList = response.data.items;
      this.hasPrevious = response.data.hasPrevious;
      this.current = response.data.current;
      let pages = Math.floor(response.data.total / 8);
      this.pages = pages === 0 ? 1 : pages;
    },
    //选择sub课程，添加样式
    chooseSubSuject(index) {
      this.subIndex = index;
    },
    //列出全部课程分类
    isAllSubject() {
      this.subSubjects = [];
      this.clickIndex = -1;
      this.isAllStyle = true;
      let i = 0;
      this.subjects.forEach(subject => {
        subject.children.forEach(subSubject => {
          this.subSubjects[i++] = subSubject;
        });
      });
    },
    //列出当前点击的课程
    isCurrent(index, subjectId) {
      this.subIndex = -1;
      this.isAllStyle = false;
      this.clickIndex = index;
      this.subjects.forEach(subject => {
        if (subject.id === subjectId) {
          this.subSubjects = subject.children;
        }
      });
    },
    //列出课程分类
    listSubject() {
      courseApi.listSubjectCategory().then(response => {
        this.subjects = response.data;
      });
    }
  }

  //   asyncData({ params, error }) {
  //     return course.getPageList(1, 8).then(response => {
  //       console.log(response);
  //       return { data: response.data.data }
  //     })
  //   },
  //   methods: {
  //     gotoPage(page){
  //         course.getPageList(page, 8).then(response => {
  //             this.data = response.data.data
  //         })
  //     }
  //   }
};
</script>
