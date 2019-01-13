import { dictGet } from '@/api/systemManagement'

const config = {
  state: {
    com: null
  },
  mutations: {
    SET_COM: (state, com = null) => {
      state.com = com
    }
  },

  actions: {
    // 获取用户信息
    GetCom({ commit }) {
      return new Promise((resolve, reject) => {
        dictGet({ id: -3 }).then(res => {
          const com = {}
          res.data.dictionaries.map(item => { com[item.key] = item.value })
          commit('SET_COM', com)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default config
