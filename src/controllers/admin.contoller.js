import { Admin } from "../models";
import bcrypt from "bcryptjs";
import { HttpError, tokenEncode } from "../utils";

const login = async (req, res, next) => {
    let { userName, password } = req.body;
    try {
        const user = await Admin.findOne({ userName });
        if (!user) throw new HttpError("UserName or password is incorrect", 400);
        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new HttpError("Username or password is incorrect", 400);

        let data = {
            _id: user._id,
            role: user.role,
        };
        const token = tokenEncode(data);

        res.status(200).json({
            status: 200,
            msg: "Sign up success",
            role: data.role,
            token,
        });
    } catch (error) {
        next(error);
    }
};
export const adminController = {
    login,
};
