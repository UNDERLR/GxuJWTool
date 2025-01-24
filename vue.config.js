const {defineConfig} = require('@vue/cli-service');
module.exports = defineConfig({
    transpileDependencies: true,
    chainWebpack: (config) => {
        config.plugin('html').tap((args) => {
            args[0].title = "广西大学教务系统工具";
            return args;
        });
    },
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                // 在这里的配置将会和默认配置合并，然后传递给electron-builder
                appId: 'com.gxu.jwxttool', // 项目唯一标识
                productName: '广西大学教务系统工具', // 打包产物的前缀
                copyright: 'Copyright © 2025 ${author}', // 可用使用${}引用package.json里面配置项，配置项不存在会报错
                directories: {
                    output: 'dist_electron' // 打包产物的位置
                },
                // ------- windows 相关配置
                win: {
                    icon: 'dist_electron/icons/icon.ico', // 应用图标
                    target: ['nsis'] // 打包的目标类型,支持很多类型，具体看文档
                },
                nsis: {
                    "oneClick": false,
                    "perMachine": true,
                    "allowToChangeInstallationDirectory": true // 允许修改安装目录
                }
            },
            nodeIntegration: true
        }
    }
});
