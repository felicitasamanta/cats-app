const wait = (miliseconds: number) => {
  return new Promise<void>((res) => setTimeout(res, miliseconds));
};

export { wait };
