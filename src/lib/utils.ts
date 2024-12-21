import { getLayersArr } from "@/mock/layer"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const generateFormdata = (values: any) => {
  const formData = new FormData()
  for (const key in values) {
    if (values.hasOwnProperty(key)) {
      const value = values[key];
      formData.append(key, value)
      console.log(value, key)
    }
  }

  return formData
}

export const cleanWords = (str: string) => {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export const getNextLayer = (str: string) => {
  return getLayersArr().indexOf(str) + 1
}

export const isObject = (value: any) => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}