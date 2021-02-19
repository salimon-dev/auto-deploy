const util = require("util");
const config = require("./config");
const exec = util.promisify(require("child_process").exec);
const express = require("express");
const app = express();

const { port, projects } = config;

const run = async () => {
  try {
    const { stdout, stderr } = await exec("ls | grep js");
    console.log("stdout:", stdout);
    console.log("stderr:", stderr);
  } catch (err) {
    console.error(err);
  }
};
const updateEndpoint = (req, res) => {
  const project = projects.find(p => p.id === req.params.projectId);
  res.send(project);
};

app.get("/update/:projectId", updateEndpoint);
app.post("/update/:projectId", updateEndpoint);
app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
