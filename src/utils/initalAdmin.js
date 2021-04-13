import { Admin } from "../models";
import bcrypt from "bcryptjs";
export const initAccountAmin = async () => {
    try {
        let admin = await Admin.findOne({ userName: "admin" });
        if (admin) {
            console.log("Account admin is already");
            return;
        }
        const password = "123456";
        const hash = await bcrypt.hash(password, 12);
        admin = await Admin.create({
            userName: "admin",
            password: hash,
            role: 0,
        });
        console.log("Account admin has been created.");
    } catch (error) {
        console.log(error);
    }
};
