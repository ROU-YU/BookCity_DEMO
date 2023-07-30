<template>
  <Layout style="height: 100%" class="main">
    <Sider
      ref="side1"
      hide-trigger
      collapsible
      :collapsed-width="78"
      style="background: #5b6270"
      v-model="isCollapsed"
    >
      <SideMenu
        accordion
        ref="sideMenu"
        :type="'side'"
        :active-name="$route.name"
        :collapsed="collapsed"
        :menu-list="menuList"
        @on-select="turnToPage"
      />
    </Sider>
    <Layout>
      <Header
        :style="{padding: 0}"
        class="layout-header-bar"
      >
        <HeadMenu
          accordion
          ref="headMenu"
          :routerName="$route.name"
          :menuList="menuList"
          @on-chage-sider="collapsedSider"
          @on-select="turnToPage"
        />
      </Header>
      <Content class="layout-content">
        <router-view v-slot="{Component }">
          <keep-alive>
            <component :is="Component"/>
          </keep-alive>
        </router-view>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import SideMenu from './components/side-menu/index'
import HeadMenu from './components/head-menu'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import routers from '@/router/routers'
import './main.less'

export default {
  name: 'Main',
  components: {
    SideMenu,
    HeadMenu
  },
  data () {
    return {
      isCollapsed: true,
      collapsed: false
    }
  },
  computed: {
    menuList () {
      return this.$store.getters.menuList
    },
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ];
    },
    menuitemClasses () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  methods: {
    collapsedSider () {
      this.$refs.side1.toggleCollapse()
      this.collapsed = !this.collapsed
    },
    handleClick (item) {
      this.turnToPage(item)
    },
    turnToPage (route) {
      let { name, params, query } = {}
      if (typeof route === 'string') {
        name = route
      } else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > 1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    }
  }
}
</script>
<style>
.layout-sider{
    background: #3A9FE8;
    min-height: 120px;
    line-height: 120px;
}
.layout-content{
    background: #0F8DE9;
    min-height: 120px;
    line-height: 120px;
}
.layout-footer{
    background: #7CBCE9;
    color: white;
}
</style>
