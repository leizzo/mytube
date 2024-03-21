export const observeUrl = (
  callback: (data: {
    path: Location["pathname"];
    query: Location["search"];
  }) => void
) => {
  let previousUrl = "";
  const observer = new MutationObserver(function () {
    if (location.href !== previousUrl) {
      previousUrl = location.href;

      // Here you would execute the code you want
      callback({ path: location.pathname, query: location.search });
    }
  });
  const config = { subtree: true, childList: true };
  observer.observe(document, config);
};


export const isHomePage = (path: string) => {
  const pattern = /^\/$/;

  return pattern.test(path);
};

export const isWatchPage = (path: string) => {
  const pattern = /(?:\w+\s)*watch(?:\s\w+)*/;

  return pattern.test(path);
};
