import { defineConfig } from "vite";
import { resolve } from "node:path";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig(({ mode }) => {
  const isSingle = mode === "single";

  return {
    root: "src",

    publicDir: resolve(__dirname, "public"),

    plugins: [
      // EJSで変数を渡したい時ここに入れる
      ViteEjsPlugin({
        siteTitle: "Static Dev Env",
      }),

      // HTML単体ビルド（CSS/JSをインライン化）
      ...(isSingle ? [viteSingleFile()] : []),
    ],

    css: {
      preprocessorOptions: {
        scss: {
        },
      },
    },

    build: {
      outDir: resolve(__dirname, "dist"),
      emptyOutDir: true,

      // 複数ページ対応：pages配下のEJSをHTMLとして出す
      rollupOptions: {
        input: {
          index: resolve(__dirname, "src/index.html"),
          // works: resolve(__dirname, "src/pages/works.ejs"),
        },
        output: {
          entryFileNames: "assets/[name].js",
          chunkFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash][extname]",
        },
      },
    },
  };
});
