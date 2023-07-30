<template>
  <div class="side-menu-wrapper">
    <Menu
      ref="menu"
      v-show="collapsed"
      :active-name="activeName"
      :open-names="openedNames"
      :accordion="accordion"
      :theme="theme"
      :mode="mode"
      width="auto"
      @on-select="handleSelect"
    >
      <slot name="top"/>
      <div :class="[mode === 'horizontal' ? 'head-menu': '']">
        <template
          v-for="item in menuList"
        >
          <template
            v-if="item.children && item.children.length === 1"
          >
            <SideMenuItem
              v-if="showChildren(item)"
              :key="`menu-${item.name}`"
              :collapsed="collapsed"
              :parentItem="item"
            />
            <MenuItem
              v-else
              :key="`menu-${item.children[0].name}`"
              :name="getNameOrHref(item, true)"
            >
              <Icon
                :type="item.children[0].icon || ''"
                size="25"
              />
              <span style="font-size: 15px">
                {{ showTitle(item.children[0]) }}
              </span>
            </MenuItem>
          </template>
          <template v-else>
            <side-menu-item
              v-if="showChildren(item)"
              :key="`menu-${item.name}`"
              :parent-item="item"
            />
            <menu-item
              v-else
              :name="getNameOrHref(item)"
              :key="`menu-${item.name}`"
              >
              <Icon
                :type="item.children[0].icon || ''"
                size="25"
              />
              <span style="font-size: 15px">
                {{ showTitle(item) }}
              </span>
            </menu-item>
          </template>
        </template>
      </div>
      <slot name="end"/>
    </Menu>
    <div
      v-show="!collapsed && mode === 'vertical'"
      class="menu-collapsed"
      :list="menuList"
    >
      <template
        v-for="item in menuList"
        :key="`tooltip-${item.name}`"
      >
        <Tooltip
          transfer
          :content="showTitle(item.children && item.children[0] ? item.children[0] : item)"
          placement="right"
        >
          <a
            class="drop-menu-a" 
            :style="{textAlign: 'center'}"
            @click="handleSelect(getNameOrHref(item, true))"
          >
            <Icon
              :type="item.icon || (item.children && item.children[0].icon)"
              :size="25"
              color="white"
            />
            </a>
        </Tooltip>
      </template>
    </div>
  </div>
</template>

<script>
import SideMenuItem from './side-menu-item'
import { getUnion } from '@/libs/tools'
import mixin from './mixin'

export default {
  name: 'SideMenu',
  mixins: [ mixin ],
  components: {
    SideMenuItem
  },
  props: {
    menuList: {
      type: Array,
      default: () => []
    },
    collapsed: {
      type: Boolean
    },
    theme: {
      type: String,
      default: 'dark'
    },
    mode: {
      type: String,
      default: 'vertical'
    },
    accordion: Boolean,
    activeName: {
      type: String,
      default: ''
    },
    openNames: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      openedNames: []
    }
  },
  watch: {
    activeName (newName) {
      if (this.accordion) {
        this.openedNames = this.getOpenedNamesByActiveName(newName)
      } else {
        this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(newName))
      }
    },
    openNames (newNames) {
      this.openedNames = newNames
    },
    openedNames () {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened()
      })
    }
  },
  methods: {
    handleSelect (name) {
      this.$emit('on-select', name)
    },
    getOpenedNamesByActiveName (name) {
      return this.$route.matched.map(item => item.name)
        .filter(item => item!== name)
    },
    updateOpenName (name) {
        if (name === 'home') this.openedNames = []
        else this.openedNames = this.getOpenedNamesByActiveName(name)
    }
  },
  mounted () {
    console.log('collapsed', this.collapsed)
  }
}
</script>

<style lang="less">
@import './side-menu.less';
</style>