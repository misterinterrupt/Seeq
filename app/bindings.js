import electron from "electron";

module.exports = x =>
  __non_webpack_require__(
    `${electron.remote.app.getAppPath()}/app/build/${x}`
  );
