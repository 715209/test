import { Router, Request, Response, NextFunction } from "express";
import User from "../models/user";
import * as uid from "uid-safe";

class userRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    /**
     * getUsers
     */
    public getUsers(req: Request, res: Response): void {
        User.find({})
            .then((data) => {
                const status = res.statusCode;

                res.json({
                    status,
                    data
                });
            })
            .catch((err) => {
                const status = res.statusCode;

                res.json({
                    status,
                    err
                })
            });
    }

    /**
     * getUser
     */
    public getUser(req: Request, res: Response): void {
        const id: string = req.params.id;

        User.findOne({ id })
            .then((data) => {
                const status = res.statusCode;

                res.json({
                    status,
                    data
                });
            })
            .catch((err) => {
                const status = res.statusCode;

                res.json({
                    status,
                    err
                })
            });
    }

    /**
     * createUser
     */
    public createUser(req: Request, res: Response): void {
        const username: string = req.body.username;
        const password: string = req.body.password;
        const email: string = req.body.email;
        const streamKey: string = uid.sync(39);
        const admin: boolean = req.body.admin;

        const user = new User({
            username,
            password,
            email,
            streamKey,
            admin
        });

        user.save()
            .then((data) => {
                const status = res.statusCode;

                res.json({
                    status,
                    data
                });
            })
            .catch((err) => {
                const status = res.statusCode;

                res.json({
                    status,
                    err
                })
            });
    }

    /**
     * updateUser
     */
    public updateUser(req: Request, res: Response): void {
        const id: string = req.params.id;

        User.findOneAndUpdate({ id }, req.body)
            .then((data) => {
                const status = res.statusCode;

                res.json({
                    status,
                    data
                });
            })
            .catch((err) => {
                const status = res.statusCode;

                res.json({
                    status,
                    err
                })
            });
    }

    /**
     * deleteUser
     */
    public deleteUser(req: Request, res: Response): void {
        const id: string = req.params.id;

        User.findOneAndRemove({ id })
            .then((data) => {
                const status = res.statusCode;

                res.json({
                    status,
                    data
                });
            })
            .catch((err) => {
                const status = res.statusCode;

                res.json({
                    status,
                    err
                })
            });
    }

    routes() {
        this.router.get("/", this.getUsers);
        this.router.get("/:id", this.getUser);
        this.router.post("/", this.createUser);
        this.router.put("/:id", this.updateUser);
        this.router.delete("/:id", this.deleteUser);
    }
}

const userRoutes = new userRouter();
userRoutes.routes();

export default userRoutes.router;