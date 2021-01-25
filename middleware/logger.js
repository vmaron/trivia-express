const {levels, connectLogger} = require('log4js');
const log4js = require('log4js');

log4js.configure({
  appenders: {
    console: {type: 'stdout'},
    everything: {type: 'dateFile', filename: 'logs/app.log'},
  },
  categories: {
    default: {appenders: ['console', 'everything'], level: 'debug'},
  },
});

const logger = log4js.getLogger();
logger.level = 'info';

const statusRules = [
  {from: 200, to: 299, level: levels.INFO},
  {from: 300, to: 399, level: levels.WARN},
  {from: 400, to: 1000, level: levels.ERROR},
];

const httpLogger = () => connectLogger(logger, {
  level: 'auto',
  statusRules
});

module.exports = {
  httpLogger,
};
