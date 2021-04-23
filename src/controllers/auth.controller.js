import { Viewer, Blogger } from "../models";
import bcrypt from "bcryptjs";
import { HttpError, tokenEncode } from "../utils";

const register = async (req, res, next) => {
    let { password, email, fullName, role } = req.body;
    console.log(role);
    try {
        if (!password || !email || !fullName || !role) throw new HttpError("data is empty", 400);
        email = email.toLowerCase();
        const user1 = await Viewer.findOne({ email });
        const user2 = await Blogger.findOne({ email });
        if (user1 || user2) {
            throw new HttpError("The email has already been used by another account", 400);
        }
        const hash = await bcrypt.hash(password, 12);
        if (role == 1) await Viewer.create({ email, password: hash, role, fullName });
        if (role == 2) await Blogger.create({ email, password: hash, role, fullName });
        res.status(200).json({
            status: 200,
            msg: "Sign up success",
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const login = async (req, res, next) => {
    let { email, password } = req.body;
    email = email.toLowerCase();
    try {
        const user1 = await Viewer.findOne({ email });
        const user2 = await Blogger.findOne({ email });

        if (!user1 && !user2) throw new HttpError("Email or password is incorrect", 400);
        const user = user1 || user2;

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new HttpError("Email or password is incorrect", 400);

        let data = {
            email: user.email,
            _id: user._id,
            role: user.role,
        };
        const token = tokenEncode(data);

        res.status(200).json({
            status: 200,
            msg: "Sign up success",
            role: data.role,
            token,
            userId: user._id,
            fullName: user.fullName,
        });
    } catch (error) {
        next(error);
    }
};
export const authController = {
    register,
    login,
};
