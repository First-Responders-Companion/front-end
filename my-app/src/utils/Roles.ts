/**
 * Keep  the file in sync with client/src/utils/roles.ts
 */
export enum ROLES {
  CITIZEN = 'Citizen',
  DISPATCH = 'Dispatch',
  POLICE = 'Police',
  FIRE = 'Fire',
  NURSE = 'Nurse',
  ADMINISTRATOR = 'Administrator',
  SWAT = 'SWAT',
}

export default ROLES

export const isCitizen = (role: ROLES) => {
  return role === ROLES.CITIZEN
}

export const isFirstResponder = (role: ROLES) => {
  if (role === ROLES.FIRE || role === ROLES.POLICE) {
    return true
  } else {
    return false
  }
}

export const isFireFighter = (role: ROLES) => {
  return role === ROLES.FIRE
}

export const isNurse = (role: ROLES) => {
  return role === ROLES.NURSE
}

export const isSWAT = (role: ROLES) => {
  return role === ROLES.SWAT
}

export const isPolice = (role: ROLES) => {
  return role === ROLES.POLICE
}
