<template>
  <div class="Sale flex-x m-b20">
      <div class="Sale-title t-a-c c6">{{list.title}}</div>
      <div class="Sale-list w100 flex-y c6">
          <div class="Sale-A flex-x a-i-c p-l10">
              <span class="m-r10">{{list.name}}</span>
              <span>{{list.val}}</span>
          </div>
          <div class="flex-x a-i-c p-l10">
              <span class="m-r10">{{list.money}}</span>
              <span>{{list.value}}</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        list: Object
    }
}
</script>

<style lang="scss" scoped>
.Sale {
    border: 1px solid #ddd;
    .Sale-title {
        height: 100px;
        width: 110px;
        line-height: 100px;
        background: #66b1ff0a
    }
    .Sale-list {
        div {
            flex: 1;
        }
        .Sale-A {
            border-bottom: 1px solid #ddd;
        }
    }
}
</style>
