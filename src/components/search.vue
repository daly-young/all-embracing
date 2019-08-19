<template>
  <div class="search">
    <img src="https://www.baidu.com/img/superlogo_c4d7df0a003d3db9b65e9ef0fe6da1ec.png?where=super" alt="百度">
    <div class="search__input">
      <el-input placeholder="请输入内容" v-model="searchTxt" @keyup.native.13="searchFn">
        <el-button slot="append" icon="el-icon-search" @click="searchFn"></el-button>
      </el-input>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchTxt: ''
    }
  },
  methods:{
    searchFn() {
      window.open(`https://www.baidu.com/s?wd=${this.searchTxt}&tn=baiduhome_pg&sug=${this.searchTxt}`,'_blank')
    }
  }
}
</script>
<style lang="scss">
.search {
  img {
    display: block;
    margin: 0 auto;
    width: 210px;
  }
  &__input {
    width: 1000px;
    margin: 30px auto;
    ::placeholder {
      color: #666;
    }
  }
  .el-input__inner {
    background-color: rgba(255,255,255,.7);
  }
}
</style>


