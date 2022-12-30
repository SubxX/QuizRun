export const sleep = (time = 250) =>
    new Promise((resolve) => setTimeout(() => resolve(true), time));