const fs = require("fs");
const path = require("path");

const guessTypeFromParameterName = (name) => {
  if (name.includes("Id") || name.includes("Ref")) {
    return "string";
  } else if (name.includes("Date")) {
    return "string";
  } else if (name.includes("Required")) {
    return "bool";
  } else if (name.includes("Effect") || name === "delayEffect") {
    return "int";
  } else {
    return "string"; // Default type
  }
};

const getChaincodeFunctions = (filePath) => {
  const data = fs.readFileSync(filePath, "utf-8");

  const matches = data.match(/async\s+[a-zA-Z_][a-zA-Z0-9_]*\s*\([^)]*\)/g);
  if (!matches) {
    return [];
  }

  return matches.map((match) => {
    const functionName = match.split(" ")[1].split("(")[0];
    const params = match
      .split("(")[1]
      .split(")")[0]
      .split(",")
      .map((p) => {
        const paramName = p.trim();
        // Skip parameters like 'ctx' or any other undesired parameters
        if (paramName !== "ctx") {
          const paramType = guessTypeFromParameterName(paramName);
          return {
            type: paramType,
            name: paramName,
          };
        }
      })
      .filter((param) => param !== undefined); // Filter out undefined entries resulting from skipping

    return {
      name: functionName,
      inputs: params,
      apiDefinition: "POST",
    };
  });
};

const generateJSONForChaincodes = (dirPath) => {
  const files = fs.readdirSync(dirPath);
  let functions = [];
  let getFunctions = [];
  let fileFunctions;

  for (let file of files) {
    if (path.extname(file) === ".js") {
      const filePath = path.join(dirPath, file);
      fileFunctions = getChaincodeFunctions(filePath);

      for (let func of fileFunctions) {
        if (func.name.startsWith("get") || func.name.startsWith("query")) {
          getFunctions.push(func);
        } else {
          functions.push(func);
        }
      }
    }
  }

  return {
    functions,
    getFunctions,
    fileFunctions,
  };
};
// const filePath = path.join(__dirname, "../../chaincode/sct/lib/sct.js");

// Check if the file exists
// if (fs.existsSync(filePath)) {
//   console.log("File exists at the specified path.");
// } else {
//   console.log("File does NOT exist at the specified path.");
//   process.exit(); // Exit the script if file doesn't exist
// }

// const output = generateJSONForChaincodes(dirPath);
// fs.writeFileSync("./functions.json", JSON.stringify(output, null, 2), "utf-8");
// console.log("Output written to functions.json");

module.exports = { generateJSONForChaincodes };
