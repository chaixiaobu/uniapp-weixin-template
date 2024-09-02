// 使用ci脚本上传，需在小程序后台：开发管理 =》 小程序代码上传，生成小程序代码密钥放到privateKey文件夹；配置上传机器的IP白名单；上传前先预览再上传 npm run preview => npm run upload
const fs = require('fs');
const ci = require('miniprogram-ci')
const path = require('path')
const projectPath = path.resolve(__dirname, '..')
// 获取所有小程序上传密钥文件
const privateList = fs.readdirSync(`${projectPath}/ci/privateKey`)
const uploadInfo = {
  version: '5.0.9',
  desc: '功能优化与修复bug'
}
privateList.forEach(item => {
  let appId = item.split('.')[1] // item: private.appId.key
  // 创建项目对象
  const project = new ci.Project({
    appid: appId,    // 小程序appid
    type: 'miniProgram',  // 类型，小程序或小游戏
    projectPath: path.join(__dirname, '../dist/dev/mp-weixin'), // 项目路径
    privateKeyPath: `${projectPath}/ci/privateKey/${item}`,  // 密钥路径
    ignores: ['node_modules/**/*']  // 忽略的文件
  })
  console.log('开始上传小程序代码...', project)
  // 调用上传方法
  ci.upload({
    project,
    ...uploadInfo,
    setting: {
      es6: true, // 对应小程序开发者工具的 "es6 转 es5"
      es7: true, // 对应小程序开发者工具的 "增强编译"
      minify: true  // 是否压缩代码
    },
  }).then(res => {
    console.log('执行成功', res)
  }).catch(error => {
    console.log('执行失败', error)
  })
})
