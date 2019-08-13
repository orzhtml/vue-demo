<template>
  <el-container>
    <el-header>Header - 级联选择器</el-header>
    <el-main>
      <el-select v-model="select.brandValue" filterable placeholder="请选择" @change="brandChange">
        <el-option
          v-for="item in brandInfo"
          :key="item.assetKndCd"
          :label="item.assetKndCd + ' ' + item.assetKndNm"
          :value="item.assetKndCd"
        ></el-option>
      </el-select>
      <el-select v-model="select.seriesValue" filterable placeholder="请选择" @change="seriesChange">
        <el-option
          v-for="item in seriesData"
          :key="item.assetKndCd"
          :label="item.assetKndCd + ' ' + item.assetKndNm"
          :value="item.assetKndCd"
        ></el-option>
      </el-select>
      <el-select v-model="select.modelValue" filterable placeholder="请选择" @change="modelChange">
        <el-option
          v-for="item in modelData"
          :key="item.assetKndCd"
          :label="item.assetKndCd + ' ' + item.assetKndNm"
          :value="item.assetKndCd"
        ></el-option>
      </el-select>
      <el-select v-model="select.assetValue" filterable placeholder="请选择" @change="assetChange">
        <el-option
          v-for="item in assetData"
          :key="item.assetKndCd"
          :label="item.assetKndCd + ' ' + item.assetKndNm"
          :value="item.assetKndCd"
        ></el-option>
      </el-select>
    </el-main>
  </el-container>
</template>

<script>
import api from '../../api/api'

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
      brandInfo: [],
      seriesInfo: [],
      modelInfo: [],
      assetInfo: [],
      seriesInfoSource: [],
      modelInfoSource: [],
      assetInfoSource: []
    }
  },
  computed: {
    // 车系
    seriesData () {
      let data = []
      for (let item of this.seriesInfoSource) {
        if (item.highAssetKndCd === this.select.brandValue) {
          data.push(item)
        }
      }
      return data
    },
    // 车型
    modelData () {
      let data = []
      for (let item of this.modelInfoSource) {
        if (item.highAssetKndCd === this.select.seriesValue) {
          data.push(item)
        }
      }
      return data
    },
    // 车型
    assetData () {
      let data = []
      for (let item of this.assetInfoSource) {
        if (item.highAssetKndCd === this.select.modelValue) {
          data.push(item)
        }
      }
      return data
    }
  },
  async created () {
    // this.treeData = this.covertToTree(syAssetKnds)
    await this.fetchBrand()
    await this.fetchSeries()
    await this.fetchModel()
    await this.fetchAsset()
  },
  methods: {
    async fetchBrand () {
      let loading = this.$loading()
      let res = await api.mock(syBrandKnds)
      loading.close()
      this.brandInfo = this.setDataFormat(res, 'brandInfo')
    },
    async fetchSeries () {
      let loading = this.$loading()
      let res = await api.mock(sySeriesKnds)
      loading.close()
      this.seriesInfoSource = this.setDataFormat(res, 'seriesInfo')
    },
    async fetchModel () {
      let loading = this.$loading()
      let res = await api.mock(syModelKnds)
      loading.close()
      this.modelInfoSource = this.setDataFormat(res, 'modelInfo')
    },
    async fetchAsset () {
      let loading = this.$loading()
      let res = await api.mock(syAssetKnds)
      loading.close()
      this.assetInfoSource = this.setDataFormat(res, 'assetInfo')
    },
    brandChange (value) {
      this.select.seriesValue = ''
      this.select.modelValue = ''
      this.select.assetValue = ''
    },
    seriesChange (value) {
      this.select.modelValue = ''
      this.select.assetValue = ''
    },
    modelChange (value) {
      this.select.assetValue = ''
    },
    assetChange (value) {
      console.log('asset: ', value)
    },
    setDataFormat (data = [], type = 'brandInfo') {
      let dataMap = {}
      let list = []
      for (let item of data) {
        if (item[type] && !dataMap[item[type].assetKndCd]) {
          /** 这里避免 for in 的时候自动排序 */
          dataMap['key-' + item[type].assetKndCd] = item[type]
        }
      }
      for (let key in dataMap) {
        if (dataMap.hasOwnProperty(key)) {
          list.push({
            ...dataMap[key]
          })
        }
      }
      console.log('dataMap list: ', list)
      return list || []
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
