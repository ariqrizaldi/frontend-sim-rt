import { createStore } from 'vuex'
import axios from 'axios'
import { auth } from './auth.module'
import { darkModeKey, styleKey } from '@/config.js'
import * as styles from '@/styles.js'
const API_URL = 'http://localhost:8080/api/'

export default createStore({
  state: {
    /* Styles */
    lightBorderStyle: '',
    lightBgStyle: '',
    asideStyle: '',
    asideBrandStyle: '',
    asideMenuCloseLgStyle: '',
    asideMenuLabelStyle: '',
    asideMenuItemStyle: '',
    asideMenuItemActiveStyle: '',
    asideMenuItemInactiveStyle: '',
    asideSubmenuListStyle: '',
    navBarItemLabelStyle: '',
    navBarItemLabelHoverStyle: '',
    navBarItemLabelActiveColorStyle: '',
    navBarMenuListUpperLabelStyle: '',
    tableTrStyle: '',
    tableTrOddStyle: '',
    overlayStyle: '',

    /* User */
    userName: null,
    userEmail: null,
    userRole: null,
    userId: null,

    /* fullScreen - fullscreen form layout (e.g. login page) */
    isFullScreen: true,

    /* Aside */
    isAsideMobileExpanded: false,
    isAsideLgActive: false,

    /* Dark mode */
    darkMode: false,

    /* Field focus with ctrl+k (to register only once) */
    isFieldFocusRegistered: false,

    /* Sample data (commonly used) */
    clients: [],
    history: [],
    users: [],
    roles: [],
    arusBarangs: [],
    barangs: [],
    detailKerusakans: [],
    jenisBarangs: [],
    jenisKendaraans: [],
    jenisServis: [],
    jenisKerusakans: [],
    kendaraans: [],
    kerusakanLanjutans: [],
    laporanKerusakans: [],
    peminjamanKendaraans: [],
    pesananKendaraans: [],
    servisKendaraans: [],
    unitBarangs: [],
    laporanKerusakanMasuk: [],
    laporanKerusakanAktif: [],
    usersTeknisi: [],
    usersSopir: [],
    riwayatLaporan: [],
    peminjamanKendaraanMasuk: [],
    peminjamanKendaraanAktif: [],
    riwayatPeminjaman: [],
    servisKendaraanMasuk: [],
    servisKendaraanAktif: [],
    riwayatServis: [],
    barang: [],
    laporanByUser: [],
    servisByUser: [],
    peminjamanByUser: [],
    kendaraanPinjam: [],
    detailKerusakan: [],
    laporanKerusakanTeknisi: [],
    pesananSopir: [],
    pengawasanTeknisi: []
  },
  getters: {
    getClients: (state) => state.clients,
    getUsers: (state) => state.users,
    getRoles: (state) => state.roles,
    getBarang: (state) => state.barangs,
    getJenisKerusakan: (state) => state.jenisKerusakans,
    getJenisKendaraan: (state) => state.jenisKendaraans,
    getJenisServis: (state) => state.jenisServis,
    getJenisBarang: (state) => state.jenisBarangs,
    getUnitBarang: (state) => state.unitBarangs,
    getServisKendaraan: (state) => state.servisKendaraans,
    getPesananKendaraan: (state) => state.pesananKendaraans,
    getPeminjamanKendaraan: (state) => state.peminjamanKendaraans,
    getLaporanKerusakan: (state) => state.laporanKerusakans,
    getDetailKerusakan: (state) => state.detailKerusakans,
    getKerusakanLanjutan: (state) => state.kerusakanLanjutans,
    getKendaraan: (state) => state.kendaraans,
    getArusBarang: (state) => state.arusBarangs,
    getLaporanKerusakanMasuk: (state) => state.laporanKerusakanMasuk,
    getLaporanKerusakanAktif: (state) => state.laporanKerusakanAktif,
    getLaporanKerusakanLanjutan: (state) => state.kerusakanLanjutans,
    getPeminjamanKendaraanMasuk: (state) => state.peminjamanKendaraanMasuk,
    getPeminjamanKendaraanAktif: (state) => state.peminjamanKendaraanAktif,
    getServisKendaraanMasuk: (state) => state.servisKendaraanMasuk,
    getServisKendaraanAktif: (state) => state.servisKendaraanAktif,
    getRiwayatLaporan: (state) => state.riwayatLaporan,
    getRiwayatServis: (state) => state.riwayatServis,
    getRiwayatPeminjaman: (state) => state.riwayatPeminjaman,
    getTeknisi: (state) => state.usersTeknisi,
    getSopir: (state) => state.usersSopir,
    getLaporanByUser: (state) => state.laporanByUser,
    getServisByUser: (state) => state.servisByUser,
    getPeminjamanByUser: (state) => state.peminjamanByUser,
    getKendaraanTersedia: (state) => state.kendaraanPinjam,
    getDetailLaporan: (state) => state.detailKerusakan,
    getLaporanByTeknisi: (state) => state.laporanKerusakanTeknisi,
    getPengawasanTeknisi: (state) => state.pengawasanTeknisi,
    getPesananSopir: (state) => state.pesananSopir
  },
  mutations: {
    /* A fit-them-all commit */
    basic (state, payload) {
      state[payload.key] = payload.value
    },

    /* Styles */
    styles (state, payload) {
      for (const key in payload) {
        if (['body', 'html'].includes(key)) {
          continue
        }

        state[`${key}Style`] = payload[key]
      }
    },

    /* User */
    user (state, payload) {
      if (payload.name) {
        state.userName = payload.name
      }
      if (payload.email) {
        state.userEmail = payload.email
      }
      if (payload.role) {
        state.userRole = payload.role
      }
      if (payload.id) {
        state.userId = payload.id
      }
    },
    /** coba pake data json */
    SET_ITEMS (state, payload) {
      state[payload.key] = payload.value
    }
  },
  actions: {
    setStyle ({ commit, dispatch }, payload) {
      const style = styles[payload] ?? styles.basic

      document.body.className = style.body
      document.documentElement.className = style.html

      if (localStorage[styleKey] !== payload) {
        localStorage.setItem(styleKey, payload)
      }

      commit('styles', style)
    },

    asideMobileToggle ({ commit, state }, payload = null) {
      const isShow = payload !== null ? payload : !state.isAsideMobileExpanded

      document.getElementById('app').classList[isShow ? 'add' : 'remove']('ml-60', 'lg:ml-0')

      document.documentElement.classList[isShow ? 'add' : 'remove']('m-clipped')

      commit('basic', {
        key: 'isAsideMobileExpanded',
        value: isShow
      })
    },

    asideLgToggle ({ commit, state }, payload = null) {
      commit('basic', { key: 'isAsideLgActive', value: payload !== null ? payload : !state.isAsideLgActive })
    },

    fullScreenToggle ({ commit, state }, value) {
      commit('basic', { key: 'isFullScreen', value })

      document.documentElement.classList[value ? 'add' : 'remove']('full-screen')
    },

    darkMode ({ commit, state }, payload = null) {
      const value = payload !== null ? payload : !state.darkMode

      document.documentElement.classList[value ? 'add' : 'remove']('dark')

      localStorage.setItem(darkModeKey, value ? '1' : '0')

      commit('basic', {
        key: 'darkMode',
        value
      })
    },

    async fetch ({ commit }, payload) {
      axios
        .get(API_URL + `${payload}`)
        .then((r) => {
          if (r.data) {
            commit('SET_ITEMS', {
              key: `${payload}`,
              value: r.data
            })
          }
        })
        .catch(error => {
          alert(error.message)
        })
    },
    async fetchBy ({ commit }, { payload, link, state }) {
      axios
        .get(API_URL + `${link}` + `${payload}`)
        .then((r) => {
          if (r.data) {
            commit('SET_ITEMS', {
              key: `${state}`,
              value: r.data
            })
          }
        })
        .catch(error => {
          alert(error.message)
        })
    },
    async fetchById ({ commit }, { payload, link, state }) {
      axios
        .get(API_URL + `${link}` + '/' + `${payload}`)
        .then((r) => {
          if (r.data) {
            commit('SET_ITEMS', {
              key: `${state}`,
              value: r.data
            })
          }
        })
        .catch(error => {
          alert(error.message)
        })
    }
  },
  modules: {
    auth
  }
})
