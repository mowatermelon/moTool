/*
 * @Author: Wu Eva
 * @Date: 2019-01-22 12:15:55
 * @Last Modified by: Wu Eva
 * @Last Modified time: 2019-01-22 12:31:10
 */
/**
 * @class TempClass 所有构造类的案例类
 */
class TempClass{

  // #region
  /**  TempClass 基础属性设置 start--------------------------------------------------------------------------------------------------------- */
  constructor() {
  };
  /**  TempClass 基础属性设置 end--------------------------------------------------------------------------------------------------------- */
  // #endregion


  // #region
  /**  TempClass 静态方法 start--------------------------------------------------------------------------------------------------------- */
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
  /**  TempClass 静态方法 end--------------------------------------------------------------------------------------------------------- */
  // #endregion


  // #region
  /**  TempClass 字面量设置或者获取属性 start--------------------------------------------------------------------------------------------------------- */
  get name() {
    return this.test;
  }
  /**  TempClass 字面量设置或者获取属性 end--------------------------------------------------------------------------------------------------------- */
  // #endregion


  // #region
  /**  TempClass 原型方法 start--------------------------------------------------------------------------------------------------------- */
  test() {
  }
  /**  TempClass 原型方法 end--------------------------------------------------------------------------------------------------------- */
  // #endregion

}
