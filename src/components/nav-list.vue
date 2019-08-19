<template>
  <el-collapse-item :title="data.cateTitle" :name="data.id.toString()" :class="['collection__item', {'collection__item-isEditting': !isNormal}]">
    <div class="collection__itemBar">
      <template v-if="isNormal">
        <span @click="changeMode">编辑</span>
        <span @click="showDeleteConfirm">删除</span>
        <span @click="showPop">添加</span>
        <span @click="setTop">置顶</span>
      </template>
      <template v-else>
        <el-button type="primary" @click="changeMode">完成</el-button>
      </template>
    </div>
    <ul v-if="data.list.length">
      <li v-for="({id,name,url}) in data.list" :key="id" :class="{'collection__itemli-editting': !isNormal}">
        <a :href="url">
          <i class="el-icon-link"></i> {{name}}
        </a>
        <i class="el-icon-delete" v-if="!isNormal"></i>
      </li>
    </ul>
    <div v-else class="collection__itemadd" @click="showPop"><i class="el-icon-plus"></i> 添加链接</div>
    <el-dialog title="添加链接" :visible.sync="dialogFormVisible">
      <el-input v-model="name" autocomplete="off" placeholder="网站名称 例:百度"></el-input>
      <el-input v-model="url" autocomplete="off" placeholder="网站地址 例:https://baidu.com"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUrlFn">确 定</el-button>
      </div>
    </el-dialog>
  </el-collapse-item>
</template>

<script>
import { addUrl, deleteCate, setCateTop } from '@/assets/js/api'
  export default {
    props: {
      data: Object
    },
    data() {
      return {
        dialogFormVisible: false,
        name: '',
        url: '',
        isNormal: true
      }
    },
    created() {
    },
    methods: {
      // 展示添加链接面板
      showPop() {
        this.dialogFormVisible = true
      },
      // 上传新收藏
      addUrlFn() {
        this.dialogFormVisible = false
        let { name, url, data } = this
        let { id } = data 
        addUrl({ name, url, id }).then(({ success, result })=>{
          if(success) {
            this.$emit("refreshData",{ id, result })
          }
        })
      },
      // 编辑列表
      changeMode() {
        this.isNormal = !this.isNormal
      },
      // 确认是否要删除
      showDeleteConfirm() {
        this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteFn()
        })
      },
      deleteFn() {
        deleteCate({
          id: this.data.id
        }).then(({success})=>{
          if(success) {
            this.$emit('afterDeleteCate', {id: this.data.id})
          }
        })
        this.$message({
            type: 'success',
            message: '删除成功!'
          })
      },
      setTop() {
        setCateTop({
          id: this.data.id
        }).then(({success})=>{
          if(success) {
            this.$emit('setTop', {id: this.data.id})
          }
        })
      }
    }
  }
</script>
<style lang="scss">
.collection__item{
  position: relative;
  &:hover {
    .collection__itemBar {
      visibility: visible;
    }
  }
   &-isEditting{
     .collection__itemBar {
       visibility: visible;
     }
   }
  &Bar {
    visibility: hidden;
    position: absolute;
    top: 0;
    right: 40px;
    line-height: 48px;
    display: flex;
    width: 200px;
    justify-content: space-between;
    span {
      display: block;
      width: 25%;
      text-align: center;
      cursor: pointer;
      &:hover {
        color: #409EFF;
      }
    }
  }
  &add {
    line-height: 40px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .el-dialog {
    background-color: #fff!important;
    .el-input {
      margin-bottom: 10px;
    }
  }
  ul {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    li {
      margin-bottom: 10px;
      width: 154px;
      display: flex;
      margin-right: 10px;
      a {
        display: block;
        line-height: 40px;
        height: 40px;
        width: 134px;
        // padding-right:20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .el-icon-delete {
        line-height: 40px;
      }
    }
  }
  &li-editting {
    box-shadow: rgba(0, 0, 0,.5) 0 0 5px;
    background-color: rgba(255,255,255,.5);
    border-radius: 4px;
  }
}
</style>

