const router = require("express").Router();
const config = require("./api");

config.forEach((val, index) => {
  let [path, func, method] = [
    config[index].path,
    config[index].config,
    config[index].method,
  ];

  switch (method) {
    case "get":
      router.get(path, func);

    case "post":
      router.post(path, func);

    case "patch":
      router.post(path, func);

    case "delete":
      router.post(path, func);
  }
});

// for (let keys in config) {
//   let [path, func, method] = [
//     config[keys].path,
//     config[keys].config,
//     config[keys].method,
//   ];

//   switch (method) {
//     case "get":
//       router.get(path, func);

//     case "post":
//       router.post(path, func);

//     case "patch":
//       router.post(path, func);

//     case "delete":
//       router.post(path, func);
//   }
// }

module.exports = router;
