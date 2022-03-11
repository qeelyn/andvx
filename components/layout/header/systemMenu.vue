<template>
  <div class="systemSwitch" v-if="menu">
    <template v-for="item in menu">
      <div v-if="item.children && item.children.length" class="systemSwitch-item" :key="item.id">
        <div class="systemSwitch-title">{{ item.name }}</div>
        <ul class="systemSwitch-ul">
          <li
            v-for="child in item.children"
            :key="child.id"
            class="systemSwitch-li"
            @click="
              () => {
                $emit('menuClick', child);
              }
            "
          >
            <span>{{ child.name }}</span>
            <i
              class="iconMore iconfont icon-icon_xinchuangkoudakai"
              @click.stop="
                () => {
                  $emit('menuClick', child, true);
                }
              "
            />
          </li>
        </ul>
      </div>
    </template>
    <div style="clear: both" />
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    menu: { type: Array },
  },
});
</script>
<style lang="less">
.systemSwitch {
  width: 600px;
  padding: 4px 16px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgb(0 0 0 / 15%);

  .systemSwitch-item {
    float: left;
    width: 200px;
  }

  .systemSwitch-title {
    line-height: 40px;
    border-bottom: 1px solid #f2f5f8;
    font-weight: 700;
  }

  .systemSwitch-ul {
    line-height: 40px;
    list-style-type: none;
    padding: 0;
  }

  .systemSwitch-li {
    position: relative;
    list-style-type: none;
    padding: 0 12px;
    cursor: pointer;

    .iconMore {
      position: absolute;
      top: 0;
      right: 10px;
      display: none;
    }

    &:hover {
      background: #f0f8ff;

      .iconMore {
        display: block;
      }
    }
  }
}
</style>