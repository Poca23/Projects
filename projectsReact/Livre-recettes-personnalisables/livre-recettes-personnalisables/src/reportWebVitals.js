const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    try {
      import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      });
    } catch (error) {
      console.error("Le module 'web-vitals' n'a pas pu être trouvé. Veuillez l'installer avec 'npm install web-vitals'.", error);
    }
  }
};

export default reportWebVitals;
