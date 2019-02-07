const pm2 = require('pm2');
const SysLogger = require('ain2');
const logger = new SysLogger();

pm2.launchBus(function(err, bus) {
  bus.on('*', function(event, { data, process }) {
    if (event === 'process:event') {
      logger.set({ facility: 'local0', tag: process.name });
      logger.warn(data);
    }
  });

  bus.on('log:err', function({ data, process }) {
    logger.set({ facility: 'local0', tag: process.name });
    logger.error(data);
  });

  bus.on('log:out', function({ data, process }) {
    logger.set({ facility: 'local0', tag: process.name });
    logger.log(data);
  });
});
