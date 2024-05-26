const express = require("express");
const router = express.Router();
const path = require("path");
const { exec } = require("child_process");
const fs = require("fs").promises;
const runScriptSchemas = require('../utils/runScriptsUtils.js')

function executeBashCommand(command, scriptDirectory) {
    console.log(`Executing Command: ${command}`);
    return new Promise((resolve, reject) => {
        const options = scriptDirectory ? { cwd: scriptDirectory } : {};
        const proc = exec(command, options, (error, stdout, stderr) => {
            if (error) {
                console.error(`Exec Error: ${error}`);
                reject(error);
                return;
            }
        });

        proc.stdout.on("data", (data) => {
            console.log(`stdout: ${data}`);
        });

        proc.stderr.on("data", (data) => {
            console.error(`stderr: ${data}`);
        });

        proc.on("close", (code) => {
            console.log(`Command execution finished with code ${code}`);
            resolve();
        });
    });
}

function buildScriptPath(directory, filename) {
    return `"${path.join(__dirname, "..", "..", "..", filename)}"`;
}

async function cleanExplorerDirectory() {
    const explorerDir = __dirname;

    try {
        const files = await fs.readdir(explorerDir);

        for (const file of files) {
            const filePath = path.join(explorerDir, file);
            const stats = await fs.stat(filePath);

            if (stats.isDirectory() && file !== "node_modules") {
                await fs.rmdir(filePath, { recursive: true });
                console.log(`Removed directory: ${filePath}`);
            }
        }
    } catch (error) {
        console.error(
            `Error while cleaning the explorer directory: ${error.message}`
        );
    }
}

router.post("/api/run-network-script", async (req, res) => {
    const { error, value } = runScriptSchemas.runNetworkScriptSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { filename, mode, answers } = value;

    const scriptPath = buildScriptPath("", filename);

    // Check if answers are provided. If yes, prepare the input commands.
    let fullCommand = "";
    if (answers.length > 0) {
        const inputCommands = `echo "${answers.join("\\n")}"`;
        fullCommand = `${inputCommands} | bash "${scriptPath}" ${mode}`;
    } else {
        fullCommand = `bash "${scriptPath}" ${mode}`;
    }

    try {
        const result = await executeBashCommand(fullCommand);

        // After executing the bash command, clean the explorer directory
        await cleanExplorerDirectory();

        res.json({ success: true, result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/api/run-script", async (req, res) => {
    const { error, value } = runScriptSchemas.runScriptSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { filename, answers } = value;

    const scriptPath = buildScriptPath("scripts", filename);

    // Construct the echo command with pipes for the answers
    const inputCommands = answers.map((answer) => `echo "${answer}"`).join(" | ");
    const directoryCommand = `cd ../`;
    const fullCommand = inputCommands
        ? `${inputCommands} | ${directoryCommand} bash ${scriptPath}`
        : `${directoryCommand} bash ${scriptPath}`;

    try {
        const result = await executeBashCommand(fullCommand);
        res.json({ success: true, result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/api/run-chaincode-main", async (req, res) => {
    const { error, value } = runScriptSchemas.runChaincodeMainSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { channelName } = value;

    const scriptPath = buildScriptPath("", "chaincodeMain.sh");
    const mode = "deploy";

    // Correctly construct the echo command to provide the channel name as input
    const fullCommand = `echo "${channelName}" | bash "${scriptPath}" ${mode}`;

    try {
        const result = await executeBashCommand(fullCommand);
        res.json({ success: true, result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/api/update-chaincode-params", async (req, res) => {
    const updates = req.body.updates;

    // const { error, value } = runScriptSchemas.updateChaincodeParamsSchema.validate(req.body);
    // if (error) {
    //     return res.status(400).json({ error: error.details[0].message });
    // }

    // const { updates } = value;

    const scriptPath = buildScriptPath("", "customChaincodeParams.sh");

    try {
        // Read the script
        let scriptContent = await fs.readFile(scriptPath, "utf8");

        // Update the variables based on the request
        for (const key in updates) {
            const value = updates[key];
            const regex = new RegExp(`(export ${key}=)(['"].*?['"])`, "g");
            scriptContent = scriptContent.replace(regex, `$1'${value}'`);
        }

        // Write the updated content back to the script file
        await fs.writeFile(scriptPath, scriptContent);

        res.json({ success: true, message: "Script updated successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;