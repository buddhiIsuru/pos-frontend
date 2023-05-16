export const localStorageGetItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

/*
assign value local storage
key is type string 
value is type 
*/
export const localStorageSetItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
