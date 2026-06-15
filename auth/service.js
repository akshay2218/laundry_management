const User = require("./model");

class AuthService {
  async findByEmail(email) {
    return User.findOne({
      email: email.toLowerCase(),
      isActive: true
    });
  }

  async findById(id) {
    return User.findById(id);
  }

  async createUser(data) {
    return User.create(data);
  }
}

module.exports = new AuthService();