<template>
  <div class="not-found-container">
    <h1>404</h1>
    <p>Oops! The page you're looking for doesn't exist.</p>
    <router-link to="/">Go to Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFoundPage',
}
</script>

<style lang="scss" scoped>
@use '../styles/variables' as v;

.not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
  // background-color: $background-color;
  color: v.$blue;

  h1 {
    font-size: 6rem;
    color: v.$blue;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  a {
    color: black;
    text-decoration: none;
    font-weight: bold;
    font-size: 1.2rem;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
