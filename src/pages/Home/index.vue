<template>
  <div>
    Home.js
  </div>
</template>

<script>
import { syAssetKnds } from './syAssetKnds'

export default {
  data () {
    return {}
  },
  created () {
    // this.fetchData()
    console.log('syAssetKnds: ', syAssetKnds)
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
