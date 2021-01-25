const {LOCAL} = require("../config/environments");
const logger = require('log4js').getLogger();
const {GeneralError} = require('../utils/errors');

const handleErrors = (err, req, res, next) => {

  logger.error(`${err.message} User Agent: ${req.headers['user-agent']}, Host: ${req.headers.host}, Url: "${req.originalUrl}", Method: ${req.method}, Params: ${JSON.stringify(req.params)}, Query: ${JSON.stringify(req.query)}, Body: ${JSON.stringify(req.body)}, Status Code: ${res.statusCode}`);

  const error = (process.env.NODE_ENV === LOCAL) ? {
    status: 'error',
    name: err.name,
    message: err.message,
    stack: err.stack,
    code: err.code,
  } : {
    status: 'error',
    name: err.name,
    message: err.message
  };

  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json(error);
  }

  return res.status(500).json(error);
}

module.exports = handleErrors;
