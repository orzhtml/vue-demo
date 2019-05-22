<template>
  <div>
    Home.js
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData (params = {}) {
      let loading = this.$loading()
      let res = await this.$authApi.getColumn()
      loading.close()
      console.log('res: ', res)
    }
  }
}
</script>
