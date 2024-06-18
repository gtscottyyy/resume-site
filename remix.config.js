/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/*.css"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
  browserNodeBuiltinsPolyfill: {
    modules: {
      crypto: true,
      timers: true,
      fs: true,
      http: true,
      url: true,
      util: true,
      stream: true,
      events: true,
      dns: true,
      os: true,
      process: true,
      zlib: true,
      child_process: true,
      "fs/promises": true,
      net: true,
      tls: true,
      "timers/promises": true,
    },
  },
};
