export const notFoundMiddleware = (req, res, next) => {
  const error = new Error(`No se puede encontrar ${req.originalUrl} en el servidor`);
  res.status(404);
  next(error);
};
