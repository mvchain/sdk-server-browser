/**
 * Created by jiachenpan on 16/11/18.
 */

export function isPhone(phone) {
  if (!(/^1[34578]\d{9}$/.test(phone))) {
    return false
  } else {
    return true
  }
}
