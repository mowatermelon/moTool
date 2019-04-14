/*
 * @Author: Wu Eva
 * @Date: 2019-01-22 10:16:24
 * @Last Modified by: Wu Eva
 * @Last Modified time: 2019-04-03 19:53:33
 */

/**
 * @class LogClass 消息记录和广播类
 */
class LogClass{
    // #region
    /**  LogClass 基础属性设置 start--------------------------------------------------------------------------------------------------------- */
    constructor() {
        super();
        this.logList = {};
        this.ajaxList = {};
        this.promiseList = {};
        this.errList = {};
        this.warnList = {};
        this.logKey = '';
    };
    /**  LogClass 基础属性设置 end--------------------------------------------------------------------------------------------------------- */
    // #endregion

    // #region
    /**  LogClass 静态方法 start--------------------------------------------------------------------------------------------------------- */
    static init(argumentsMap) {
        let res = new LogClass(argumentsMap);
        if (argumentsMap) {
            res = LogClass.ex(res, argumentsMap);
        }
        return res;
    }
    /**  LogClass 静态方法 end--------------------------------------------------------------------------------------------------------- */
    // #endregion

    // #region
    /**  LogClass 字面量设置或者获取属性 start--------------------------------------------------------------------------------------------------------- */
    /**  LogClass 字面量设置或者获取属性 end--------------------------------------------------------------------------------------------------------- */
    // #endregion

