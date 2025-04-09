<template>
  <div class="profile-container">
    <h1 v-if="isLoggedIn">Welcome, {{ username }}!</h1>
    <h1 v-else>Checking login status...</h1>
    <!-- Show GitHub profile information if logged in -->
    <div v-if="isLoggedIn" class="profile-info">
      <img :src="profile.avatar_url" alt="GitHub Avatar" class="avatar" />
      <p><strong>Name:</strong> {{ profile.name }}</p>
      <p>
        <strong>GitHub Profile:</strong>
        <a :href="profile.profile_url" target="_blank">{{
          profile.profile_url
        }}</a>
      </p>
      <p><strong>Access Token:</strong></p>
      <textarea class="jwtDisplay" v-model="accessToken" readonly></textarea>
      <!-- <p><strong>Access Token:</strong> {{ accessToken }}</p> -->

      <!-- Button to redirect to /repositories if logged in -->
      <router-link to="/repositories" class="repo-button">
        <button>Go to Repositories</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isLoggedIn: false,
      username: "",
      profile: {
        avatar_url: "",
        name: "",
        profile_url: "",
      },
      accessToken: "",
    };
  },
  mounted() {
    // Call the backend to check login status
    this.checkLoginStatus();
  },
  methods: {
    async checkLoginStatus() {
      try {
        // Send request to backend API to verify JWT in HttpOnly cookie
        const response = await axios.get("/api/v1/auth/check", {
          withCredentials: true,
        });

        if (response.status === 200) {
          this.isLoggedIn = true;
          this.username = response.data.username;
          this.profile = response.data.profile;
          this.accessToken = response.data.accessToken;
        }
      } catch (error) {
        this.isLoggedIn = false;
        this.$router.push("/"); // Redirect to login page if not authenticated
      }
    },
  },
};
</script>

<style scoped>
.profile-container {
  text-align: center;
  margin-top: 50px;
}

.profile-info {
  margin-top: 20px;
}

.jwtDisplay {
  width: 100%;
  height: 150px; /* Adjust height as needed */
  font-family: monospace; /* Use a monospaced font for better readability */
  resize: none; /* Disable resizing if you want a fixed size */
  overflow-wrap: break-word; /* Ensure long text wraps correctly */
}

.avatar {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}

.repo-button button {
  background-color: #333;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.repo-button button:hover {
  background-color: #555;
}
</style>
