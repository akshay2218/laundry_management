const Invoice =
  require("./invoice.model");

const Order =
  require("../orders/order.model");

const Coupon =
  require("../coupons/coupon.model");

const Settings =
  require("../settings/settings.model");

const PriceItem =
  require("../pricing/priceItem.model");

const pricingItems =
  require('../../data/pricing-items.json');

const puppeteer =
  require("puppeteer");

const path =
  require("path");

const fs =
  require("fs");

const ejs =
  require("ejs");
class InvoiceService {

  async getOrder(orderId) {
    return Order.findById(orderId)
      .populate("customerId")
      .populate("addressId");
  }

  async getPriceItems(
    serviceId,
    category
  ) {

    // const query = {
    //   isActive: true
    // };

    // if (serviceId) {
    //   query.serviceId =
    //     serviceId;
    // }

    // if (category) {
    //   query.category =
    //     category;
    // }


    // return PriceItem.find(query);
    return pricingItems;
  }

  async getCoupon(code) {

    if (!code) {
      return null;
    }

    return Coupon.findOne({
      code,
      isActive: true
    });
  }

  async calculateInvoice(
    payload
  ) {

    const settings =
      await Settings.findOne();

    const gstRate =
      settings?.gstPercentage ||
      18;

    let subtotal = 0;

    payload.items.forEach(
      item => {

        subtotal +=
          item.quantity *
          item.rate;
      }
    );

    let discount = 0;

    if (
      payload.couponCode
    ) {

      const coupon =
        await this.getCoupon(
          payload.couponCode
        );

      if (coupon) {

        if (
          coupon.discountType ===
          "PERCENTAGE"
        ) {

          discount =
            (
              subtotal *
              coupon.discountValue
            ) /
            100;

        } else {

          discount =
            coupon.discountValue;
        }
      }
    }

    const taxableAmount =
      subtotal - discount;

    const gstAmount =
      (
        taxableAmount *
        gstRate
      ) / 100;

    const finalAmount =
      taxableAmount +
      gstAmount +
      (
        payload.deliveryCharge ||
        0
      ) +
      (
        payload.expressCharge ||
        0
      );

    return {

      subtotal,

      discount,

      taxableAmount,

      gstAmount,

      finalAmount
    };
  }

  async generateInvoice(
    payload
  ) {

    const totals =
      await this.calculateInvoice(
        payload
      );
    const customItems =
      payload.items.filter(
        item => item.custom === true
      );

    const invoiceNumber =
      `INV${Date.now()}`;
    return Invoice.create({
      customerId: payload.customerId,
      invoiceNumber,

      orderId: payload.orderId,

      items: payload.items,
      customItems,
      couponCode: payload.couponCode,

      deliveryCharge:
        payload.deliveryCharge || 0,

      expressCharge:
        payload.expressCharge || 0,

      deliveryDate:
        payload.deliveryDate,

      deliveryTime:
        payload.deliveryTime,

      challanNumber:
        payload.challanNumber,

      customerGST:
        payload.customerGST,

      comments:
        payload.comments,

      generatedAt:
        new Date(),

      isFinalized: true,

      sgstAmount:
        totals.gstAmount / 2,

      cgstAmount:
        totals.gstAmount / 2,

      ...totals
    });
  }

  async getInvoice(id) {

    return Invoice.findById(id)
      .populate({
        path: "orderId",
        populate: {
          path:
            "customerId"
        }
      });
  }

  async generatePdf(invoice) {

    const browser =
      await puppeteer.launch({
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox"
        ]
      });

    const page =
      await browser.newPage();

    const html =
      await ejs.renderFile(
        path.join(
          process.cwd(),
          "src/views/invoices/pdf.ejs"
        ),
        { invoice }
      );

    await page.setContent(
      html,
      {
        waitUntil:
          "networkidle0"
      }
    );

    const invoiceDir =
      path.join(
        process.cwd(),
        "public",
        "invoices"
      );

    if (
      !fs.existsSync(
        invoiceDir
      )
    ) {

      fs.mkdirSync(
        invoiceDir,
        {
          recursive: true
        }
      );

    }

    const pdfPath =
      path.join(
        invoiceDir,
        `${invoice.invoiceNumber}.pdf`
      );

    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true
    });

    await browser.close();

    return pdfPath;
  }
}

module.exports =
  new InvoiceService();