const useIsPc = () => {
  const winWidth = window.screen.width;
  const isPc = winWidth >= 770;
  return isPc;
};

export default useIsPc;
