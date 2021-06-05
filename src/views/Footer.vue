<template>
  <footer>
      <p>All rights reserved | {{date}}</p>
  </footer>
</template>


<script>
export default {
    name: "Footer",

    data() {
        return {
            date: new Date().getFullYear()
        }
    }
}
</script>

<style>

</style>
