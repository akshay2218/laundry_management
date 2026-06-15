document.addEventListener(
    "DOMContentLoaded",
    () => {
  
      const qtyInputs =
        document.querySelectorAll(
          ".qty-input"
        );
  
      function updateInvoice() {
  
        let subtotal = 0;
  
        const selectedItems = [];
  
        qtyInputs.forEach(input => {
  
          const qty =
            Number(input.value);
  
          const rate =
            Number(
              input.dataset.price
            );
  
          if (qty > 0) {
  
            const amount =
              qty * rate;
  
            subtotal += amount;
  
            selectedItems.push({
  
              itemName:
                input.dataset.name,
  
              quantity: qty,
  
              rate,
  
              amount
            });
          }
        });
  
        const gst =
          subtotal * 0.18;
  
        const total =
          subtotal + gst;
  
        document.getElementById(
          "subtotal"
        ).innerText =
          `₹${subtotal.toFixed(2)}`;
  
        document.getElementById(
          "gst"
        ).innerText =
          `₹${gst.toFixed(2)}`;
  
        document.getElementById(
          "total"
        ).innerText =
          `₹${total.toFixed(2)}`;
  
        document.getElementById(
          "invoicePayload"
        ).value =
          JSON.stringify(
            selectedItems
          );
  
        const container =
          document.getElementById(
            "invoiceItems"
          );
  
        if (
          selectedItems.length === 0
        ) {
  
          container.innerHTML =
            `<p class="text-muted">
              No items selected
            </p>`;
  
          return;
        }
  
        container.innerHTML =
          selectedItems
            .map(
              item => `
              <div class="d-flex justify-content-between mb-2">
                <span>
                  ${item.itemName} x ${item.quantity}
                </span>
                <strong>
                  ₹${item.amount}
                </strong>
              </div>
            `
            )
            .join("");
      }
  
      qtyInputs.forEach(input => {
  
        input.addEventListener(
          "input",
          updateInvoice
        );
      });
  
      document
        .querySelectorAll(".increase")
        .forEach(btn => {
  
          btn.addEventListener(
            "click",
            () => {
  
              const input =
                btn.parentElement
                  .querySelector(
                    ".qty-input"
                  );
  
              input.value =
                Number(
                  input.value
                ) + 1;
  
              updateInvoice();
            }
          );
        });
  
      document
        .querySelectorAll(".decrease")
        .forEach(btn => {
  
          btn.addEventListener(
            "click",
            () => {
  
              const input =
                btn.parentElement
                  .querySelector(
                    ".qty-input"
                  );
  
              if (
                Number(
                  input.value
                ) > 0
              ) {
  
                input.value =
                  Number(
                    input.value
                  ) - 1;
              }
  
              updateInvoice();
            }
          );
        });
    }
  );