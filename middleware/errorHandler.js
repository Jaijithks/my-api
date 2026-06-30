const errorHandler = (err, req, res, next) => {

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // MongoDB Invalid ObjectId
    if (err.name === "CastError") {
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    }

    // Duplicate Key Error
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];

        statusCode = 409;
        message = `${field} already exists.`;
    }

    // Mongoose Validation Error
    if (err.name === "ValidationError") {

        const errors = Object.values(err.errors)
            .map(val => val.message);

        statusCode = 400;
        message = errors.join(", ");
    }

    // JWT Invalid
    if (err.name === "JsonWebTokenError") {
        statusCode = 401;
        message = "Invalid Token.";
    }

    // JWT Expired
    if (err.name === "TokenExpiredError") {
        statusCode = 401;
        message = "Token Expired.";
    }

    // Multer File Size
    if (err.code === "LIMIT_FILE_SIZE") {
        statusCode = 400;
        message = "File size exceeds limit.";
    }

    // Multer Unexpected File
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
        statusCode = 400;
        message = "Unexpected file uploaded.";
    }

    console.error(err);

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message,
        stack:
            process.env.NODE_ENV === "development"
                ? err.stack
                : undefined
    });

};

export default errorHandler;