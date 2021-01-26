import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";
import privateKey from "../config/config";
import Worker from "../models/workers";

const { jwtPrivateKey } = privateKey;
export default class AuthService {
  constructor(username, password, id, role) {
    this.username = username;
    this.password = password;
    this.role = role;
    this.id = id;
  }

  generateAuthToken() {
    try {
      return jwt.sign({ id: this.id, role: this.role }, jwtPrivateKey);
    } catch (e) {
      throw new Error(e);
    }
  }

  static validate(user) {
    const schema = {
      username: Joi.string().min(4).max(255).required(),
      password: Joi.string().min(5).max(255).required(),
    };
    return Joi.validate(user, schema);
  }

  async login() {
    const user = {
      username: this.username,
      password: this.password,
    };
    const { error } = await AuthService.validate(user);

    if (error) {
      throw new Error(error);
    }
    const userRecord = await Worker.findOne({
      where: { username: this.username },
    });
    if (!userRecord.id) {
      throw new Error("User not registered");
    }
    const validPassword = await bcrypt.compare(
      this.password,
      userRecord.password
    );
    if (!validPassword) {
      throw new Error("Invalid password");
    }
    const token = this.generateAuthToken(userRecord.id, userRecord.role);
    return { token };
  }
}
