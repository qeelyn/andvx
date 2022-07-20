<template>
  <a-dropdown placement="rightTop">
    <div
      class="menuCollapsed-item"
      @mouseenter="visible = true"
      @mouseout="visible = false"
    >
      <i v-if="data.icon" :class="data.icon"></i>
      <span class="menuCollapsed-title" v-if="!isTop">{{ data.name }}</span>
      <i
        v-if="!isTop"
        class="iconfont icon-icon_youjiantou"
        style="position: absolute; right: 16px; top: 8px; font-size: 12px"
      />
    </div>
    <template #overlay>
      <a-menu class="menuCollapsed-menu">
        <div class="menuCollapsed-menuTitle">{{ data.name }}</div>
        <template v-for="(item, index) in data.children">
          <menu-collapsed
            v-if="item.children && item.children.length"
            :keyValue="`${keyValue}-${index}`"
            :data="item"
            @moreIconClick="
              (k) => {
                $emit('moreIconClick', k);
              }
            "
            @click="
              (k) => {
                $emit('click', k);
              }
            "
          />
          <div
            v-else
            class="menuCollapsed-menuItem"
            @click.stop="$emit('click', `${keyValue}-${index}`)"
          >
            <i v-if="item.icon" :class="item.icon" />
            <span class="menuCollapsed-title">{{ item.name }}</span>
            <i
              class="iconMore iconfont icon-icon_xinchuangkoudakai"
              @click.stop="$emit('moreIconClick', `${keyValue}-${index}`)"
            />
          </div>
        </template>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script>
import { defineComponent, ref, watch } from "vue";
import {
  Menu as AMenu,
  SubMenu as ASubMenu,
  MenuItem as AMenuItem,
  MenuDivider as AMenuDivider,
  Dropdown as ADropdown,
} from "ant-design-vue";

export default defineComponent({
  name: "menuCollapsed",
  components: { AMenu, ASubMenu, AMenuItem, AMenuDivider, ADropdown },
  props: {
    isTop: { type: Boolean },
    keyValue: { type: String },
    data: { type: Object },
  },
  emits: ["moreIconClick", "click"],
});
</script>
