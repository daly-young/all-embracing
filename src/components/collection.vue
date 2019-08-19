<template>
  <el-collapse v-model="activeName" accordion class="collection">
    <nav-list 
      v-for="item in cateList" 
      :key="item.id" 
      :data="item" 
      @refreshData="refreshData" 
      @afterDeleteCate="afterDeleteCate"
      @setTop="setTop"/>
    <div class="collection__add" @click="showPop"><i class="el-icon-plus"></i> 自定义</div>
  </el-collapse>
</template>

<script>
import navList from './nav-list'
import {getList, addCate} from '@/assets/js/api'
export default {
  data() {
    return {
      activeName: ['1','2','3'],
      cateList: []
    }
  },
  components: {
    navList
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取总list
    fetchData() {
      getList().then(({success,result})=>{
        if(success) {
          this.cateList = result
          this.activeName =  result.map(({id})=> id.toString())
        }
      })
    },
    // 开启面板
    showPop() {
      this.$prompt('分类名称', '添加', {
        confirmButtonText: '提交',
        cancelButtonText: '取消',
        inputPattern:  /\S/,
        inputErrorMessage: '名称不能为空'
      }).then(({ value }) => {
        this.addNewCate(value)
      })
    },
    addNewCate(title) {
      addCate({title}).then(({success, result})=>{
        if(success) {
          this.$message({
            type: 'success',
            message: '新增分类名称为: ' + title
          })
          this.cateList.push(result)
          this.activeName.push(result.id.toString())
        }
      })
    },
    // 子组件新增list项，更新数据
    refreshData(params) {
      let { id, result } = params
      let index = this.cateList.findIndex((item)=> item.id === id)
      this.cateList[index].list.push(result)
    },
    // 删除分类之后更新数据
    afterDeleteCate(params) {
      let {id} = params
      let index = this.cateList.findIndex((item)=> item.id === id)
      this.cateList.splice(index,1)
    },
    // 分类置顶更新排序
    setTop(params) {
      let { id } = params
      let index = this.cateList.findIndex((item)=> item.id === id)
      this.cateList.unshift(this.cateList[index])
      this.cateList.splice(index+1,1)

    }
  }
}
</script>
<style lang="scss">
.collection{
  &.el-collapse {
    width: 1000px;
    margin: 0 auto;
    padding: 20px;
    border: none;
    background-color: rgba(255,255,255,.7);
    border-radius: 4px;
    div {
      font-size: 16px;
      background-color: transparent;
    }
  }
  &__add {
    margin-top: 20px !important;
    cursor: pointer;
  }
  .el-collapse-item__content {
    padding-bottom: 0;
  }
}
</style>
