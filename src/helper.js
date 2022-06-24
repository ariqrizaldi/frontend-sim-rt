export const convertDate = (responseDate, time = false) => {
  if (responseDate) {
    const dateComponents = responseDate.split('T')
    const datePieces = dateComponents[0].split('-')
    const timeComponents = dateComponents[1].split('+')
    const dateTime = new Date(responseDate)
    const weekday = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    const month = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    if (time) {
      return (weekday[dateTime.getDay()] + ', ' + datePieces[2] + ' ' + month[datePieces[1] - 1] + ' ' + datePieces[0] + ' - ' + timeComponents[0])
    } else return (weekday[dateTime.getDay()] + ', ' + datePieces[2] + ' ' + month[datePieces[1] - 1] + ' ' + datePieces[0])
  }
}

export const toDate = (responseDate) => {
  if (responseDate) {
    const dateComponents = new Date(responseDate)
    const newDate = dateComponents.toISOString()
    return newDate
  }
}

export const dateInput = (responseDate) => {
  if (responseDate) {
    const dateComponents = responseDate.split('+')
    const datePieces = dateComponents[0].split(':')
    return (datePieces[0] + ':' + datePieces[1])
  }
}
export const mapRole = (key) => {
  const role = ['User', 'Admin', 'Staff', 'Admin Gudang', 'Teknisi', 'Sopir']
  return role[key - 1]
}
