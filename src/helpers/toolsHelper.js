import Swal from 'sweetalert2'

export function formatDate(value, locale = 'id-ID') {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '-'
  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export const showSuccessAlert = (message, title = 'Berhasil') =>
  Swal.fire({ icon: 'success', title, text: message, confirmButtonText: 'OK' })

export const showErrorAlert = (message, title = 'Gagal') =>
  Swal.fire({ icon: 'error', title, text: message, confirmButtonText: 'OK' })

export async function showConfirmDialog(
  message,
  { title = 'Apakah Anda yakin?', confirmText = 'Ya', cancelText = 'Batal' } = {},
) {
  const result = await Swal.fire({
    icon: 'warning',
    title,
    text: message,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  })
  return result.isConfirmed
}
