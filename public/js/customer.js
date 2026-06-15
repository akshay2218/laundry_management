document.addEventListener(
    "DOMContentLoaded",
    () => {
  
      const phoneInputs =
        document.querySelectorAll(
          'input[name="phone"]'
        );
  
      phoneInputs.forEach(
        input => {
  
          input.addEventListener(
            "input",
            function () {
  
              this.value =
                this.value.replace(
                  /[^0-9]/g,
                  ""
                );
            }
          );
        }
      );
    }
  );