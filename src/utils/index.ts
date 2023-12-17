export const DelayTime = (time = 2000) =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });
