<template>
    <v-layout id="menuSection">
      <!-- 최상단 프로필 부분 start -->
      <v-list id="profile">
        <v-list-item
          prepend-avatar="giltaehyeong.jpg"
          title="GiltaeHyeong(길태형)"
          subtitle="r1605866@gmail.com"
        >
          <div id="social">
            <v-icon
              icon="mdi-github"
              @click="newWindow(`https://github.com/seulgae`)"
            />
          </div>
        </v-list-item>
      </v-list>
      <!-- 최상단 프로필 부분 end -->
  
      <v-divider></v-divider>
  
      <!-- 메뉴 item 부분 start -->
      <v-list density="compact" nav id="nav">
        <v-list-item
          prepend-icon="mdi mdi-account"
          title="이력서"
          value="blog"
          class="navItems"
        >
        </v-list-item>
        <v-list-item
          prepend-icon="mdi mdi-folder-outline"
          title="프로젝트 경험"
          value="blog"
          class="navItems"
        >
        </v-list-item>
        <v-list-item
          prepend-icon="mdi mdi-medal-outline"
          title="수상경력"
          value="blog"
          class="navItems"
        >
        </v-list-item>
      </v-list>
      <!-- 메뉴 item 부분 end -->
    </v-layout>
</template>
  
  <script>
  export default {
    name: "menuView",
    data() {
      return {};
    },
    methods: {
      newWindow(url) {
        // github url을 새 탭에서 열어주는 메서드입니다.
        window.open("about:blank").location.href = url;
      },
    },
  };
  </script>
  
  <style lang="scss">
  #menuSection {
    display: block;
    position: relative;
    // height: 90vh;
    // width: 30vh;
    background-color: rgba(3, 3, 3, 0.65);
    // border-radius: 10px;
    // padding: 10px;
    // box-shadow: 0.3em 0.3em 1em lightgray;
  
    // transition: all 10ms linear;
  
    /* v-list custom */
    .v-list {
      background-color: transparent;
      color: #1a1a1a;
  
      .v-list-item-title {
        font-weight: 400;
      }
    }
  
    /* profile section custom */
    #profile {
      width: 100%;
      margin-bottom: 10px;
  
      .v-avatar {
        width: 150px;
        height: 150px;
        background-color: ghostwhite;
      }
      .v-avatar img {
        width: 100%;
      }
      .v-avatar:hover {
        cursor: pointer;
      }
      .v-avatar:hover img {
        transition-property: all; /*모든부분 변화*/
        transition-duration: 0.2s; /*0.2s동안 변화*/
        transition-timing-function: linear; /*일정한 속도로 변화*/
        transition-delay: 0; /*즉시변화-> 0이 default값이므로 생략 가능*/
        transform: scale(1.15); /* 1.15배 크기로 변화*/
      }
  
      div#social {
        margin-top: 10px;
  
        .v-icon {
          padding: 18px !important;
          cursor: pointer;
        }
  
        .v-icon:hover {
          transition-property: all; /*모든부분 변화*/
          transition-duration: 0.2s; /*0.2s동안 변화*/
          transition-timing-function: linear; /*일정한 속도로 변화*/
          transition-delay: 0; /*즉시변화-> 0이 default값이므로 생략 가능*/
          transform: scale(1.15); /* 1.15배 크기로 변화*/
        }
      }
    }
  
    /* nav section custom */
    #nav .navItems {
      margin: 0.2rem;
      padding: 1.2rem;
      font-size: 1.2rem;
  
      .v-list-item-title {
        text-align: center;
        font-size: 1.1rem;
      }
    }
  }
  </style>