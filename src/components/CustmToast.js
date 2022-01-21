export const SuccessToast = (toast, success) => {
  toast.show(success, {
    type: 'success',
    placement: 'bottom',
    duration: 2500,
    offset: 50,
    animationType: 'slide-in',
  });
};

export const ErrorToast = (toast, error) => {
  toast.show(error, {
    type: 'danger',
    placement: 'bottom',
    duration: 2500,
    offset: 50,
    animationType: 'slide-in',
  });
};
