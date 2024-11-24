import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      // handle root entry file of user input
      build.onResolve({ filter: /(^input\.ts$)/ }, () => {
        return { path: "input.ts", namespace: "app" };
      });

      // handle relative imports inside a module
      build.onResolve({ filter: /^\.+\// }, (args: esbuild.OnResolveArgs) => {
        const path = new URL(args.path, "https://unpkg.com" + args.resolveDir + "/")
        .href;
        console.log('handle relative imports inside a module', path);
        return {
          path,
          namespace: "app",
        };
      });

      // handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args: esbuild.OnResolveArgs) => {
        const isUrl = args.path.startsWith('https://') || args.path.startsWith('http://');
        const path = isUrl ? args.path : `https://unpkg.com/${args.path}`;

        console.log('handle main file of a module', path, isUrl);
        return {
          path,
          namespace: "app",
        };
      });
    },
  };
};