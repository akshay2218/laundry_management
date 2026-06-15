document.addEventListener(
    "DOMContentLoaded",
    () => {
  
      const search =
        document.getElementById(
          "searchInput"
        );
  
      if (!search) return;
  
      search.addEventListener(
        "keyup",
        () => {
  
          const filter =
            search.value.toLowerCase();
  
          document
            .querySelectorAll(
              "#pricingTable tbody tr"
            )
            .forEach(row => {
  
              row.style.display =
                row.innerText
                  .toLowerCase()
                  .includes(filter)
                  ? ""
                  : "none";
            });
        }
      );
    }
  );