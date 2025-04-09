<template>
  <div class="modules-container">
    <h1>JASP Modules</h1>
    <!-- Show loading message while fetching modules -->
    <p v-if="loading">Fetching modules...</p>
    <p v-if="!loading && !modules.length">No modules available!</p>
    <ul v-if="modules.length">
      <li v-for="module in modules" :key="module.name">
        <a :href="module.url" target="_blank">{{ module.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "modules",
  data() {
    return {
      modules: [],
      loading: true,
    };
  },
  async created() {
    try {
      const response = await axios.get("/api/v1/modules/list", {
        withCredentials: false,
      });
      // this.modules = response.data.modules;
      this.modules = response.data;
    } catch (error) {
      console.error("Error fetching modules:", error);
      // Optionally redirect to login page if not authenticated
      // this.$router.push("/");
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.modules-container {
  padding: 20px;
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
