export const uid = () =>
  Math.random().toString(36).substring(2).replace(/[0-9]/g, "");
