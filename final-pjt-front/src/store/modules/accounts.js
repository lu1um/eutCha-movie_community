import drf from "@/api/drf"
import axios from "axios"
import router from '@/router'
import _ from 'lodash'
import createPersistedState from 'vuex-persistedstate'


export default {
  plugins:[
    createPersistedState()
  ],
  state: {
    token: localStorage.getItem('token') || '' ,
    currentUser: {},
    profile: {},
    authError: null,
  },
  getters: {
    isLoggedIn: state => !!state.token,
    currentUser: state => state.currentUser,
    profile: state => state.profile,
    isProfile: state => !_.isEmpty(state.profile),
    authError: state => state.authError,
    authHeader: state => ({Authorization: `Token ${state.token}`}),
  },
  mutations: {    
    SET_TOKEN: (state, token) => state.token = token,
    SET_CURRENT_USER: (state, user) => state.currentUser = user,
    // SET_PROFILE: (state, profile) => state.profile = profile, 
    SET_PROFILE (state, profile){
      state.profile = profile
      profile.picture = 'http://localhost:8000' + profile.picture
    },
    SET_AUTH_ERROR: (state, error) => state.authError = error
  },
  actions: {
    saveToken({commit}, token){
      commit('SET_TOKEN', token)
      localStorage.setItem('token', token)
    },
    removeToken({commit}){
      commit('SET_TOKEN', '')
      localStorage.setItem('token', '')
    },
    signup({commit, dispatch}, credentials){ 
      axios({
        url:drf.accounts.signup(),
        method: 'post',
        data: credentials,
      })
      .then(res => {
        const token = res.data.key
        dispatch('saveToken', token)
        dispatch('fetchCurrentUser')
        router.push({ name: 'movies' })
      })
      .catch(err => {
        console.error(err.response.data)
        commit('SET_AUTH_ERROR', err.response.data)
      })
    },
    login({commit, dispatch}, credentials){
      axios({
        url:drf.accounts.login(),
        method:'post',
        data:credentials,
      })
      .then(res=>{
        const token = res.data.key
        dispatch('saveToken', token)
        dispatch('fetchCurrentUser')
        router.push({ name: 'movies' })
      })
      .catch(err => {
        console.error(err.response)
        commit('SET_AUTH_ERROR', err.response.data)
      })
    },
    logout({ getters, dispatch }) {
      axios({
        url: drf.accounts.logout(),
        method: 'post',
        headers: getters.authHeader,
      })
        .then(() => {
          dispatch('removeToken')
          alert('???????????????????????????.')
          router.push({ name: 'login' })
        })
        .error(err => {
          console.error(err.response)
        })
    },
    fetchCurrentUser({ commit, getters, dispatch }) {
      if (getters.isLoggedIn) {
        axios({
          url: drf.accounts.currentUserInfo(),
          method: 'get',
          headers: getters.authHeader,
        })
          .then(res => commit('SET_CURRENT_USER', res.data))
          .catch(err => {
            if (err.response.status === 401) {
              dispatch('removeToken')
              router.push({ name: 'login' })
            }
          })
      }
    },
    fetchProfile({ commit, getters }, { username }) {
      axios({
        url: drf.accounts.profile(username),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_PROFILE', res.data)
        })
    },
  },
}
