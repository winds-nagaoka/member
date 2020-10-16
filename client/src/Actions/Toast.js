export const showToast = (string) => {
  return async (dispatch, getState) => {
    if (getState().toast.status) return false
    const timeout = 3600
    dispatch(display(string))
    setTimeout(() => {
      dispatch(hide(true))
    }, timeout - 600)
    setTimeout(() => {
      dispatch(end())
    }, timeout)
  }
}

export const display = (string) => {
  return {
    type: 'TOAST_DISPLAY',
    payload: {
      string,
      status: true,
      hide: false,
      end: false,
    },
  }
}

export const hide = () => ({
  type: 'TOAST_HIDE',
  payload: {
    status: true,
    hide: true,
    end: false,
  },
})

export const end = () => ({
  type: 'TOAST_END',
  payload: {
    string: '',
    status: false,
    hide: true,
    end: true,
  },
})
