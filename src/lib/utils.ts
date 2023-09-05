import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getUserNameInitials = (name: string) => {
  const nameArray = name.split(' ')

  if (nameArray.length === 0 || !name) {
    return ''
  }

  if (nameArray.length === 1) {
    return (name[0] + name[1]).toUpperCase()
  }

  return (
    nameArray[0].charAt(0) + nameArray[nameArray.length - 1].charAt(0)
  ).toUpperCase()
}
