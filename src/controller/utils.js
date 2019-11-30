/**
 * @description utils controller
 * @author SOALIN
 * @date 2019/11/30 22:31
 */
const path = require('path')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const fse = require('fs-extra')

// 存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')
// 文件最大体积 1M
const MIX_SIZE = 1024 * 1024 * 1024
// 是否创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
  if (!exist) {
    fse.ensureDir(DIST_FOLDER_PATH)
  }
})

/**
 * 保存文件
 * @param name
 * @param type
 * @param size
 * @param filePath
 * @return {Promise<void>}
 */
async function saveFile ({ name, type, size, filePath }) {
  if (size > MIX_SIZE) {
    await fse.remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }

  // 移动文件
  const fileName = Date.now() + '.' + name // 防止重名
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
  await fse.move(filePath, distFilePath)

  // 返回信息
  return new SuccessModel({
    url: '/' + fileName
  })
}

module.exports = {
  saveFile
}
