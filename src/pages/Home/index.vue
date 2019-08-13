<template>
  <el-container>
    <el-header>Header - 级联选择器</el-header>
    <el-main>
      <el-select v-model="select.brandValue" filterable placeholder="请选择" @change="brandChange">
        <el-option
          v-for="item in treeData"
          :key="item.assetKndCd"
          :label="item.assetKndNm"
          :value="item.assetKndCd"
        ></el-option>
      </el-select>
      <el-select v-model="select.seriesValue" filterable placeholder="请选择" @change="seriesChange">
        <el-option
          v-for="item in seriesData"
          :key="item.assetKndCd"
          :label="item.assetKndNm"
          :value="item.assetKndCd"
        ></el-option>
      </el-select>
      <el-select v-model="select.modelValue" filterable placeholder="请选择" @change="modelChange">
        <el-option
          v-for="item in modelData"
          :key="item.assetKndCd"
          :label="item.assetKndNm"
          :value="item.assetKndCd"
        ></el-option>
      </el-select>
      <el-select v-model="select.assetValue" filterable placeholder="请选择" @change="assetChange">
        <el-option
          v-for="item in assetData"
          :key="item.assetKndCd"
          :label="item.assetKndNm"
          :value="item.assetKndCd"
        ></el-option>
      </el-select>
    </el-main>
  </el-container>
</template>

<script>
import { syBrandKnds, sySeriesKnds, syModelKnds, syAssetKnds } from '../../datas/syAssetKnds'

export default {
  data () {
    return {
      select: {
        brandValue: '',
        seriesValue: '',
        modelValue: '',
        assetValue: ''
      },
      treeData: []
    }
  },
  computed: {
    // 车系
    seriesData () {
      for (let item of this.treeData) {
        if (item.assetKndCd === this.select.brandValue) {
          return item.children || []
        }
      }
      return []
    },
    // 车型
    modelData () {
      for (let item of this.treeData) {
        if (item.assetKndCd === this.select.brandValue) {
          if (!item.children) return []
          for (let item2 of item.children) {
            if (item2.assetKndCd === this.select.seriesValue) {
              return item2.children || []
            }
          }
        }
      }
      return []
    },
    // 车型
    assetData () {
      for (let item of this.treeData) {
        if (item.assetKndCd === this.select.brandValue) {
          if (!item.children) return []
          for (let item2 of item.children) {
            if (item2.assetKndCd === this.select.seriesValue) {
              if (!item2.children) return []
              for (let item3 of item2.children) {
                if (item3.assetKndCd === this.select.modelValue) {
                  return item3.children || []
                }
              }
            }
          }
        }
      }
      return []
    }
  },
  created () {
    // this.fetchData()
    console.log('syAssetKnds: ', syAssetKnds)
    this.treeData = this.covertToTree(syAssetKnds)
    // console.log('treeData: ', this.treeData)
  },
  methods: {
    async fetchData (params = {}) {
      let loading = this.$loading()
      let res = await this.$authApi.getColumn()
      loading.close()
      console.log('res: ', res)
    },
    brandChange (value) {
      console.log('brand: ', value)
      this.select.seriesValue = ''
      this.select.modelValue = ''
      this.select.assetValue = ''
    },
    seriesChange (value) {
      console.log('series: ', value)
      this.select.modelValue = ''
      this.select.assetValue = ''
    },
    modelChange (value) {
      console.log('model: ', value)
      this.select.assetValue = ''
    },
    assetChange (value) {
      console.log('asset: ', value)
    },
    covertToTree (arr = []) {
      let treeMap = {}
      this.treeMap = treeMap
      for (let item of arr) {
        if (treeMap[item.brandInfo.assetKndCd]) {
          let children = treeMap[item.brandInfo.assetKndCd].children
          if (children[item.seriesInfo.assetKndCd]) {
            children = children[item.seriesInfo.assetKndCd].children
            if (children[item.modelInfo.assetKndCd]) {
              children = children[item.modelInfo.assetKndCd].children
              if (!children[item.assetInfo.assetKndCd]) {
                children[item.assetInfo.assetKndCd] = item.assetInfo
              }
            } else {
              children[item.modelInfo.assetKndCd] = {
                ...item.modelInfo,
                children: {
                  [item.assetInfo.assetKndCd]: {
                    ...item.assetInfo
                  }
                }
              }
            }
          } else {
            children[item.seriesInfo.assetKndCd] = {
              ...item.seriesInfo,
              children: {
                [item.modelInfo.assetKndCd]: {
                  ...item.modelInfo,
                  children: {
                    [item.assetInfo.assetKndCd]: {
                      ...item.assetInfo
                    }
                  }
                }
              }
            }
          }
        } else {
          treeMap[item.brandInfo.assetKndCd] = {
            ...item.brandInfo,
            children: {
              [item.seriesInfo.assetKndCd]: {
                ...item.seriesInfo,
                children: {
                  [item.modelInfo.assetKndCd]: {
                    ...item.modelInfo,
                    children: {
                      [item.assetInfo.assetKndCd]: {
                        ...item.assetInfo
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      let treeData = []
      for (let key in treeMap) {
        let children = Object.keys(treeMap[key].children).map(key1 => {
          let item = treeMap[key].children[key1]
          return {
            ...item,
            children: Object.keys(item.children).map(key2 => {
              let item2 = item.children[key2]
              return {
                ...item2,
                children: Object.keys(item2.children).map(key3 => {
                  return item2.children[key3]
                })
              }
            })
          }
        })
        treeData.push({
          ...treeMap[key],
          children
        })
      }
      return treeData
    }
  }
}
</script>