    // #region
    /**  LogClass 原型方法 start--------------------------------------------------------------------------------------------------------- */
    formatMsg(msg) {
        return `${this.formatDate(new Date(), 0)}  ${msg}`;
    }
    checkConsoleRight() {
        return !!window.console;
    }
    log(...msg) {
        const _this = this;
        const currKey = _this.logKey;
        const currList = LogClass.checkObjRight(_this.parentForm) ? _this.parentForm.logList : _this.logList;
        if (currKey) {
            msg = _this.formatMsg(msg);
            !currList[currKey] && (currList[currKey] = [])
            currList[currKey] = currList[currKey].concat(msg);
        } else {
            _this.checkConsoleRight() && console.log(...msg);
        }
    }
    err(...msg) {
        const _this = this;
        const hasParent = LogClass.checkObjRight(_this.parentForm);
        const currKey = _this.logKey;
        const currList = hasParent ? _this.parentForm.errList : _this.errList;
        const currLogList = hasParent ? _this.parentForm.logList : _this.logList;
        if (currKey) {
            msg = _this.formatMsg(msg);
            !currList[currKey] && (currList[currKey] = [])
            currList[currKey] = currList[currKey].concat(msg);
            // hasParent && _this.parentForm.hang();

            !currLogList[currKey] && (currLogList[currKey] = [])
            currLogList[currKey] = currLogList[currKey].concat(` ├─── ${msg}`);

            if (_this._endLog) {
                _this._endLog();
            } else {
                _this.table(currList[currKey]);
                _this.table(currLogList[currKey]);
                _this.groupEnd();
                _this.timeEnd(currKey);
            }

            _this._trace();
            _this.throwErr(msg);
        } else {
            _this.checkConsoleRight() && console.error(...msg);
        }
    }
    warn(...msg) {
        const _this = this;
        const hasParent = LogClass.checkObjRight(_this.parentForm);
        const currKey = _this.logKey;
        const currList = hasParent ? _this.parentForm.warnList : _this.warnList;
        const currLogList = hasParent ? _this.parentForm.logList : _this.logList;

        if (currKey) {
            msg = _this.formatMsg(msg);
            !currList[currKey] && (currList[currKey] = [])
            currList[currKey] = currList[currKey].concat(msg);

            !currLogList[currKey] && (currLogList[currKey] = [])
            currLogList[currKey] = currLogList[currKey].concat(` ├─── ${msg}`);
        }
        _this.checkConsoleRight() && console.warn(...msg);
    }
    info(...msg) {
        this.checkConsoleRight() && console.info(...msg);
    }
    table(msg) {
        const _this = this;
        if (_this.checkConsoleRight() && console.table) {
            console.table(msg); // 打印当前执行后台执行结果
        } else {
            if (msg && msg.forEach) {
                msg.forEach(function (item, index) {
                    _this.log(item);
                });
            }
        }
    }
    time(msg) {
        this.checkConsoleRight() && console.time(msg);
    }
    timeEnd(msg) {
        this.checkConsoleRight() && console.timeEnd(msg);
    }
    group(msg) {
        this.checkConsoleRight() && console.group(...msg);
    }
    groupEnd() {
        this.checkConsoleRight() && console.groupEnd();
    }
    _trace(...msg) {
        this.checkConsoleRight() && console.trace(...msg);
    }
    throwErr(...msg) {
        throw new Error(msg);
    }
    /**
     * 在表单请求中处理相关错误提示
     * @param {String} errMsg 后台实质的错误信息
     * @param {String} tipMsg 给前端的提示
     * @param {String} formId 当前表单标识
     */
    errMsgTip(errMsg, tipMsg, formId = '') {
        const _this = this;
        if (errMsg) {
            _this.err(`表单[${formId}][出现异常]\n[错误描述]：\n\t${errMsg}`);
        }
    }
    logStatus({ statusName, statusType = 0, codeType = '', extraMsg = '' }) {
        const typeMsgArr = ['开始', '结束', '失败', '挟持'];
        const typeMsg = typeMsgArr[statusType];
        const currClass = this.baseType || '基础';
        const defaultIndent = statusName === 'EVENT' ? '' : '├───';
        this.log(` ${defaultIndent} [${currClass}] [${statusName}] [${typeMsg}] ${codeType} ${extraMsg}`);
    }
    logEventStatus({ statusType, codeType, extraMsg }) {
        const currTipObj = {
            statusName: 'EVENT',
            statusType,
            codeType: `触发 [${codeType}]`,
            extraMsg
        }
        this.logStatus(currTipObj);
    }
    logEventBegin(codeType, extraMsg) {
        const currTipObj = {
            statusType: 0,
            codeType,
            extraMsg
        }
        this.logEventStatus(currTipObj);
    }
    logEventEnd(codeType, extraMsg) {
        const currTipObj = {
            statusType: 1,
            codeType,
            extraMsg
        }
        this.logEventStatus(currTipObj);
    }
    logEventErr(codeType, extraMsg) {
        const currTipObj = {
            statusType: 2,
            codeType,
            extraMsg
        }
        this.logEventStatus(currTipObj);
    }
    logCodeStatus({ statusType, codeType, extraMsg }) {
        const currTipObj = {
            statusName: 'CODE',
            statusType,
            codeType: `检查 [${codeType}] 状态`,
            extraMsg
        }
        this.logStatus(currTipObj);
    }
    logCodeBegin(codeType, extraMsg) {
        const currTipObj = {
            statusType: 0,
            codeType,
            extraMsg
        }
        this.logCodeStatus(currTipObj);
    }
    logCodeEnd(codeType, extraMsg) {
        const currTipObj = {
            statusType: 1,
            codeType,
            extraMsg
        }
        this.logCodeStatus(currTipObj);
    }
    logCodeErr(codeType, extraMsg) {
        const currTipObj = {
            statusType: 2,
            codeType,
            extraMsg
        }
        this.logCodeStatus(currTipObj);
    }
    /**
     * 时间格式化方法
     * @param {Date} iDate，需要进行转换的日期
     * @param {Number} type 格式，一共有两种情况，。
     *                      一种是0，将原始的日期转成yyyy-MM-dd hh:mm:ss格式，默认的格式。
     *                      一种是1，是将原始的日期转换成yyyyMMddhhmmss格式
     *                      一种是2，将原始的时间戳转换成yyyy-MM-dd
     */
    formatDate(iDate, type) {
        if (type === 2) {
            iDate = new Date(iDate);
        }
        iDate = iDate.toLocaleString('zh-CN', {
            hour12: false
        }); // 将默认的日期按照当地的日期格式进行转移，这边转化的效果是yyyy/M/d h:m:s
        iDate = iDate.replace(/\b\d\b/g, '0$&'); // 将yyyy/M/d h:m:s中的月份，日期，时间只有一位的，用0进行补位，比如将2018/5/14 转换成2018/05/14
        switch (type) {
            case 0:
            {
                iDate = iDate.replace(new RegExp('/', 'gm'), '-'); // 将日期转换成yyyy-MM-dd hh:mm:ss
                break;
            }
            case 1:
            {
                iDate = iDate.replace(/\/|\:|\s/g, ''); // 将日期转换成yyyyMMddhhmmss
                break;
            }
            case 2:
            {
                iDate = iDate.replace(new RegExp('/', 'gm'), '-').substr(0, 10); // 将日期转换成yyyy-MM-dd hh:mm:ss
                break;
            }
        }
        return iDate;
    }
    /**
     * 生成唯一ID
     * @param {String} name 需要加载随机生成的字符串前面，非必传
     */
    buildGuid(name) {
        if (name === undefined) {
            name = '';
        }
        const S4 = () => {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        const now = new Date();
        const nowStr = this.formatDate(now, 1);
        const newCreateStr = name + nowStr + S4() + S4();
        return newCreateStr.toUpperCase();
    }
    /**
     * 获取当前表单动态加载约束主键
     */
    getLoadKey(loadName = 'formLoadKey') {
        const _this = this;
        const tempKey = String(_this.buildGuid(loadName)) + Math.random();
        return tempKey.replace('.', '');
    }
    /**
     * 表单的默认异常捕获输出方法。
     * @param {String} functionName 当前错误的方法名
     * @param {String} errMsg 当前属性错误输出的详细描述
     */
    defaultThrowErr(functionName, errMsg = '') {
        const _this = this;
        try {
            _this.err(`[${_this.baseType}] [ERROR] [错误代码块]：\n${_this.defaultThrowErr.caller.caller.name},\n[错误描述]：\n\t[${functionName}]方法执行错误，${errMsg}`);
        } catch (err) {
            _this.err(`[${_this.baseType}] [ERROR] [错误描述]：\n\t[${functionName}]方法执行错误，${errMsg}`);
        }
    }

    /**
     * 表单的默认异常捕获错误参数的方法
     * @param {String} functionName 当前错误的方法名
     * @param {String} errParam 当前错误的参数名，多个参数通过逗号拼接
     */
    defaultThrowParamErr(functionName = 'defaultThrowParamErr', errParam = '') {
        const _this = this;
        _this.defaultThrowErr(functionName, `参数[${errParam}]传递错误，请注意传递的参数类型和参数值是否正确。`)
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
    /**
     * 自动捕获promise对象的实例化
     * @param {Function} emitEvent 用于触发的promise对象的回调函数
     */
    ctPromise(emitEvent) {
        const _this = this;
        const currKey = _this.logKey;
        const currList = LogClass.checkObjRight(_this.parentForm) ? _this.parentForm.promiseList : _this.promiseList;
        const currTipObj = {
            statusName: 'PROMISE',
            statusType: 3
        }
        const defaultDealWith = (resolve, reject) => {
            _this.logStatus(currTipObj);
            !currList[currKey] && (currList[currKey] = [])
            currList[currKey] = currList[currKey].concat(resolve);
            if (typeof emitEvent === 'function') {
                emitEvent(resolve, reject);
            } else {
                resolve(resolve, reject);
            }
        };
        const res = new Promise(defaultDealWith);
        res.catch((error) => {
            _this.err(error.stack);
        })
        return res;
    }
    /**
     * 自动捕获ajax对象的请求
     * @param {Promise} promiseObj 当前请求的promise对象
     * @param {String} ajaxUrl 当前请求地址
     */
    autoCatchAjax(promiseObj, ajaxUrl = '') {
        const _this = this;
        const currKey = _this.logKey;
        const currList = LogClass.checkObjRight(_this.parentForm) ? _this.parentForm.ajaxList : _this.ajaxList;
        const currTipObj = {
            statusName: 'AJAX',
            statusType: 3,
            extraMsg: ajaxUrl ? `当前请求地址为 ${ajaxUrl}` : '当前未能成功发送请求'
        }
        const defaultDealWith = (resolve, reject) => {
            !currList[currKey] && (currList[currKey] = [])
            currList[currKey] = currList[currKey].concat(promiseObj);
            _this.logStatus(currTipObj);
            resolve(promiseObj);
        };
        const res = new Promise(defaultDealWith);
        res.catch((error) => {
            _this.err(error.stack || error);
        })
        return res;
    }
    /**  LogClass 原型方法 end--------------------------------------------------------------------------------------------------------- */
    // #endregion
}

export default LogClass;
