/*
 * @Author: Wu Eva 
 * @Date: 2019-01-22 10:16:24 
 * @Last Modified by: Wu Eva
 * @Last Modified time: 2019-01-22 12:49:17
 */
/**
 * @class LogClass 消息记录和广播类
 */
class LogClass {

  // #region
  /**  LogClass 基础属性设置 start--------------------------------------------------------------------------------------------------------- */
  constructor() {};
  /**  LogClass 基础属性设置 end--------------------------------------------------------------------------------------------------------- */
  // #endregion


  // #region
  /**  LogClass 静态方法 start--------------------------------------------------------------------------------------------------------- */
  static ex(res, argumentsMap) {
    return Object.assign(res, argumentsMap);
  }
  static init(argumentsMap) {
    let res = this.createConstruct(FormTool, argumentsMap);
    res = this.ex(res, argumentsMap);
    return res;
  }
  static createConstruct(target, argumentsMap = []) {
    return Reflect.construct(target, argumentsMap);
  }
  /**  LogClass 静态方法 end--------------------------------------------------------------------------------------------------------- */
  // #endregion


  // #region
  /**  LogClass 字面量设置或者获取属性 start--------------------------------------------------------------------------------------------------------- */
  get name() {
    return this.test;
  }
  /**  LogClass 字面量设置或者获取属性 end--------------------------------------------------------------------------------------------------------- */
  // #endregion


  // #region
  /**  LogClass 原型方法 start--------------------------------------------------------------------------------------------------------- */
  log(...msg) {
    console.log(...msg);
  }
  err(...msg) {
    console.error(...msg);
  }
  info(...msg) {
    console.info(...msg);
  }
  throwErr(...msg) {
    throw new Error(...msg);
  }
  /**
   * 表单的默认异常捕获输出方法。
   * @param {String} functionName 当前错误的方法名
   * @param {String} errMsg 当前属性错误输出的详细描述
   */
  defaultThrowErr(functionName, errMsg = '') {
    const _this = this;
    try {
      _this.err(`[${_this.name}][脚本执行错误][错误代码块]：\n${_this.defaultThrowErr.caller.caller.name},\n[错误描述]：\n\t[${functionName}]方法执行错误，${errMsg}`);
    } catch (err) {
      _this.err(`[${_this.name}][脚本执行错误][错误描述]：\n\t[${functionName}]方法执行错误，${errMsg}`);
    }
  }

  /**
   * 表单的默认异常捕获错误参数的方法
   * @param {String} functionName 当前错误的方法名
   * @param {String} errParam 当前错误的参数名，多个参数通过逗号拼接
   */
  defaultThrowParamErr(functionName = 'defaultThrowParamErr', errParam = '') {
    const _this = this;
    _this.defaultThrowErr(functionName, `参数[${errParam}]传递错误。`)
  }

  /**
   * 表单的默认异常捕获错误控件的方法
   * @param {String} functionName 当前错误的方法名
   * @param {String} currCtrlId 当前错误的参数名，多个参数通过逗号拼接
   */
  defaultThrowCtrlErr(functionName = 'defaultThrowCtrlErr', currCtrlId = '') {
    const _this = this;
    _this.defaultThrowErr(functionName, `表单不存在[${currCtrlId}]控件`)
  }

  createPromise(emitEvent) {
    const _this = this;
    const defaultDealWith = (resolve, reject) => {
      _this.log('数据自动挟持');
      const tempObj = {
        title: '第一次',
        big: '第二次',
        sim: '第三次'
      };
      if (typeof emitEvent === 'function') {
        emitEvent(tempObj, resolve, reject);
      } else {
        resolve(resolve, reject);
      }
      // _this.throwErr(2);
    };
    const res = FormTool.createConstruct(Promise, [defaultDealWith]);
    res.catch((error) => {
      _this.err(error);
    })
    return res;
  }
  autoCatchAjax(promiseObj) {
    const _this = this;
    const defaultDealWith = (resolve, reject) => {
      _this.log('数据自动挟持 ajax');
      resolve(promiseObj);
    };
    const res = FormTool.createConstruct(Promise, [defaultDealWith]);
    res.catch((error) => {
      _this.err(error);
    })
    return res;
  }
  /**  LogClass 原型方法 end--------------------------------------------------------------------------------------------------------- */
  // #endregion

}

export default LogClass;