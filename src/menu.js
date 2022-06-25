import {
  mdiAccountCircle,
  mdiDesktopMac,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive
} from '@mdi/js'

export const user = [
  'Umum',
  [
    {
      to: '/user/dashboard',
      icon: mdiDesktopMac,
      label: 'Dashboard'
    }
  ],
  'Laporan Kerusakan',
  [
    {
      to: '/user/buat-laporan',
      label: 'Buat Laporan',
      icon: mdiTelevisionGuide
    },
    {
      to: '/user/daftar-laporan',
      label: 'Daftar Laporan',
      icon: mdiTable
    }
  ],
  'Peminjaman Kendaraan',
  [
    {
      to: '/user/buat-peminjaman',
      label: 'Buat Peminjaman',
      icon: mdiTelevisionGuide
    },
    {
      to: '/user/daftar-peminjaman',
      label: 'Daftar Peminjaman',
      icon: mdiTable
    }
  ],
  'Servis Kendaraan',
  [
    {
      to: '/user/buat-servis',
      label: 'Buat Permintaan',
      icon: mdiTelevisionGuide
    },
    {
      to: '/user/daftar-servis',
      label: 'Daftar Permintaan',
      icon: mdiTable
    }
  ]
]
export const admin = [
  [
    {
      to: '/admin/dashboard',
      icon: mdiDesktopMac,
      label: 'Dashboard'
    }
  ],
  'Staff',
  [
    {
      label: 'Laporan Kerusakan',
      subLabel: 'Submenu',
      icon: mdiViewList,
      menu: [
        {
          to: '/admin/buat-laporan',
          label: 'Buat Laporan',
          icon: mdiSquareEditOutline
        },
        {
          to: '/admin/daftar-laporan-masuk',
          label: 'Daftar Laporan Masuk',
          icon: mdiTable
        },
        {
          to: '/admin/daftar-laporan-aktif',
          label: 'Daftar Laporan Aktif',
          icon: mdiTable
        },
        {
          to: '/admin/daftar-laporan-lanjutan',
          label: 'Daftar Laporan Lanjutan',
          icon: mdiTable
        },
        {
          to: '/admin/riwayat-laporan',
          label: 'Riwayat Laporan',
          icon: mdiTable
        }
      ]
    },
    {
      label: 'Peminjaman Kendaraan',
      subLabel: 'Submenu',
      icon: mdiViewList,
      menu: [
        {
          to: '/admin/daftar-peminjaman-masuk',
          label: 'Daftar Peminjaman Masuk',
          icon: mdiTable
        },
        {
          to: '/admin/daftar-peminjaman-aktif',
          label: 'Daftar Peminjaman Aktif',
          icon: mdiTable
        },
        {
          to: '/admin/riwayat-peminjaman',
          label: 'Riwayat Peminjaman',
          icon: mdiTable
        }
      ]
    },
    {
      label: 'Permintaan Servis',
      subLabel: 'Submenu',
      icon: mdiViewList,
      menu: [
        {
          to: '/admin/buat-servis',
          label: 'Buat Permintaan',
          icon: mdiSquareEditOutline
        },
        {
          to: '/admin/daftar-servis-masuk',
          label: 'Daftar Permintaan Masuk',
          icon: mdiTable
        },
        {
          to: '/admin/daftar-servis-aktif',
          label: 'Daftar Permintaan Aktif',
          icon: mdiTable
        },
        {
          to: '/admin/riwayat-servis',
          label: 'Riwayat Permintaan',
          icon: mdiTable
        }
      ]
    },
    {
      to: '/admin/daftar-stok-barang',
      icon: mdiTable,
      label: 'Stok Barang Gudang'
    },
    {
      to: '/admin/daftar-kendaraan',
      icon: mdiTable,
      label: 'Kendaraan Dinas'
    }
  ],
  'Admin',
  [
    {
      to: '/admin/kelola-user',
      icon: mdiResponsive,
      label: 'Kelola User'
    },
    {
      to: '/admin/kelola-role',
      icon: mdiResponsive,
      label: 'Kelola Role'
    },
    {
      to: '/admin/kelola-unit-kendaraan',
      icon: mdiResponsive,
      label: 'Kelola Kendaraan'
    },
    {
      to: '/admin/kelola-unit-barang',
      icon: mdiResponsive,
      label: 'Kelola Unit Barang'
    },
    {
      to: '/admin/kelola-kerusakan',
      icon: mdiResponsive,
      label: 'Kelola Jenis Kerusakan'
    },
    {
      to: '/admin/kelola-kendaraan',
      icon: mdiResponsive,
      label: 'Kelola Jenis Kendaraan'
    },
    {
      to: '/admin/kelola-servis',
      icon: mdiResponsive,
      label: 'Kelola Jenis Servis'
    },
    {
      to: '/admin/kelola-barang',
      icon: mdiResponsive,
      label: 'Kelola Jenis Barang'
    },
    {
      to: '/admin/kelola-arus-barang',
      icon: mdiResponsive,
      label: 'Kelola Arus Barang'
    }
  ]
]
export const staff = [
  [
    {
      to: '/staff/dashboard',
      icon: mdiDesktopMac,
      label: 'Dashboard'
    }
  ],
  'Staff',
  [
    {
      label: 'Laporan Kerusakan',
      subLabel: 'Submenu',
      icon: mdiViewList,
      menu: [
        {
          to: '/staff/buat-laporan',
          label: 'Buat Laporan',
          icon: mdiSquareEditOutline
        },
        {
          to: '/staff/daftar-laporan-masuk',
          label: 'Daftar Laporan Masuk',
          icon: mdiTable
        },
        {
          to: '/staff/daftar-laporan-aktif',
          label: 'Daftar Laporan Aktif',
          icon: mdiTable
        },
        {
          to: '/staff/daftar-laporan-lanjutan',
          label: 'Daftar Laporan Lanjutan',
          icon: mdiTable
        },
        {
          to: '/staff/riwayat-laporan',
          label: 'Riwayat Laporan',
          icon: mdiTable
        }
      ]
    },
    {
      label: 'Peminjaman Kendaraan',
      subLabel: 'Submenu',
      icon: mdiViewList,
      menu: [
        {
          to: '/staff/daftar-peminjaman-masuk',
          label: 'Daftar Peminjaman Masuk',
          icon: mdiTable
        },
        {
          to: '/staff/daftar-peminjaman-aktif',
          label: 'Daftar Peminjaman Aktif',
          icon: mdiTable
        },
        {
          to: '/staff/riwayat-peminjaman',
          label: 'Riwayat Peminjaman',
          icon: mdiTable
        }
      ]
    },
    {
      label: 'Permintaan Servis',
      subLabel: 'Submenu',
      icon: mdiViewList,
      menu: [
        {
          to: '/staff/buat-servis',
          label: 'Buat Permintaan',
          icon: mdiSquareEditOutline
        },
        {
          to: '/staff/daftar-servis-masuk',
          label: 'Daftar Permintaan Masuk',
          icon: mdiTable
        },
        {
          to: '/staff/daftar-servis-aktif',
          label: 'Daftar Permintaan Aktif',
          icon: mdiTable
        },
        {
          to: '/staff/riwayat-servis',
          label: 'Riwayat Permintaan',
          icon: mdiTable
        }
      ]
    },
    {
      to: '/staff/daftar-stok-barang',
      icon: mdiTable,
      label: 'Stok Barang Gudang'
    },
    {
      to: '/staff/daftar-kendaraan',
      icon: mdiTable,
      label: 'Kendaraan Dinas'
    }
  ]
]
export const teknisi = [
  'General',
  [
    {
      to: '/admin/dashboard',
      icon: mdiDesktopMac,
      label: 'Dashboard'
    },
    {
      label: 'Submenu 1',
      subLabel: 'Submenus Example',
      icon: mdiViewList,
      menu: [
        {
          to: '/admin/profile',
          label: 'Profile',
          icon: mdiAccountCircle
        },
        {
          to: '/admin/tables',
          label: 'Tables',
          icon: mdiTable
        },
        {
          to: '/admin/forms',
          label: 'Forms',
          icon: mdiSquareEditOutline
        }
      ]
    },
    {
      label: 'Submenu 2',
      subLabel: 'Submenus',
      icon: mdiViewList,
      menu: [
        {
          to: '/admin/ui',
          label: 'UI',
          icon: mdiTelevisionGuide
        },
        {
          to: '/admin/responsive',
          label: 'Responsive',
          icon: mdiResponsive
        },
        {
          to: '/login',
          label: 'Login',
          icon: mdiLock
        },
        {
          to: '/error',
          label: 'Error',
          icon: mdiAlertCircle
        }
      ]
    },
    {
      label: 'Submenu 1',
      subLabel: 'Submenus Example',
      icon: mdiViewList,
      menu: [
        {
          to: '/admin/profile',
          label: 'Profile',
          icon: mdiAccountCircle
        },
        {
          to: '/admin/tables',
          label: 'Tables',
          icon: mdiTable
        },
        {
          to: '/admin/forms',
          label: 'Forms',
          icon: mdiSquareEditOutline
        }
      ]
    }
  ]
]
export const adminGudang = [
  'General',
  [
    {
      to: '/admin-gudang/kelola-unit-barang',
      icon: mdiResponsive,
      label: 'Kelola Unit Barang'
    },
    {
      to: '/admin-gudang/kelola-barang',
      icon: mdiResponsive,
      label: 'Kelola Jenis Barang'
    },
    {
      to: '/admin-gudang/kelola-arus-barang',
      icon: mdiResponsive,
      label: 'Kelola Arus Barang'
    }
  ]
]
