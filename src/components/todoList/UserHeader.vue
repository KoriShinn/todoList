<template>
  <div class="todo-header">
    <input
      type="text"
      placeholder="请输入你的任务名称，按回车键确认"
      @keyup.enter="addItem"
      v-model="newTodo"
    />
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  name: "UserHeader",
  data() {
    return {
      newTodo: "",
    };
  },
  methods: {
    addItem() {
      const id = window.sessionStorage.getItem("id");
      const username = window.sessionStorage.getItem("username");
      const newItem = {
        id: id,
        title: this.newTodo.trim().substring(0, 10),
        username: username,
      };

      if (this.newTodo.trim() !== "") {
        this.$bus.$emit("aItem", newItem);
      }
      this.newTodo = "";
    },
  },
};
</script>

<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>
