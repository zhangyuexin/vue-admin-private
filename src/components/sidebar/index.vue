<template>
  <div class="container">
    <el-menu :default-active="defaultActive" class="left-menu-vertical" :collapse="isCollapse" :unique-opened="true" background-color="#262E30" text-color="#b9c1c8" :active-text-color="theme" style="overflow-y: auto">
      <div class="menu_operation">
        <i class="iconfont icon-Artboard" @click="setIsCollapse" v-show="isCollapse"></i>
        <i class="iconfont icon-ArtboardCopy9" @click="setIsCollapse" v-show="!isCollapse"></i>
      </div>
      <!-- 二级菜单开始 -->
      <el-submenu class="menu-submenu" v-for="(item,index) in handelDistinguishMenu(menuList,'option')" :index="item.id" :key="index" :style="!isCollapse ?{padding: '0 10px'}:{padding: '0'}">
        <template slot="title">
          <!-- 父级菜单图标 -->
          <i :class="'iconfont ' + item.icon"></i>
          <!-- 父级菜单名称 -->
          <span slot="title">{{item.label}}</span>
        </template>
        <el-menu-item class="menu-item" v-for="(itemChild,index) in item.children" :index="itemChild.id" :key="index" style="width: calc(100% + 10px)" @click="open('option',itemChild,item)">
          <!-- 菜单图标 -->
          <i :class="'iconfont ' + itemChild.icon"></i>
          <!-- 菜单名称 -->
          <span>{{itemChild.label}}</span>
          <!-- 菜单右侧光条 -->
          <span class="sparkle" :style="{borderRight:`4px solid ${theme}`}" v-show="defaultActive==itemChild.id"></span>
        </el-menu-item>
      </el-submenu>
      <!-- 二级菜单结束 -->
      <!-- 一级菜单开始 -->
      <el-menu-item class="menu-item" v-for="item in handelDistinguishMenu(menuList,'menu')" :index="item.id" :key="item.id" @click="open('menu',item)">
        <!-- 菜单图标 -->
        <i :class="'iconfont ' + item.icon"></i>
        <!-- 菜单名称 -->
        <span slot="title">{{item.label}}</span>
        <!-- 菜单右侧光条 -->
        <span class="sparkle" :style="{borderRight: `4px solid ${theme}`}" v-show="defaultActive == item.id"></span>
      </el-menu-item>
      <!-- 一级菜单结束 -->
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { setStore, getStore, removeStore } from '@/utils/store'
import bus from '@/utils/bus'

export default {
  data () {
    return {
      menuList: [],
      isCollapse: false,
      defaultActive: ''
    }
  },
  computed: {
    ...mapGetters([
      'sidebarList',
      'theme',
      'routerList',
      'topMenuList',
      'common'
    ])
  },
  created () {
    this.getMenu()
  },
  mounted () {
  },
  methods: {
    // 左侧导航条伸缩
    setIsCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 跳转页面 添加TAG
    open (type, itemChild, item) {
      if (itemChild.type === 'menu') {
        this.defaultActive = itemChild.id
        // this.$router.push(itemChild.viewPath ? { path: itemChild.viewPath, params: {} } : '/cantFind')
        this.$router.push('/cantFind')

      }

      // if (!!item) {
      //   let index = this.sidebarList.find(item => item.id == itemChild.parentId).parentId;
      //   setStore({ name: 'activeIndex', content: index, type: 'session' })
      //   this.$store.commit('SET_ACTIVE_INDEX', index)
      //   // console.log('002');
      //   // console.log('任生关死劫轻轻送',index)
      // } else {
      //   setStore({ name: 'activeIndex', content: itemChild.parentId, type: 'session' })
      //   this.$store.commit('SET_ACTIVE_INDEX', itemChild.parentId)
      //   // console.log('003');
      //   // console.log('千般色相偏看重',itemChild.parentId)
      // }
      // // 根据菜单类型拼装数据
      // let query = {
      //   defaultActive: itemChild.id,
      //   defaultActivePath: itemChild.href,
      //   activeIndex: (status == 1) ? itemChild.parentId : item.id + '/father'
      // }
      // // 验证菜单类型获取默认展示Id
      // if (query.activeIndex.indexOf('father') != -1) {
      //   // console.log(query.activeIndex,'dd')
      //   let id = query.activeIndex.split('/')[0]
      //   this.topMenuList.forEach(value => {
      //     value.children.forEach(val => {
      //       if (val.id == id)
      //         query.activeIndex = value.id
      //     })
      //   })
      // }
      // // console.log(query.activeIndex,'22')
      // // 验证菜单是否可以跳转  不可跳转跳转到404页面
      // if (this.routerList.indexOf(itemChild.href) != -1) {
      //   this.$store.commit("SET_DEFAULT_ACTIVE", { id: itemChild.id, value: itemChild.href });
      //   // console.log('101');

      //   this.$store.commit('ADD_TAG', {
      //     label: itemChild.label,
      //     value: itemChild.href,
      //     params: {},
      //     query: query,
      //     close: true
      //   });
      //   // console.log(itemChild.href,"ddddddddddddddddddddd多帶點")
      //   this.$router.push({ path: itemChild.href, params: query })
      // } else {
      //   this.$store.commit("SET_DEFAULT_ACTIVE", { id: itemChild.id, value: '/cantFind' });
      //   // console.log('102');
      //   this.$router.push('/cantFind')
      // }
    },
    getMenu () {
      bus.$on('top_menu', e => {
        this.menuList = e
      })
    },
    handelDistinguishMenu (data, type) {
      return data.filter(e => e.type === type)
    }
  }
}
</script>

<style scoped lang="scss">
.el-menu--popup {
  padding: 0px !important;
}
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .left-menu-vertical {
    height: 100%;
  }
  .menu_operation {
    height: 40px;
    line-height: 40px;
    text-align: right;
    .iconfont {
      cursor: pointer;
      color: #fff;
      padding-right: 10px;
    }
  }
  .menu-item {
    position: relative;
  }
  .sparkle {
    display: inline-block;
    height: 100%;
    position: absolute;
    right: 0;
  }
}
</style>
