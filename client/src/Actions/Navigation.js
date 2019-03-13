const prefix = 'NAVIGATION_'
export const navigationMenuToggle = () => {
  return (dispatch, getState) => {
    dispatch(navigationMenu(!getState().navigation.menuOpen))
  }
}

export const navigationMenu = (menuOpen) => ({
  type: prefix + 'MENU',
  payload: { menuOpen }
})

export const setNavigationTitle = (title) => ({
  type: prefix + 'SET_NAVIGATION_TITLE',
  payload: { title }
})

export const setBackNavigation = (backNavigation, backNavigationPath) => ({
  type: prefix + 'SET_BACKLINK',
  payload: { backNavigation, backNavigationPath}
})

export const releaseBackNavigation = () => ({
  type: prefix + 'SET_BACKLINK',
  payload: { backNavigation: false, backNavigationPath: undefined }
})