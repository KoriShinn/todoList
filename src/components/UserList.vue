<template>
  <ul class="todo-main">
    <user-item v-for="todo in todos" :key="todo.id" :todo="todo"></user-item>
  </ul>
</template>

<script>
import UserItem from "./UserItem.vue";
export default {
  components: { UserItem },
  name: "UserList",
  props: ["todos"],
};
</script>

<style scoped>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}
</style>
