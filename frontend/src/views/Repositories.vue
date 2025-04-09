<template>
  <div class="repositories-container">
    <h1>Your GitHub Repositories</h1>
    <!-- Show loading message while fetching repositories -->
    <p v-if="loading">Fetching repositories...</p>
    <p v-if="!loading && !repositories.length">
      No repositories available or you need to log in.
    </p>
    <ul v-if="repositories.length">
      <li v-for="repo in repositories" :key="repo.id">
        <a :href="repo.html_url" target="_blank">{{ repo.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Repositories",
  data() {
    return {
      repositories: [],
      loading: true,
    };
  },
  async created() {
    try {
      const response = await axios.get("/api/v1/repositories/list", {
        withCredentials: true,
      });
      this.repositories = response.data.repositories;
    } catch (error) {
      console.error("Error fetching repositories:", error);
      // Optionally redirect to login page if not authenticated
      // this.$router.push("/");
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.repositories-container {
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
