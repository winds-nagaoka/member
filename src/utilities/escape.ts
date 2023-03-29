export const escapeReg = (string: string) => {
  const reRegExp = /[\\^$.*+?()[\]{}|]/g
  const reHasRegExp = new RegExp(reRegExp.source)
  return string && reHasRegExp.test(string) ? string.replace(reRegExp, '\\$&') : string
}
