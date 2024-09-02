/*
 * @Author: chaixiaobu 13817847080@163.com
 * @Date: 2024-08-29 18:52:29
 * @LastEditors: chaixiaobu 13817847080@163.com
 * @LastEditTime: 2024-08-29 18:52:44
 * @FilePath: \uniapp-weixin-template\qr.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { Decoder } = require('@nuintun/qrcode')
const Jimp = require('jimp')
var terminal = require('qrcode-terminal')
const qrcode = new Decoder()
module.exports = async function (imagePath) {
  var imgSrc = await Jimp.read(imagePath)
  var result = qrcode.decode(
    new Int32Array(imgSrc.bitmap.data),
    imgSrc.getWidth(),
    imgSrc.getHeight()
  )

  terminal.generate(result.data, { small: true }, function (qrcode) {
    console.log(qrcode)
  })
}
