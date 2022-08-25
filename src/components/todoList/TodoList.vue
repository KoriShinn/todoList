<template>
  <div id="to-do-list">
    <div id="root">
      <div class="todo-container">
        <div class="todo-wrap">
          <user-header></user-header>
          <user-list :todos="todos"></user-list>
          <user-footer :todos="todos"></user-footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "animate.css";

import UserHeader from "./UserHeader.vue";
import UserList from "./UserList.vue";
import UserFooter from "./UserFooter.vue";

export default {
  name: "TodoList",
  components: {
    UserHeader,
    UserList,
    UserFooter,
  },
  data() {
    return {
      todos: [],
      userinfo: {},
      doneTotal: "",
    };
  },
  methods: {
    // async doneTotalMe() {
    //   const { data: res } = await this.$http.get("todo/doneList");
    //   const aa = JSON.stringify(res.data[0]);
    //   const r1 = aa.replace(/[^0-9]/gi, "");
    //   this.doneTotal = r1;
    // },
    // 全选状态改变
    async allDoneInpChnage(isTrue) {
      if (isTrue) {
        const { data: res } = await this.$http.put(`todo/allDone/${1}`);
        console.log(res.meta.msg);
        this.getTodoList();
      } else {
        const { data: res } = await this.$http.put(`todo/cancelDone/${0}`);
        console.log(res.meta.msg);
        this.getTodoList();
      }
    },

    // ----------------------------------------------------------------------------------------------------------------------------------------------------------------

    // 获取列表
    async getTodoList() {
      const { data: res } = await this.$http.get("todo", this.userinfo);
      if (res.meta.status !== 0) return this.$message.error("获取列表失败");
      this.todos = res.data;
      console.log(res.data);
    },

    // 新增
    async addItem(userinfo) {
      // this.todos.unshift(newItem);
      const { data: res } = await this.$http.post("todo", userinfo);
      if (res.meta.status !== 0) return this.$message.error("添加失败");
      this.getTodoList();
    },
    // 删除功能
    async removeItem(todoId) {
      const { data: res } = await this.$http.delete(`todo/${todoId}`);
      if (res.meta.status !== 0) return this.$message.error("删除失败");
      this.getTodoList();
    },

    // 清除所有选中
    async clearSelectDone() {
      const { data: res } = await this.$http.delete(`todo/select/${1}`);
      if (res.meta.status !== 0) return this.$message.error("删除失败");
      this.getTodoList();
    },

    // 改 done
    async doneChange(todoId) {
      const { data: res } = await this.$http.put(`todo/list/${todoId}`);
      this.getTodoList();
    },

    // 改 编辑title数据
    editChange(todoId, value) {
      this.todos.forEach(async (todo) => {
        if (todo.id === todoId) {
          todo.isEdit = !todo.isEdit;
          if (value) {
            const { data: res } = await this.$http.put(`todo/${todoId}`, {
              title: value,
            });
            if (res.meta.status !== 0) return this.$message.error("修改失败");
            this.getTodoList();
          }
        }
      });
    },
  },
  computed: {},
  created() {
    this.getTodoList();
    // this.doneTotalMe();
  },
  mounted() {
    // -------
    this.$bus.$on("dChange", this.doneChange);
    this.$bus.$on("rItem", this.removeItem);
    this.$bus.$on("aItem", this.addItem);
    this.$bus.$on("editChange", this.editChange);
    this.$bus.$on("allDoneInp", this.allDoneInpChnage);
    this.$bus.$on("clearSelectDone", this.clearSelectDone);
  },
};
</script>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}
.btn-edit {
  margin-right: 3px;
  color: #fff;
  background-color: #49dada;
  border: 1px solid #49dada;
}

.btn-edit:hover {
  color: #fff;
  background-color: #5cb3b3;
}
.btn-isok {
  margin-left: 3px;
  color: #fff;
  background-color: #82debf;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
:root {
  --animate-duration: 110ms;
  --animate-delay: 0.1s;
}
</style>
