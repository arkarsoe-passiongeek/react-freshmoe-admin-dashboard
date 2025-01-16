import { getSlug } from "@/lib/utils";

export const getLayersArr = (layers = []) => {
  return layers.map((each) => getSlug(each.name));
};
