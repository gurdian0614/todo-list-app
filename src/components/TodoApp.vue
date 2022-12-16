<template>
  <div class="container">
    <h2 class="text-center mt-S">Lista Quehaceres App</h2>

    <div class="d-flex">
      <input v-model="task" type="text" placeholder="Ingrese Tarea" class="form-control">
      <button @click="submitTask" class="btn btn-primary rounded-0">Ingresar</button>
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
          <td><input class="form-check-input" @change="onChange(task.id, task.name, $event)" type="checkbox" v-model="task.done" v-bind:id="task.id"></td>
          <td>
            <div class="text-center"  @click="editTask(task.id, index)">
              <span class="fa fa-pen pen-color"></span>
            </div>
          </td>
          <td>
            <div class="text-center" @click="deleteTask(task.id, index)">
              <span class="fa fa-trash trash-color"></span>
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
        this.$alertify.warning("Debe ingresar una tarea")
      } else {
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
            .then(data => {
              this.$alertify.success(data.message);
          });

          this.tasks.push({
            name: this.task,
            status: false
          });
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
            .then(data => {
              this.$alertify.success(data.message);
          });

          this.tasks[this.editedTask].name = this.task;
          this.editedTask = null;
          this.id = null;
        }

        this.task = '';
      }
    },

    deleteTask(id, index) {
      const requestOptions = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
      };

      fetch('https://todo-list-api-gurdian.up.railway.app/tasks/' + id, requestOptions)
        .then(response => response.json())
        .then(data => {
          this.$alertify.success(data.message);
          this.tasks.splice(index, 1);
      });
    },

    editTask(id, index) {
      this.id = id;
      this.task = this.tasks[index].name;
      this.editedTask = index;
    },

    onChange(id, name, $event) {
      const checked = $event.target.checked;
      
      const requestUpdateOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          done: checked
        })
      };

      fetch('https://todo-list-api-gurdian.up.railway.app/tasks/' + id, requestUpdateOptions)
        .then(response => response.json())
        .then(data => {
          this.$alertify.success(data.message);
      });
    }

  }
}
</script>

<style scoped>
.pen-color {
  color: green
}

.trash-color {
  color: red
}
</style>
