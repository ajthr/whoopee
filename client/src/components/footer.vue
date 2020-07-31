<template>
  <footer class="footer" style="margin-top: 1rem; padding-bottom:3rem">
    <div class="content has-text-centered">
      <p>
        <strong>Whooper v1.0.0</strong> by
        <a href="https://github.com/AjithRamachandran">Ajith Ramachandran</a>. The source code is licensed
        <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
      </p>
    </div>
    <div class="content has-text-centered">
      <span class="social-icons">
        <i class="fab fa-telegram"></i>
      </span>
      <span class="social-icons">
        <i class="fab fa-github"></i>
      </span>
      <span class="social-icons">
        <i class="fab fa-discord"></i>
      </span>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>
.social-icons {
  margin: 10px;
  font-size: xx-large;
}
</style>