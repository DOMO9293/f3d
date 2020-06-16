import { ScrapActionTypes } from "./scrap.types";

const INITIAL_STATE = {
  scraps: null,
};

const scrapReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ScrapActionTypes.ADD_ITEM:
      return {
        ...state,
        scraps: action.payload,
      };
    case ScrapActionTypes.CLEAR_ITEM_FROM_SCRAP:
      return {
        ...state,
        scraps: state.scraps.filter(
          (scrapItem) => scrapItem.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export default scrapReducer;
