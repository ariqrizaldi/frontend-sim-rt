import { createRouter, createWebHashHistory } from 'vue-router'
// import Admin from '@/layouts/Admin.vue'
import User from '@/layouts/User.vue'
import Admin from '@/layouts/Admin.vue'
import Dashboard from '@/views/Admin/Dashboard.vue'

const routes = [
  {
    path: '/user',
    redirect: '/user/dashboard',
    component: User,
    children: [
      {
        // Document title tag
        // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
        meta: {
          title: 'Dashboard'
        },
        path: '/user/dashboard',
        name: 'Dashboard User',
        component: () => import(/* webpackChunkName: "tables" */ '@/views/User/Dashboard.vue')
      },
      {
        meta: {
          title: 'Form Laporan Kerusakan'
        },
        path: '/user/buat-laporan',
        name: 'Buat Laporan',
        component: () => import(/* webpackChunkName: "tables" */ '@/views/User/BuatLaporan.vue')
      },
      {
        meta: {
          title: 'Daftar Laporan Kerusakan'
        },
        path: '/user/daftar-laporan',
        name: 'Daftar Laporan',
        component: () => import(/* webpackChunkName: "tables" */ '@/views/User/DaftarLaporan.vue')
      },
      {
        meta: {
          title: 'Form Peminjaman Kendaraan'
        },
        path: '/user/buat-peminjaman',
        name: 'Buat Peminjaman',
        component: () => import(/* webpackChunkName: "tables" */ '@/views/User/BuatPeminjaman.vue')
      },
      {
        meta: {
          title: 'Daftar Peminjaman Kendaraan'
        },
        path: '/user/daftar-peminjaman',
        name: 'Daftar Peminjaman',
        component: () => import(/* webpackChunkName: "tables" */ '@/views/User/DaftarPeminjaman.vue')
      },
      {
        meta: {
          title: 'Form Permintaan Servis'
        },
        path: '/user/buat-servis',
        name: 'Buat Servis',
        component: () => import(/* webpackChunkName: "tables" */ '@/views/User/BuatServis.vue')
      },
      {
        meta: {
          title: 'Daftar Permintaan Servis'
        },
        path: '/user/daftar-servis',
        name: 'Daftar Servis',
        component: () => import(/* webpackChunkName: "tables" */ '@/views/User/DaftarServis.vue')
      },
      {
        meta: {
          title: 'Tables'
        },
        path: '/user/tables',
        name: 'tables',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "tables" */ '@/views/Tables.vue')
      },
      {
        meta: {
          title: 'Forms'
        },
        path: '/user/forms',
        name: 'forms',
        component: () => import(/* webpackChunkName: "forms" */ '@/views/Forms.vue')
      },
      {
        meta: {
          title: 'Profile'
        },
        path: '/user/profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "profile" */ '@/views/Profile.vue')
      },
      {
        meta: {
          title: 'Ui'
        },
        path: '/user/ui',
        name: 'ui',
        component: () => import(/* webpackChunkName: "ui" */ '@/views/Ui.vue')
      },
      {
        meta: {
          title: 'Responsive layout'
        },
        path: '/user/responsive',
        name: 'responsive',
        component: () => import(/* webpackChunkName: "responsive" */ '@/views/Responsive.vue')
      }

    ]
  },
  {
    path: '/admin',
    redirect: '/admin/dashboard',
    component: Admin,
    children: [
      {
        // Document title tag
        // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
        meta: {
          title: 'Dashboard'
        },
        path: '/admin/dashboard',
        name: 'Dashboard Admin',
        component: Dashboard
      },
      {
        meta: {
          title: 'Form Laporan Kerusakan'
        },
        path: '/admin/buat-laporan',
        name: 'Buat Laporan Admin',
        component: () => import(/* webpackChunkName: "tables" */ '@/views/Admin/BuatLaporan.vue')
      },
      {
        meta: {
          title: 'Daftar Laporan Kerusakan Masuk'
        },
        path: '/admin/daftar-laporan-masuk',
        name: 'Daftar Laporan Masuk',
        component: () => import(/* webpackChunkName: "tables" */ '@/views/Admin/DaftarLaporanMasuk.vue')
      },
      {
        meta: {
          title: 'Daftar Laporan Kerusakan Ditangani'
        },
        path: '/admin/daftar-laporan-aktif',
        name: 'Daftar Laporan Kerusakan Ditangani',
        component: () => import(/* webpackChunkName: "tables" */ '@/views/Admin/DaftarLaporanAktif.vue')
      },
      {
        meta: {
          title: 'Daftar Laporan Kerusakan Lanjutan'
        },
        path: '/admin/daftar-laporan-lanjutan',
        name: 'Daftar Laporan Kerusakan Lanjutan',
        component: () => import(/* webpackChunkName: "tables" */ '@/views/Admin/DaftarLaporanLanjutan.vue')
      },
      {
        meta: {
          title: 'Riwayat Laporan Kerusakan'
        },
        path: '/admin/riwayat-laporan',
        name: 'Riwayat Laporan Admin',
        component: () => import(/* webpackChunkName: "tables" */ '@/views/Admin/RiwayatLaporan.vue')
      },
      {
        meta: {
          title: 'Daftar Peminjaman Kendaraan Masuk'
        },
        path: '/admin/daftar-peminjaman-masuk',
        name: 'Daftar Peminjaman Masuk',
        component: () => import(/* webpackChunkName: "tables" */ '@/views/Admin/DaftarPeminjamanMasuk.vue')
      },
      {
        meta: {
          title: 'Daftar Peminjaman Kendaraan Aktif'
        },
        path: '/admin/daftar-peminjaman-aktif',
        name: 'Daftar Peminjaman Aktif',
        component: () => import(/* webpackChunkName: "tables" */ '@/views/Admin/DaftarPeminjamanAktif.vue')
      },
      {
        meta: {
          title: 'Riwayat Peminjaman Kendaraan'
        },
        path: '/admin/riwayat-peminjaman',
        name: 'Riwayat Peminjaman Admin',
        component: () => import(/* webpackChunkName: "tables" */ '@/views/Admin/RiwayatPeminjaman.vue')
      },
      {
        meta: {
          title: 'Form Permintaan Servis'
        },
        path: '/admin/buat-servis',
        name: 'Buat Servis Admin',
        component: () => import(/* webpackChunkName: "tables" */ '@/views/Admin/BuatServis.vue')
      },
      {
        meta: {
          title: 'Daftar Permintaan Servis Masuk'
        },
        path: '/admin/daftar-servis-masuk',
        name: 'Daftar Servis Masuk',
        component: () => import(/* webpackChunkName: "tables" */ '@/views/Admin/DaftarServisMasuk.vue')
      },
      {
        meta: {
          title: 'Daftar Permintaan Servis Aktif'
        },
        path: '/admin/daftar-servis-aktif',
        name: 'Daftar Servis Aktif',
        component: () => import(/* webpackChunkName: "tables" */ '@/views/Admin/DaftarServisAktif.vue')
      },
      {
        meta: {
          title: 'Riwayat Permintaan Servis'
        },
        path: '/admin/riwayat-servis',
        name: 'Riwayat Servis Admin',
        component: () => import(/* webpackChunkName: "tables" */ '@/views/Admin/RiwayatServis.vue')
      },
      {
        meta: {
          title: 'Daftar Stok Barang'
        },
        path: '/admin/daftar-stok-barang',
        name: 'Daftar Stok Barang',
        component: () => import(/* webpackChunkName: "tables" */ '@/views/Admin/DaftarStokBarang.vue')
      },
      {
        meta: {
          title: 'Daftar Stok Kendaraan'
        },
        path: '/admin/daftar-kendaraan',
        name: 'Daftar Kendaraan',
        component: () => import(/* webpackChunkName: "tables" */ '@/views/Admin/DaftarKendaraan.vue')
      },
      {
        meta: {
          title: 'Kelola User'
        },
        path: '/admin/kelola-user',
        name: 'Kelola User',
        component: () => import(/* webpackChunkName: "tables" */ '@/views/Admin/KelolaUser.vue')
      },
      {
        meta: {
          title: 'Kelola Role'
        },
        path: '/admin/kelola-role',
        name: 'Kelola Role',
        component: () => import(/* webpackChunkName: "tables" */ '@/views/Admin/KelolaRole.vue')
      },
      {
        meta: {
          title: 'Kelola Kendaraan'
        },
        path: '/admin/kelola-unit-kendaraan',
        name: 'Kelola Kendaraan',
        component: () => import(/* webpackChunkName: "tables" */ '@/views/Admin/KelolaKendaraan.vue')
      },
      {
        meta: {
          title: 'Kelola Unit Barang'
        },
        path: '/admin/kelola-unit-barang',
        name: 'Kelola Unit Barang',
        component: () => import(/* webpackChunkName: "tables" */ '@/views/Admin/KelolaUnitBarang.vue')
      },
      {
        meta: {
          title: 'Kelola Jenis Barang'
        },
        path: '/admin/kelola-barang',
        name: 'Kelola Jenis Barang',
        component: () => import(/* webpackChunkName: "tables" */ '@/views/Admin/KelolaJenisBarang.vue')
      },
      {
        meta: {
          title: 'Kelola Arus Barang'
        },
        path: '/admin/kelola-arus-barang',
        name: 'Kelola Arus Barang',
        component: () => import(/* webpackChunkName: "tables" */ '@/views/Admin/KelolaArusBarang.vue')
      },
      {
        meta: {
          title: 'Kelola Jenis Kendaraan'
        },
        path: '/admin/kelola-kendaraan',
        name: 'Kelola Jenis Kendaraan',
        component: () => import(/* webpackChunkName: "tables" */ '@/views/Admin/KelolaJenisKendaraan.vue')
      },
      {
        meta: {
          title: 'Kelola Jenis Kerusakan'
        },
        path: '/admin/kelola-kerusakan',
        name: 'Kelola Jenis Kerusakan',
        component: () => import(/* webpackChunkName: "tables" */ '@/views/Admin/KelolaJenisKerusakan.vue')
      },
      {
        meta: {
          title: 'Kelola Jenis Servis'
        },
        path: '/admin/kelola-servis',
        name: 'Kelola Jenis Servis',
        component: () => import(/* webpackChunkName: "tables" */ '@/views/Admin/KelolaJenisServis.vue')
      }
    ]
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    meta: {
      title: 'Login',
      fullScreen: true
    },
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
  },
  {
    meta: {
      title: 'Home',
      fullScreen: true
    },
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Home.vue')
  },
  {
    meta: {
      title: 'Halaman Tidak ditemukan',
      fullScreen: true
    },
    path: '/:catchAll(.*)*',
    name: 'Halaman Tidak ditemukan',
    component: () => import(/* webpackChunkName: "error" */ '@/views/Error.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

export default router
