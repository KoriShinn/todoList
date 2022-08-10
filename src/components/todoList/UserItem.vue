<template>
  <transition
    appear
    name="animate__animated animate__bounce"
    enter-active-class="animate__lightSpeedInLeft"
    leave-active-class="animate__fadeOutDown"
    ><li>
      <label>
        <input type="checkbox" :checked="todo.done" @change="inpChange" />
        <span v-show="!todo.isEdit">{{ todo.title }}</span>
        <input
          v-show="todo.isEdit"
          type="text"
          :value="todo.title"
          @blur="inpBlur"
          @keyup.enter="enterBlur"
          ref="inp"
        />
      </label>
      <button class="btn btn-danger" @click="removeBtn">删除</button>
      <button
        v-show="!todo.isEdit"
        class="btn btn-edit"
        @click="editTitle(todo)"
      >
        编辑
      </button>
      <div v-show="todo.isEdit" class="btn btn-isok">
        失去焦点以确认,长度限制十
      </div>
    </li></transition
  >
</template>

<script>
export default {
  name: "UserItem",
  props: ["todo"],
  data() {
    return {};
  },
  methods: {
    inpChange() {
      this.$bus.$emit("dChange", this.todo.id);
    },
    titleChange() {
      this.$bus.$emit("titleChange", this.todo.id);
    },
    removeBtn() {
      this.$bus.$emit("rItem", this.todo.id);
    },
    editTitle(todo) {
      let res = Object.prototype.hasOwnProperty.call(todo, "isEdit");
      if (!res) {
        console.log("+1");
        this.$set(this.todo, "isEdit", false);
      }
      this.$bus.$emit("editChange", this.todo.id);
      this.$nextTick(this.inpFocus);
    },
    inpFocus() {
      this.$refs.inp.focus();
    },
    inpBlur(e) {
      let newValue = e.target.value.trim();
      if (newValue !== "" && newValue.length < 10) {
        this.$bus.$emit("editChange", this.todo.id, e.target.value);
      } else if (newValue !== "" && newValue.length > 10) {
        this.$bus.$emit(
          "editChange",
          this.todo.id,
          e.target.value.substring(0, 10)
        );
      } else {
        this.$bus.$emit("editChange", this.todo.id, "待设定");
      }
    },
    enterBlur() {
      this.$refs.inp.blur();
    },
  },
  mounted() {},
};
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover button {
  display: block;
}
</style>
