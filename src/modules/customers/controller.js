const {
    validationResult
  } = require(
    "express-validator"
  );
  
  const service =
    require("./service");
  
  class CustomerController {
  
    async list(
      req,
      res,
      next
    ) {
      try {
  
        const customers =
          await service.getCustomers(
            req.query
          );
  
        res.render(
          "customers/index",
          {
            title:
              "Customers",
            customers
          }
        );
  
      } catch (err) {
        next(err);
      }
    }
  
    createPage(
      req,
      res
    ) {
      res.render(
        "customers/create",
        {
          title:
            "Add Customer",
          errors: [],
          old: {}
        }
      );
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
            "customers/create",
            {
              title:
                "Add Customer",
              errors:
                errors.array(),
              old:
                req.body
            }
          );
        }
  
        const customer =
          await service.create(
            req.body
          );
  
        return res.redirect(
          `/customers/${customer._id}`
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
  
        const customer =
          await service.getById(
            req.params.id
          );
  
        const addresses =
          await service.getAddresses(
            req.params.id
          );
  
        res.render(
          "customers/details",
          {
            title:
              "Customer Details",
            customer,
            addresses
          }
        );
  
      } catch (err) {
        next(err);
      }
    }
  
    async editPage(
      req,
      res,
      next
    ) {
      try {
  
        const customer =
          await service.getById(
            req.params.id
          );
  
        res.render(
          "customers/edit",
          {
            title:
              "Edit Customer",
            customer,
            errors: []
          }
        );
  
      } catch (err) {
        next(err);
      }
    }
  
    async update(
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
            "customers/edit",
            {
              title:
                "Edit Customer",
              customer:
                req.body,
              errors:
                errors.array()
            }
          );
        }
  
        await service.update(
          req.params.id,
          req.body
        );
  
        res.redirect(
          `/customers/${req.params.id}`
        );
  
      } catch (err) {
        next(err);
      }
    }
  
    async createAddress(
      req,
      res,
      next
    ) {
      try {
  
        await service.createAddress(
          {
            ...req.body,
            customerId:
              req.params.id
          }
        );
  
        res.redirect(
          `/customers/${req.params.id}`
        );
  
      } catch (err) {
        next(err);
      }
    }
  
    async deleteAddress(
      req,
      res,
      next
    ) {
      try {
  
        await service.deleteAddress(
          req.params.addressId
        );
  
        res.redirect(
          `/customers/${req.params.id}`
        );
  
      } catch (err) {
        next(err);
      }
    }
  }
  
  module.exports =
    new CustomerController();