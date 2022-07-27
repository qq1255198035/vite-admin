<template>
  <el-config-provider namespace="el">
    <router-view></router-view>
  </el-config-provider>
</template>
<style lang="scss" scoped>
:global(#app) {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
