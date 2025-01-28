import { getLayersArr } from "@/mock/layer";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateFormdata = (values: any) => {
  const formData = new FormData();
  for (const key in values) {
    if (values.hasOwnProperty(key)) {
      const value = values[key];
      formData.append(key, value);
    }
  }

  return formData;
};

export const cleanWords = (str: string) => {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getNextLayer = (layers = [], str: string) => {
  return getLayersArr(layers).indexOf(str) + 1;
};

export const isLastLayer = (layers = [], str: string) => {
  return getLayersArr(layers).indexOf(str) === layers.length - 1;
};

export const isObject = (value: any) => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

/**
 * Transforms an object where nested objects with an `id` field
 * are converted into their string representation.
 *
 * @param data The input object to be transformed.
 * @returns A new object with transformed values.
 */
export const transformObjectWithId = (data: Record<string, any>) => {
  let transformedData: Record<string, any> = {};

  if (data && Object.keys(data).length > 0) {
    Object.keys(data).forEach((key) => {
      if (data[key] && typeof data[key] === "object" && data[key]?.id) {
        // If the value is an object with an `id`, store its string representation
        transformedData[key] = `${data[key].id}`;
      } else {
        transformedData[key] = data[key];
      }
    });
  }

  return transformedData;
};

export const getSlug = (str: string): string => {
  return str
    .toLowerCase() // Convert the string to lowercase
    .trim() // Trim leading/trailing whitespace
    .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric characters (except spaces and hyphens)
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen
};

export const getImage = () => {
  return
}