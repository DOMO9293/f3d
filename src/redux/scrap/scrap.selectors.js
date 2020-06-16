import { createSelector } from "reselect";

const selectScrap = (state) => state.scrap;

export const selectScrapItems = createSelector(
  [selectScrap],
  (scrap) => scrap.scraps
);

export const selectScrapsCount = createSelector(
  [selectScrapItems],
  (scrapItems) => scrapItems.reduce((acc, item) => acc + item, 0)
);
