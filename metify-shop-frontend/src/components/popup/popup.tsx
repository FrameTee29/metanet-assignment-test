import Swal, { type SweetAlertOptions } from 'sweetalert2'

export const popup = async ({ ...rest }: SweetAlertOptions) => {
  return await Swal.fire({
    icon: 'question',
    buttonsStyling: false,
    customClass: {
      title: 'text-base font-semibold',
      confirmButton:
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mx-2',
      cancelButton:
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input text-black bg-secondary hover:bg-secondary/70 h-10 px-4 py-2  mx-2'
    },
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    confirmButtonText: 'OK',

    ...rest
  }).then((result) => {
    return result.isConfirmed
  })
}
