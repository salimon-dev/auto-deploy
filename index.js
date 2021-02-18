const util = require("util");
const exec = util.promisify(require("child_process").exec);
const run = async () => {
  try {
    const { stdout, stderr } = await exec("ls | grep js");
    console.log("stdout:", stdout);
    console.log("stderr:", stderr);
  } catch (err) {
    console.error(err);
  }
};

const port = 5055;
app.get("/update", (req, res) => {
  res.send("ok!");
});

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
run();
