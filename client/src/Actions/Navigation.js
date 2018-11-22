export const navigationMenuToggle = () => {
  return (dispatch, getState) => {
    dispatch(navigationMenu(!getState().navigation.menuOpen))
  }
}

export const navigationMenu = (menuOpen) => ({
  type: 'NAVIGATION_MENU',
  payload: {
    menuOpen
  }
})

export const navigationTitleUpdate = (title) => ({
  type: 'NAVIGATION_TITLE_UPDATE',
  payload: {
    title
  }
})
