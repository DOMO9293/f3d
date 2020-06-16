import { ScrapActionTypes } from "./scrap.types";

export const addItem = (item) => ({
  type: ScrapActionTypes.ADD_ITEM,
  payload: item,
});

export const clearItemFromScrap = (item) => ({
  type: ScrapActionTypes.CLEAR_ITEM_FROM_SCRAP,
  payload: item,
});
