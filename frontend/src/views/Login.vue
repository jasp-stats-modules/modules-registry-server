<template>
  <div class="login-container">
    <h1>Login with GitHub</h1>
    <p>Please login to view your repositories.</p>
    <a class="login-button" href="api/v1/auth/github">
      <button>Login with GitHub</button>
    </a>
  </div>
</template>
<script>
export default {
  name: "Login",
};
</script>

<style scoped>
.login-container {
  text-align: center;
  margin-top: 100px;
}

.login-button button {
  background-color: #333;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.login-button button:hover {
  background-color: #555;
}
</style>
