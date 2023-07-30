<template>
  <div class="head-menu">
    <div>
      <SideMenu
        accordion
        collapsed
        :mode="'horizontal'"
        :theme="'light'"
        :active-name="routerName"
        :menu-list="menuList"
        @on-select="turnToPage"
      >
      <template #top>
        <div class="layout-header-icon">
        <Icon
          :class="rotateIcon"
          size="24"
          type="md-menu"
          @click="handleChangeSider"
        />
        </div>
      </template>
      </SideMenu>
    </div>
    <!--之後可以塞其他功能到header-->
  </div>
</template>

<script>
import SideMenu from '../side-menu/side-menu.vue'

export default {
  name: 'HeadMenu',
  components: {
    SideMenu
  },
  props: {
    menuList: {
      type: Array,
      default: () => []
    },
    routerName: {
      type: String,
      default: ''
    },
    isCollapsed: {
      type: Boolean
    }
  },
  data () {
    return {

    }
  },
  computed: {
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ]
    },
  },
  methods: {
    handleChangeSider () {
      this.$emit('on-chage-sider')
    },
    turnToPage (name) {
      this.$emit('on-select', name)
    }
  },
  mounted () {
    console.log('menuList', this.menuList)
  }
}
</script>

<style lang="less">
@import './head-menu.less';
</style>