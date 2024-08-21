const { exec } = require('child_process');

exports.callPythonPredictionScript = (inputData, labels, callback) => {
    const inputDataStr = inputData.join(' ');
    const labelsStr = labels.join(' ');

    // Menentukan Python interpreter dari virtual environment
    const pythonPath = '/Users/apple/Documents/projects/lepkom_project/backend/venv/bin/python3.12';  // atau 'venv\\Scripts\\python.exe' di Windows

    exec(`${pythonPath} /Users/apple/Documents/projects/lepkom_project/machine/predict.py ${inputDataStr} ${labelsStr}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return callback(error);
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return callback(stderr);
        }
        console.log(`Stdout: ${stdout}`);
        callback(null, stdout);
    });
};
