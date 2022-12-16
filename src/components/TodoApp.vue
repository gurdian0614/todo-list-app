<template>
  <div class="container">
    <h2 class="text-center mt-S">Lista Quehaceres App</h2>

    <div class="d-flex">
      <input v-model="task" type="text" placeholder="Ingrese Tarea" class="form-control">
      <button @click="submitTask" class="btn btn-warning rounded-0">Ingresar</button>
    </div>

    <table class="table table-bordered mt-5">
      <thead>
        <tr>
          <th scope="col">Tarea</th>
          <th scope="col">Estado</th>
          <th scope="col" class="text-center">#</th>
          <th scope="col" class="text-center">#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="index">
          <td>{{task.name}}</td>
          <td><input class="form-check-input" type="checkbox" v-model="task.status" v-bind:id="task.id"></td>
          <td>
            <div class="text-center"  @click="editTask(index)">
              <span class="fa fa-pen"></span>
            </div>
          </td>
          <td>
            <div class="text-center" @click="deleteTask(index)">
              <span class="fa fa-trash"></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },

  data() {
    return {
      task: '',
      editedTask: null,
      tasks: [
        {
          id: 1,
          name: 'Aprender Vue',
          status: false
        },
        {
          id: 2,
          name: 'Aprender Node',
          status: true
        }
      ]
    }
  },

  methods: {
    submitTask() {
      if(this.task.length === 0) return;

      if(this.editedTask === null) {
        this.tasks.push({
          name: this.task,
          status: false
        })
      } else {
        this.tasks[this.editedTask].name = this.task;
        this.editedTask = null;
      }

      this.task = ''
    },

    deleteTask(index) {
      this.tasks.splice(index, 1)
    },

    editTask(index) {
      this.task = this.tasks[index].name;
      this.editedTask = index;
    }

  }
}
</script>

<style scoped>

</style>
