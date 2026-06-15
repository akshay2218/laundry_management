document.addEventListener(
    "DOMContentLoaded",
    () => {
  
      const fromDate =
        document.querySelector(
          'input[name="fromDate"]'
        );
  
      const toDate =
        document.querySelector(
          'input[name="toDate"]'
        );
  
      if (
        fromDate &&
        toDate
      ) {
  
        fromDate.addEventListener(
          "change",
          () => {
  
            toDate.min =
              fromDate.value;
          }
        );
      }
    }
  );