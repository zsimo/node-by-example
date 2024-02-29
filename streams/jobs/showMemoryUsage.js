const { exec } = require('node:child_process');
const childProcess = exec("while :; do du -sh  ./ ; sleep 1; done;");
childProcess.stdout.on('data', (data) => {
    console.log("disk size: " + data, "memory: " + process.memoryUsage().rss / (1024 * 1024) + "mb");
});
