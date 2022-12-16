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
          <td><input class="form-check-input" type="checkbox" v-model="task.done" v-bind:id="task.id"></td>
          <td>
            <div class="text-center"  @click="editTask(task.id, index)">
              <span class="fa fa-pen"></span>
            </div>
          </td>
          <td>
            <div class="text-center" @click="deleteTask(task.id)">
              <span class="fa fa-trash"></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.baseURL = "tasks";
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },

  data() {
    return {
      id: null,
      task: '',
      editedTask: null, 
      tasks: []
    }
  },

  created() {
    fetch('https://todo-list-api-gurdian.up.railway.app/tasks')
      .then(response => response.json())
      .then(data => this.tasks = data);
  },

  methods: {
    submitTask() {
      if(this.task.length === 0) {
        alert("Debe ingresar una tarea")
      }

      if(this.editedTask === null) {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            name: this.task,
            done: false
          })
        };

        fetch('https://todo-list-api-gurdian.up.railway.app/tasks', requestOptions)
          .then(response => response.json())
          .then(data => alert(data.message));
      } else {
        const requestUpdateOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            name: this.task
          })
        };

        fetch('https://todo-list-api-gurdian.up.railway.app/tasks/' + this.id, requestUpdateOptions)
          .then(response => response.json())
          .then(data => alert(data.message));
        this.editedTask = null;
        this.id = null;
      }

      this.task = ''
    },

    deleteTask(id) {
      const requestOptions = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
      };

      fetch('https://todo-list-api-gurdian.up.railway.app/tasks/' + id, requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
    },

    editTask(id, index) {
      this.id = id;
      this.task = this.tasks[index].name;
      this.editedTask = index;
    }

  }
}
</script>

<style scoped>

</style>
