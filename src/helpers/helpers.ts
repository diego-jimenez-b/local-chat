export const getStorageItem = (key: string): any[] => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : [];
};
