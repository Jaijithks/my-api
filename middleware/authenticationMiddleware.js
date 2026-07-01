import jwt from "jsonwebtoken";

export const permission = (req, res, next) => {

    const authHeader = req.headers.token;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    const token = authHeader;

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};