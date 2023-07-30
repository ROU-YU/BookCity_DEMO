<template>
  <h1 class="demo">{{ $t('construction') }}</h1>
</template>

<script>
import Demo from '@/components/Demo'

export default {
  name: 'Home',
  components: {
    Demo
  },
  setup() {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
  .demo{
    color: lightcoral;
    font-size: 50px;
    text-align: center;
    margin: 300px 0 0 0;
  }
</style>
