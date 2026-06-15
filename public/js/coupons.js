document.addEventListener(
    "DOMContentLoaded",
    () => {
  
      const validFrom =
        document.querySelector(
          'input[name="validFrom"]'
        );
  
      const validTo =
        document.querySelector(
          'input[name="validTo"]'
        );
  
      if (
        validFrom &&
        validTo
      ) {
  
        validFrom.addEventListener(
          "change",
          () => {
  
            validTo.min =
              validFrom.value;
          }
        );
      }
    }
  );