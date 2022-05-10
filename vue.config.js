const path = require("path")

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: "/",
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"))
            .set("assets", resolve("src/assets"))
            .set("components", resolve("src/components"))
            .set("views", resolve("src/views"))
            .set("store", resolve("src/store"))
            .set("router", resolve("src/router"))
            .set("util", resolve("src/util"))
    },
    devServer: {
        port: 8080,
        host: "localhost",
        open: true,
    },
    pluginOptions: {
        "style-resources-loader": {
            preProcessor: "less",
            patterns: [
                path.resolve(__dirname, "./src/assets/css/index.less")
            ]
        }
    }
}