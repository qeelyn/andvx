<template>
  <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <a-button danger shape="round" href="/">返回首页</a-button>
      <a-button type="text" shape="round" @click="$router.go(-1)">返回上一级</a-button>
    </template>
  </a-result>
</template>