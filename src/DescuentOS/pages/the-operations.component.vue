<script>
export default {
  name: 'the-operations.component',
  methods: {
    goToTceaManagement() {
      this.$router.push('/tcea-management');
    },
    goToCommisionManagement() {
      this.$router.push('/commision-management');
    },
    goToFactoringManagement() {
      this.$router.push('/factoring-management');
    },
  }
}
</script>

<template>
  <div class="operations-container">
    <h1>Operaciones</h1>
    <div class="card-container">
      <pv-card class="card" @click="goToTceaManagement">
        <template #title>TCEA</template>
        <template #content>Administrar TCEA</template>
      </pv-card>
      <pv-card class="card" @click="goToCommisionManagement">
        <template #title>Comisiones</template>
        <template #content>Administrar comisiones</template>
      </pv-card>
      <pv-card class="card" @click="goToFactoringManagement">
        <template #title>Factoring</template>
        <template #content>Administrar factoring</template>
      </pv-card>
    </div>
  </div>
</template>

<style scoped>

</style>
