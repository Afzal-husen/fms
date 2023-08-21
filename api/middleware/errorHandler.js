const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Something went wrong! please try again later";

  if(err.code === "ER_DUP_ENTRY") {
    // err.message = "Email already exists"
    err.message = "Duplicate entry detected"
    err.statusCode = 400
  }
  

  res.status(err.statusCode).json({
    success: false,
    status: err.statusCode,
    message: err.message,
  });
};

export default errorHandler;
