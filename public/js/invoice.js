let customItems = [];

// stores all selected items across categories
let selectedQuantities = {};
let currentCategory =
    Object.keys(window.pricingData)[0];

function updateInvoice() {

    let subtotal = 0;

    const selectedItems = [...customItems];

    Object.keys(selectedQuantities).forEach(itemName => {

        const qty = Number(
            selectedQuantities[itemName]
        );

        if (qty <= 0) return;

        let rate = 0;

        Object.values(window.pricingData).forEach(category => {

            const item = category.find(
                x => x.itemName === itemName
            );

            if (item) {
                rate = Number(item.price);
            }

        });

        const amount = qty * rate;

        subtotal += amount;

        selectedItems.push({
            itemName,
            quantity: qty,
            rate,
            amount
        });

    });

    customItems.forEach(item => {
        subtotal += Number(item.amount || 0);
    });

    const gst = subtotal * 0.18;
    const total = subtotal + gst;

    document.getElementById('subtotal').innerText =
        `₹${subtotal.toFixed(2)}`;

    document.getElementById('gst').innerText =
        `₹${gst.toFixed(2)}`;

    document.getElementById('total').innerText =
        `₹${total.toFixed(2)}`;

    document.getElementById('invoicePayload').value =
        JSON.stringify(selectedItems);

    const container =
        document.getElementById('invoiceItems');

    if (!selectedItems.length) {

        container.innerHTML =
            '<p class="text-muted">No items selected</p>';

        return;
    }

    container.innerHTML =
        selectedItems.map(item => `
    
                <div class="d-flex justify-content-between border-bottom py-2">
    
                    <div>
    
                        <strong>${item.itemName}</strong>
    
                        <br>
    
                        <small>
                            Qty: ${item.quantity}
                            × ₹${item.rate}
                        </small>
    
                    </div>
    
                    <strong>
                        ₹${item.amount}
                    </strong>
    
                </div>
    
            `).join('');
}

function renderCategory(category) {

    currentCategory = category;
    console.log('current cat ', currentCategory);

    const items =
        window.pricingData[category];

    const container =
        document.getElementById(
            'itemsContainer'
        );

    container.innerHTML =
        items.map(item => `

        <div class="col-md-4 mb-3">

            <div class="item-card">

                <h6>
                    ${item.itemName}
                </h6>

                <div class="price">
                    ₹${item.price}
                </div>

                <div class="qty-controls">

                    <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary decrease">

                        -

                    </button>

                    <input
                        type="number"
                        min="0"
                        value="${selectedQuantities[item.itemName] || 0
            }"
                        class="qty-input"
                        data-name="${item.itemName}"
                        data-price="${item.price}">

                    <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary increase">

                        +

                    </button>

                </div>

            </div>

        </div>

        `).join('');

    attachQtyEvents();
}

function attachQtyEvents() {

    document
        .querySelectorAll('.increase')
        .forEach(btn => {

            btn.addEventListener('click', () => {

                const input =
                    btn.parentElement
                        .querySelector('.qty-input');

                const qty =
                    Number(input.value) + 1;

                input.value = qty;

                selectedQuantities[
                    input.dataset.name
                ] = qty;

                updateInvoice();

            });

        });

    document
        .querySelectorAll('.decrease')
        .forEach(btn => {

            btn.addEventListener('click', () => {

                const input =
                    btn.parentElement
                        .querySelector('.qty-input');

                if (Number(input.value) > 0) {

                    const qty =
                        Number(input.value) - 1;

                    input.value = qty;

                    selectedQuantities[
                        input.dataset.name
                    ] = qty;
                }

                updateInvoice();

            });

        });

    document
        .querySelectorAll('.qty-input')
        .forEach(input => {

            input.addEventListener(
                'input',
                () => {

                    selectedQuantities[
                        input.dataset.name
                    ] = Number(input.value);

                    updateInvoice();
                }
            );

        });

}

document.addEventListener(
    'DOMContentLoaded',
    () => {

        let subtotal = 0;

        const selectedItems = [...customItems];

        Object.keys(selectedQuantities)
            .forEach(itemName => {

                const input =
                    document.querySelector(
                        `[data-name="${itemName}"]`
                    );

                const qty =
                    selectedQuantities[itemName];

                if (!qty || qty <= 0) {
                    return;
                }

                let rate = 0;

                Object.values(window.pricingData)
                    .forEach(category => {

                        const item =
                            category.find(
                                x => x.itemName === itemName
                            );

                        if (item) {
                            rate = item.price;
                        }

                    });

                const amount = qty * rate;

                subtotal += amount;

                selectedItems.push({
                    itemName,
                    quantity: qty,
                    rate,
                    amount
                });

            });

        document
            .querySelectorAll(
                '.increase'
            )
            .forEach(btn => {

                btn.addEventListener(
                    'click',
                    () => {

                        const input =
                            btn.parentElement
                                .querySelector(
                                    '.qty-input'
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
            .querySelectorAll(
                '.decrease'
            )
            .forEach(btn => {

                btn.addEventListener(
                    'click',
                    () => {

                        const input =
                            btn.parentElement
                                .querySelector(
                                    '.qty-input'
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

        document
            .getElementById(
                'saveCustomItem'
            )
            ?.addEventListener(
                'click',
                () => {

                    const qty =
                        parseInt(
                            document.getElementById(
                                'customQty'
                            ).value
                        ) || 1;

                    const rate =
                        parseFloat(
                            document.getElementById(
                                'customAmount'
                            ).value
                        ) || 0;

                    const item = {

                        itemName:
                            document.getElementById(
                                'customName'
                            ).value,

                        quantity:
                            qty,

                        rate:
                            rate,

                        amount:
                            qty * rate,

                        custom:
                            true,

                        notes:
                            document.getElementById(
                                'customNotes'
                            ).value

                    };

                    customItems.push(
                        item
                    );

                    updateInvoice();

                    bootstrap.Modal
                        .getInstance(
                            document.getElementById(
                                'customClothModal'
                            )
                        )
                        ?.hide();

                    document.getElementById(
                        'customName'
                    ).value = '';

                    document.getElementById(
                        'customQty'
                    ).value = '1';

                    document.getElementById(
                        'customAmount'
                    ).value = '';

                    document.getElementById(
                        'customNotes'
                    ).value = '';

                }
            );

        document
            .querySelectorAll('.service-tab')
            .forEach(tab => {

                tab.addEventListener(
                    'click',
                    () => {

                        document
                            .querySelectorAll('.service-tab')
                            .forEach(
                                x => x.classList.remove('active')
                            );

                        tab.classList.add('active');

                        renderCategory(
                            tab.dataset.category
                        );
                    }
                );

            });

        updateInvoice();
        renderCategory(currentCategory);
    }
);