import { loginAccount } from "../services/auth.service";
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email?.trim() || !password) {
            res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
            return;
        }
        const result = await loginAccount(email, password);
        res.status(200).json({
            success: true,
            message: "Login successful.",
            token: result.token,
            user: result.user,
        });
    }
    catch (error) {
        next(error);
    }
};
