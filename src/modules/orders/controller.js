const {
    validationResult
  } = require(
    "express-validator"
  );
  
  const service =
    require("./service");
  
  class OrderController {
  
    async dashboard(
      req,
      res,
      next
    ) {
      try {
  
        const orders =
          await service.getDashboardOrders(
            req.query
          );
  
        res.render(
          "orders/dashboard",
          {
            title:
              "Orders",
            orders
          }
        );
  
      } catch (err) {
        next(err);
      }
    }
  
    async createPage(
      req,
      res,
      next
    ) {
      try {
  
        const customer =
          await service.getCustomer(
            req.params.customerId
          );
  
        const addresses =
          await service.getCustomerAddresses(
            req.params.customerId
          );
  
        res.render(
          "orders/create",
          {
            title:
              "Create Order",
  
            customer,
  
            addresses,
  
            errors: []
          }
        );
  
      } catch (err) {
        next(err);
      }
    }
  
    async create(
      req,
      res,
      next
    ) {
  
      try {
  
        const errors =
          validationResult(req);
  
        if (
          !errors.isEmpty()
        ) {
  
          return res.render(
            "orders/create",
            {
              errors:
                errors.array()
            }
          );
        }
  
        const order =
          await service.createOrder(
            req.body,
            req.user._id
          );
  
        res.redirect(
          `/orders/${order._id}`
        );
  
      } catch (err) {
        next(err);
      }
    }
  
    async details(
      req,
      res,
      next
    ) {
  
      try {
  
        const order =
          await service.getOrder(
            req.params.id
          );
  
          const DeliveryPerson =
          require("../delivery/deliveryPerson.model");
         
         const deliveryPersons =
          await DeliveryPerson.find({
            isActive:true
          });
         
         res.render(
          "orders/details",
          {
            title:"Order Details",
            order,
            deliveryPersons
          }
         );
  
      } catch (err) {
        next(err);
      }
    }
  
    async updateStatus(
      req,
      res,
      next
    ) {
  
      try {
  
        await service.updateStatus(
          req.params.id,
  
          req.body.status,
  
          req.user._id
        );
  
        res.redirect(
          `/orders/${req.params.id}`
        );
  
      } catch (err) {
        next(err);
      }
    }
  
    async assignDelivery(
      req,
      res,
      next
    ) {
  
      try {
  
        await service.assignDelivery(
          req.params.id,
  
          req.body.deliveryPersonId,
  
          req.user._id
        );
  
        res.redirect(
          `/orders/${req.params.id}`
        );
  
      } catch (err) {
        next(err);
      }
    }
  }
  
  module.exports =
    new OrderController();