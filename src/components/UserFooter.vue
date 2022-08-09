<template>
  <div class="todo-footer" v-show="todos.length > 0">
    <label>
      <input type="checkbox" v-model="allDoneInp" />
    </label>
    <span>
      <span>已完成{{ doneTotal }}</span> / 全部{{ todoTotal }}
    </span>
    <button class="btn btn-danger" @click="clearSelectDone">
      清除已完成任务
    </button>
  </div>
</template>

<script>
export default {
  name: "UserFooter",
  props: ["todos"],
  methods: {
    clearSelectDone() {
      this.$bus.$emit("clearSelectDone");
    },
  },
  computed: {
    todoTotal() {
      return this.todos.length;
    },
    doneTotal() {
      return this.todos.reduce((pre, todo) => {
        return pre + (todo.done ? 1 : 0);
      }, 0);
    },
    allDoneInp: {
      get() {
        return this.todoTotal === this.doneTotal;
      },
      set(value) {
        this.$bus.$emit("allDoneInp", value);
      },
    },
  },
};
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
