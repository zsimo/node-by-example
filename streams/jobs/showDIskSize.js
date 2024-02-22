const { exec } = require('node:child_process');
const childProcess = exec("while :; do du -sh  ./ ; sleep 1; done;");
childProcess.stdout.on('data', (data) => {
    process.stdout.write(data);
});
