module.exports = (error, request, response, next) => {
  let { description } = error;
  const { title } = error;

  const status = error.status || 500;
  if (status === 500) {
    description = "Serveur cassé. Revenez plus tard.";
  }

  response.status(error.status).json({
    title,
    description,
  });
};
