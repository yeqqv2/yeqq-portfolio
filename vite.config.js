import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

/**
 * Her zaman yüklenen çekirdek kütüphaneleri (react, gsap) uzun ömürlü, ayrı
 * önbelleklenen vendor chunk'larına böler. Rota-özel paketleri kasıtlı olarak
 * burada tutmaz; onları Vite'ın otomatik kod bölmesi ilgili rota chunk'ına
 * yerleştirir, böylece her sayfada gereksiz yere yüklenmezler.
 */
function manualChunks(id) {
  if (!id.includes("node_modules")) return;
  if (/[\\/]node_modules[\\/](gsap|@gsap)[\\/]/.test(id)) return "vendor-gsap";
  if (
    /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(
      id
    )
  ) {
    return "vendor-react";
  }
}

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isProduction = command === "build";

  return {
    plugins: [react()],

    resolve: {
      alias: {
        // ESM uyumlu mutlak yol — __dirname'e gerek yok
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },

    css: {
      // Geliştirmede CSS kaynak haritası — daha rahat hata ayıklama
      devSourcemap: true,
    },

    esbuild: {
      // console/debugger yalnızca production'da temizlensin; dev'de kalsın
      drop: isProduction ? ["console", "debugger"] : [],
      legalComments: "none",
    },

    build: {
      target: "esnext",
      minify: "esbuild",
      cssMinify: true,
      cssCodeSplit: true,
      sourcemap: false,
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks,
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: ({ name }) => {
            if (/\.(gif|jpe?g|png|svg|webp|avif)$/.test(name ?? "")) {
              return "assets/images/[name]-[hash][extname]";
            }
            if (/\.css$/.test(name ?? "")) {
              return "assets/css/[name]-[hash][extname]";
            }
            if (/\.(woff2?|eot|ttf|otf)$/.test(name ?? "")) {
              return "assets/fonts/[name]-[hash][extname]";
            }
            return "assets/misc/[name]-[hash][extname]";
          },
        },
      },
    },

    server: {
      host: true,
      port: 5173,
    },

    preview: {
      host: true,
      port: 4173,
    },
  };
});
