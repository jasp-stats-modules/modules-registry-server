const express = require("express");
const axios = require("axios");
const router = express.Router();
const logger = require("../config/logger").logger;
const https = require("https");
const moduleUrl =
  "https://raw.githubusercontent.com/jasp-stats-modules/modules-registry/refs/heads/main/.gitmodules";

function getModuleUrls(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";

      if (res.statusCode !== 200) {
        console.error(`HTTP Error: ${res.statusCode}`);
        reject(`HTTP Error: ${res.statusCode}`);
      }

      res.on("data", (chunk) => {
        data += chunk;
        // console.log(data);
      });

      res.on("end", () => {
        // console.log(data);
        const parseGitModules = (data) => {
          const modules = [];
          const lines = data.split("\n");

          let module = {};
          lines.forEach((line) => {
            line = line.trim();
            if (line.startsWith("[submodule")) {
              if (Object.keys(module).length > 0) modules.push(module);
              module = {};
              module.name = line.match(/"(.+)"/)?.[1] || "";
            } else if (line.startsWith("path")) {
              module.path = line.split(" = ")[1]?.trim();
            } else if (line.startsWith("url")) {
              module.url = line.split(" = ")[1]?.trim();
            }
          });

          if (Object.keys(module).length > 0) modules.push(module);
          return modules;
        };

        const result = parseGitModules(data);
        // console.log(JSON.stringify(result, null, 2));
        resolve(result);
      });
    });
  });
}

// Route to display user's repositories
router.get("/list", async (req, res) => {
  try {
    const submodules = await getModuleUrls(moduleUrl);
    res.status(200).json(submodules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

module.exports = router;
