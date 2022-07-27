<template>
  <div>{{$filters.format(11111)}}</div>
</template>
<script setup lang="ts">
import { ComponentInternalInstance } from 'vue';

const { appContext } = getCurrentInstance() as ComponentInternalInstance

console.log(appContext.config)
</script>