/**
 * @description: 工具类
 */

/**
 * @description: 格式化日期
 * @method dateFormat
 * @param {Date} date 需要格式化的日期类型
 * @param {String} format 自定义的格式
 * @returns {String} 格式化之后的日期字符串
 */
const dateFormat = (date: Date, format: string) => {

  const dateObj = new Date(date);
  const map = {
    M: dateObj.getMonth() + 1, // 月份
    d: dateObj.getDate(), // 日
    h: dateObj.getHours(), // 小时
    m: dateObj.getMinutes(), // 分
    s: dateObj.getSeconds(), // 秒
    S: dateObj.getMilliseconds() // 毫秒
  };

  format = format.replace(/([yMdhmsS])+/g, (all, item) => {
    let val = map[item];

    if (val !== undefined) {
      if (all.length > 1) {
        val = '0' + val;
        val = val.substr(val.length - 2);
      }
      return val;
    } else if (item === 'y') {
      return (dateObj.getFullYear() + '').substr(4 - all.length);
    }
    return all;
  });
  return format;
};

/**
 * @description: 获取localStorage
 * @method getLocalStorage
 * @param {String} name - localStorage的名称
 */
const getLocalStorage = (name: string) => {
  return localStorage.getItem(name) || '';
};

/**
 * @description: 存入localStorage
 * @method setLocalStorage
 * @param {String} name - localStorage的名称
 * @param {String} value - 存储的名称对应的值
 */
const setLocalStorage = (name: string, value: string) => {
  return localStorage.setItem(name, value);
};

/**
 * @description: 删除localStorage
 * @method removeLocalStorage
 * @param {String} name - localStorage的名称
 */
const removeLocalStorage = (name: string) => {
  localStorage.removeItem(name);
};

/**
 * @description: base64转blob
 * @method base64ToBlob
 * @param {String} code - base64字符串
 * @param {String} type - 文件类型
 */
const base64ToBlob = (code: string, type = 'image/jpeg') => {
  const parts = code.split(';base64,');
  const contentType = parts[0].split(':')[1] || type;
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;

  const uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], {type: contentType});
};

/**
 * @description: Bole对象转文件
 * @param {Blob} blob - blob对象
 * @param {String} fileName - 文件名
 * @return {File} blob - 返回文件
 */
const blobToFile = (blob: any, fileName: string) => {
  blob.lastModified = new Date();
  blob.name = fileName;
  return blob;
};

/**
 * @description: 生成二维码
 * @method createQrCode
 * @param {String} url - url地址
 * @param {Number} w - 二维码的宽度，单位 px
 * @param {Number} h - 二维码的高度，单位 px
 * @param {HTMLElement} containerDom - 包裹生成的二维码的父级元素
 */
const createQrCode = (url: string, w = 100, h = 100, containerDom: HTMLElement): void => {
  const screenWidth = screen.width;
  const QRCode = require('qrcodejs2');
  const qrCode = new QRCode(containerDom, {
    width: w * screenWidth / 750, // 图像宽度
    height: h * screenWidth / 750, // 图像高度
    correctLevel: QRCode.CorrectLevel.H // 容错级别
  });
  qrCode.clear(); // 清除二维码
  qrCode.makeCode(url); // 生成新的二维码
};

/**
 * @description: 当前服务域名
 */
const DOMAIN = `${window.location.protocol}//${window.location.host}`;

/**
 * @description: 读取location.search中的参数值
 * @param {String} name 名称
 * @return {String} url中的参数的值
 */
const getUrlParam = (name: string) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  const search = window.location.search.substr(1);
  const result = search.match(reg);

  if (result != null) {
    return decodeURIComponent(result[2]);
  } else {
    return '';
  }
};

const userAgent = navigator.userAgent;
/**
 * @description: 判断是否是Android
 * @return {Boolean}
 */
const isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1;

/**
 * @description: 判断是否是iOS
 * @return {Boolean}
 */
const isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

/**
 * @description: 压缩图片
 * @method compressImage
 * @param {*} self - 调用该方法的Vue实列 ， Vue中data中的compressCount=0；压缩的次数计数，最多压缩10次
 * @param {HTMLImageElement} img - img Dom对象
 * @param {number | string | undefined} orientation - 图片的旋转信息
 * @param {File} file - 文件对象
 * @param {Number} quality - 图片压缩的质量系数
 * @param {Number} sizeCoefficient - 文件大小系数
 * @param {Number} widthCoefficient - 文件尺寸系数
 * @param {Number} maxSize - 压缩后最后输出的文件的最大size,单位 M
 * @param {Number} targetSize - 初始需要压缩的图片的size,单位 KB
 * @return {File} blob - 返回文件
 */

const compressImage = (self: any, img: HTMLImageElement, orientation: number | string | undefined, file: File, quality: number,
                       sizeCoefficient = 1, widthCoefficient = 1, maxSize = 1.8,
                       targetSize = 360): any => {

  self.compressCount++;

  const canvas = document.createElement('canvas');
  const ctx: any = canvas.getContext('2d');
  let width = img.width;
  let height = img.height;
  let limitSize = targetSize * sizeCoefficient;

  if (limitSize > maxSize * 1024) {
    limitSize = maxSize * 1024;
  }

  // 大于limitSize Kb压缩,处理图片旋转
  if (file.size / 1024 > limitSize) {
    if (img.width > 1024) {
      width = 1024;
      height = (img.height * 1024) / img.width;
      quality = quality * 0.9;
    } else {
      quality = quality * 0.8;
    }
  }

  width = width / widthCoefficient;
  height = height / widthCoefficient;

  const oldWidth = width;

  if (width < 320) {
    width = 320;
    height = height * 320 / oldWidth;
  }

  canvas.width = width;
  canvas.height = height;
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (orientation !== '' && orientation !== undefined && orientation !== 1 && isAndroid) {
    switch (orientation) {
      case 6: // 左旋90度
        canvas.width = height;
        canvas.height = width;
        ctx.rotate(90 * Math.PI / 180);
        ctx.drawImage(img, 0, -height, width, height);
        break;
      case 8: // 右旋90度
        canvas.width = height;
        canvas.height = width;
        ctx.rotate(270 * Math.PI / 180);
        ctx.drawImage(img, -width, 0, width, height);
        break;
      case 3: // 左旋180度
        ctx.rotate(180 * Math.PI / 180);
        ctx.drawImage(img, -width, -height, width, height);
        break;
      default:
        ctx.drawImage(img, 0, 0, width, height);
        break;
    }
  } else {
    ctx.drawImage(img, 0, 0, width, height);
  }

  const fileName = file.name.replace(/.(jpg|png|jpeg)$/i, '') + '.jpeg';
  const imageData = canvas.toDataURL('image/jpeg', quality);
  const newFile: File = blobToFile(
    base64ToBlob(imageData),
    fileName
  );

  if (newFile.size / 1024 > limitSize) {
    if (self.compressCount < 10) {
      return compressImage(self, img, orientation, file, quality);
    } else {
      if (limitSize < maxSize * 1024) {
        return compressImage(self, img, orientation, file, quality, sizeCoefficient * 1.5);
      } else {
        if (width > 320) {
          return compressImage(self, img, orientation, file, quality, sizeCoefficient * 1.5, widthCoefficient * 1.5);
        } else {
          return '';
        }
      }
    }
  } else {
    return newFile;
  }
};


export {
  dateFormat,
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
  base64ToBlob,
  createQrCode,
  DOMAIN,
  getUrlParam,
  blobToFile,
  isAndroid,
  isiOS,
  compressImage
};
