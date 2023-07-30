<template>
  <Submenu :name="`${parentName}`">
    <template v-slot:title>
      <Icon
        :type="parentItem.icon || ''"
      />
      <span style="font-size: 15px">
        {{ showTitle(parentItem) }}
      </span>
    </template>
    <template v-for="item in children">
      <template
        v-if="item.children && item.children.length === 1"
      >
        <side-menu-item
          v-if="showChildren(item)"
          :key="`menu-${item.name}`"
          :parent-item="item"
        />
        <menu-item
          v-else
          :name="getNameOrHref(item, true)"
          :key="`menu-${item.children[0].name}`"
        >
          <Icon :type="item.children[0].icon || ''"/>
            <span>
              {{ showTitle(item.children[0]) }}
            </span>
        </menu-item>
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
            :type="item.icon || ''"
            size="25"
          />
          <span style="font-size: 15px">
            {{ showTitle(item) }}
          </span>
        </menu-item>
      </template>
    </template>
  </Submenu>
</template>

<script>
import mixin from './mixin'
import itemMixin from './item-mixin'

export default {
  name: 'SideMenuItem',
  mixins: [ mixin, itemMixin ]
}
</script>