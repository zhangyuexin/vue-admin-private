<template>
  <div class="container">
    <div class="tags_box" ref="tagBox">
      <div class="tags-list" ref="tagsList" @click="hadelMouseUp" @mousemove="hadelMouse" @mousedown="hadelMousestart"
           @touchup="hadelMouseUp" @touchmove="hadelMouse" @touchstart="hadelMousestart">
        <div class="tag-item is-active" :name="item.value" v-for="(item,index) in tagList" :key="index"
             v-if="isObjectValueEqual(item,tag)" v-show="item.value!='/student/welcom'" @click="openUrl(item)"
             :style="{color: theme,borderColor: theme}">
          <i class="iconfont icon-dian-copy-copy tag-text">
            {{item.label}}
          </i>
          <i class="el-icon-close" @click.stop="closeTag(item)" v-if="item.close"></i>
        </div>
        <div class="tag-item" :name="item.value" :key="index"
             v-else v-show="item.value!='/student/welcom'" @click="openUrl(item)">
          <i class="iconfont icon-dian-copy-copy tag-text">
            {{item.label}}
          </i>
          <i class="el-icon-close" @click.stop="closeTag(item)" v-if="item.close"></i>
        </div>
      </div>
      <el-dropdown class="more" @visible-change="buttonDropdown">
        <el-button class="operation_green" type="primary">
          更多
          <i class="el-icon-arrow-down el-icon--right" v-if="buttonDropdownStatus"></i>
          <i class="el-icon-arrow-up el-icon--right" v-else></i>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="min-width:100px;">
          <el-dropdown-item @click.native="closeOthersTags" @mouseover.native="updateStyle('close',true)"
                            @mouseout.native="updateStyle('close',false)" ref="close">关闭其他
          </el-dropdown-item>
          <el-dropdown-item @click.native="closeAllTags">关闭全部</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {isObjectValueEqual} from '@/utils/util'

  export default {
    data() {
      return {
        buttonDropdownStatus: false,
        tagBodyLeft: 0,
        lock: false,
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0
      };
    },
    filters: {},
    created() {

    },
    mounted() {
    },
    computed: {
      ...mapGetters([
        'tagList',
        'tag',
        'theme',
        'userData'
      ]),
    },
    watch: {
      // 设置滑动距离
      tagBodyLeft(value) {
        this.$refs.tagsList.style.left = (value > 0) ? 0 : value + 'px'
      },
      tagList() {
        // console.log('tagList', this.tagList)
      },
    },
    methods: {
      // 获取滑动开始位置 X轴 Y轴
      hadelMousestart(e) {
        this.lock = true
        if (e.clientX && e.clientY) {
          this.startX = e.clientX
          this.startY = e.clientY
        } else {
          this.startX = e.changedTouches[0].pageX
          this.startY = e.changedTouches[0].pageY
        }
      },
      // 计算滑动距离
      hadelMouse(e) {
        const boundarystart = 0,
          boundaryend =
            this.$refs.tagsList.offsetWidth - this.$refs.tagBox.offsetWidth + 100
        if (!this.lock) {
          return
        }
        //鼠标滑动
        if (e.clientX && e.clientY) {
          this.endX = e.clientX
          this.endY = e.clientY
          // 触摸屏滑动
        } else {
          // 获取滑动屏幕时的X,Y
          this.endX = e.changedTouches[0].pageX
          this.endY = e.changedTouches[0].pageY
        }
        // 获取滑动距离
        let distanceX = this.endX - this.startX
        distanceX = parseInt(distanceX * 0.8)
        // 判断滑动方向——向右滑动
        if (distanceX > 0 && this.tagBodyLeft < boundarystart) {
          this.tagBodyLeft = this.tagBodyLeft + distanceX
          // 判断滑动方向——向左滑动
        } else if (distanceX < 0 && this.tagBodyLeft >= -boundaryend) {
          this.tagBodyLeft = this.tagBodyLeft + distanceX
        }
      },
      // 判断滑动位置手否允许滑动
      hadelMouseUp() {
        let e = window.event
        if (e.clientY > 80 && e.clientY < 140) {
          this.lock = !this.lock
        } else {
          this.lock = false
        }
      },
      isObjectValueEqual(a, b) {
        return isObjectValueEqual(a, b)
      },
      closeTag(tag) {
        const key = this.tagList.findIndex(item => item.value === tag.value);
        this.$store.commit('DEL_TAG', tag)
        if (tag.value === this.tag.value) {
          // 如果关闭本标签让前推一个
          tag = this.tagList[key === 0 ? key : key - 1]
          this.$store.commit('SET_TAG', tag)
          this.openUrl(tag)
        }
      },
      openUrl(item) {
        console.log(item,'tag')
        // set顶部选中
        // if (this.userData.applicationId == 'YY_68d206c2e79342dd9438a16fafd9c5d6' && item.label == "首页") {
        //   this.$router.push('/welcome')
        //   return
        // }
        this.$store.commit("SET_ACTIVE_INDEX", item.query.activeIndex)
        console.log('004');
        this.$store.commit("SET_DEFAULT_ACTIVE", {
          parentId: item.query.activeIndex,
          id: item.query.defaultActive,
          value: item.query.defaultActivePath
        });
        this.$store.commit('SET_TAG', item)
        this.$router.push({
          path: item.value,
          query: item.query
        })
      },
      updateStyle(ref, status) {
        if (status) {
          this.$refs[ref].$el.style.color = this.theme
          this.$refs[ref].$el.style.backgroundColor = '#f2f2f2'
        } else {
          this.$refs[ref].$el.style.color = '#606266'
          this.$refs[ref].$el.style.backgroundColor = '#fff'
        }
      },
      buttonDropdown(status) {
        this.buttonDropdownStatus = status
      },
      closeOthersTags() {
        this.$store.commit('DEL_TAG_OTHER')
        this.tagBodyLeft = 0
      },
      closeAllTags() {
          this.$store.commit('DEL_ALL_TAG')
          this.tagBodyLeft = 0
      }
    }
  };
</script>

<style scoped lang="scss">
  .container {
    height: 100%;
    width: 100%;
    text-align: left;
    line-height: 60px;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
    /*文字不可被选中*/
    moz-user-select: -moz-none;
    -moz-user-select: none;
    -o-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    .tags_box {
      position: relative;
      box-sizing: border-box;
      height: 60px;
      width: 100%;
      .tags-list {
        position: absolute;
        padding: 0 14px;
        overflow: visible;
        white-space: nowrap;
        transition: left .3s ease;
      }
      .tag-item {
        position: relative;
        display: inline-block;
        height: 38px;
        line-height: 38px;
        margin: 2px 8px 2px 0;
        padding: 0 10px;
        border: 1px solid #eee;
        font-family: MicrosoftYaHei;
        color: #9B9B9B;
        font-size: 12px;
        vertical-align: middle;
        opacity: 1;
        overflow: hidden;
        cursor: pointer;
        border-radius: 5px;
      }
    }
    .more {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      align-items: center;
      padding: 0 15px;
      height: 100%;
      box-sizing: border-box;
      background-color: #fff;
      box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
      .el-button {
        height: 36px;
      }
    }
  }
</style>
