<template>
  <div class="container">
    <h2 class="text-center mt-S">Lista Quehaceres App</h2>

    <div class="d-flex">
      <input type="text" placeholder="Ingrese Tarea" class="form-control">
      <button class="btn btn-warning rounded-0">Ingresar</button>
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
          <td>{{task.status}}</td>
          <td>
            <div class="text-center">
              <span class="fa fa-pen"></span>
            </div>
          </td>
          <td>
            <div class="text-center">
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
    tasks: [
      {
        name: 'Aprender Vue',
        status: 'Hecho'
      }
    ]
  }
}
}
</script>

<style scoped>

</style>
