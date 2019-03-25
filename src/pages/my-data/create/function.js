import {
  TITLE_NAME,
  BUTTON_ADD,
  LOADING_TEXT
} from './constant'

export const getText = (type = '') => {
  return {
    title: TITLE_NAME[type] || `New ${type}`,
    buttonDesc: BUTTON_ADD[type] || `Add ${type}`
  };
}

export const getLoadingData = ({ loadingState, isLoading }) => {
  const text = LOADING_TEXT[loadingState];
  return {
    textLoading: text || '',
    showLoading: isLoading && text
  };
};