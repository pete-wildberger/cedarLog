import { Request, Response, NextFunction } from "express";
import { UsersModel } from "../models";
import * as bcrypt from "bcrypt";

class UsersHandler {
  constructor() {}
  comparePassword(user: { [key: string]: any }, passwordToCompare: string) {
    return new Promise(resolve => {
      bcrypt.compare(
        passwordToCompare,
        user.password,
        (err: any, match: boolean) => {
          if (err) {
            console.log("Error comparing password", err);
            return resolve(false);
          }
          resolve(match);
        }
      );
    });
  }
  isLoggedIn(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
      console.log("isLoggedIn", req);
      next();
    } else {
      console.log("nope");
      res.redirect("/");
    }
  }
  login(req: Request, res: Response) {
    res.status(200).send({
      email: req.user.email,
      _id: req.user._id,
      auth: req.isAuthenticated()
    });
  }
  register = (req: Request, res: Response) => {
    console.log(req.body.password);
    bcrypt.hash(req.body.password, +process.env.SALT, (err, hash) => {
      if (err) {
        console.log("Error hashing password", err);
        res.status(400).send("unable to hash.");
      }
      let newUser = {
        email: req.body.email,
        password: hash
      };
      UsersModel.single_insert(newUser).then(data => {
        if (data) {
          console.log("login", req);
          req.login(data, err => {
            if (err) {
              console.log("err", err);
              res.status(400).send("unable to authenticate.");
            } else {
              console.log("newUser", data);
              data.auth = req.isAuthenticated();
              res.status(201).send(data);
            }
          });
        } else {
          res.status(400).send(data);
        }
      });
    });
  };
}
export const Users = new UsersHandler();
