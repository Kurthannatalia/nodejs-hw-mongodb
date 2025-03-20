export const errorHandler = (err, req, res, next) => {
    const { message = "Something went wrong", status = 500 } = err;
    res.status(status).json({
        status,
        message,
        data: message,
    });
};
