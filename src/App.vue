<template>
  <div id="app">
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

import UserHeader from "./components/UserHeader.vue";
import UserList from "./components/UserList.vue";
import UserFooter from "./components/UserFooter.vue";

export default {
  name: "App",
  components: {
    UserHeader,
    UserList,
    UserFooter,
  },
  data() {
    return {
      todos: [
        { id: 1, title: "吃饭", done: true },
        { id: 2, title: "睡觉", done: true },
        { id: 3, title: "写代码", done: false },
      ],
    };
  },
  methods: {
    // 增
    addItem(newItem) {
      this.todos.unshift(newItem);
    },
    // 删
    removeItem(todoId) {
      this.todos = this.todos.filter((todo) => {
        return todo.id !== todoId;
      });
    },
    // 改 done
    doneChange(todoId) {
      this.todos.forEach((todo) => {
        if (todo.id === todoId) {
          todo.done = !todo.done;
        }
      });
    },
    // 改 编辑title数据
    editChange(todoId, value) {
      this.todos.forEach((todo) => {
        if (todo.id === todoId) {
          todo.isEdit = !todo.isEdit;
          if (value) {
            todo.title = value;
          }
        }
      });
    },
    // 全选状态改变
    allDoneInpChnage(isTrue) {
      if (!isTrue) {
        this.todos.forEach((todo) => {
          todo.done = false;
        });
      } else {
        this.todos.forEach((todo) => {
          todo.done = true;
        });
      }
    },
    // 清除所有选中
    clearSelectDone() {
      this.todos = this.todos.filter((todo) => {
        return todo.done !== true;
      });
    },
  },
  mounted() {
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
