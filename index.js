const util = require("util");
const config = require("./config");
const exec = util.promisify(require("child_process").exec);
const express = require("express");
const app = express();

const { port, projects } = config;

const run = async (command) => {
  try {
    const { stdout, stderr } = await exec(command);
    if (stdout) console.log("stdout:", stdout);
    if (stderr) console.log("stderr:", stderr);
  } catch (err) {
    console.error(err.stdout);
  }
};
const updateEndpoint = async (req, res) => {
  const project = projects.find((p) => p.id === req.params.projectId);
  run(`cd ${project.path}`);
  for (let index = 0; index < project.steps.length; index++) {
    const step = project.steps[index];
    console.log(`#${index}: ${step.title}`);
    await run(step.exec);
  }
  res.send(project);
};

app.get("/update/:projectId", updateEndpoint);
app.post("/update/:projectId", updateEndpoint);
app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
