/*
 * @Author: melon.wuEva
 * @Date: 2018-02-25 13:48:40
 * @Last Modified time: 2018-03-07 14:32:46
 */

"use strict";

//wuEva 常用功能集中插件
let moTool = {
    /**
     * 保证工具类正常使用的方法
    */
    /**
     * 判断变量是否全部为数值的方法
     * @param {Any} variable  需要检测的变量值，必选
    */
    isNum: function(variable){
        // 当variable为[]（空数组）、“”（空字符串)和null会在isNaN过程中转换为数字类型的0,
        // 所以也会返回false,从而判断为数字,所以可以将用typeof将以上特殊情况剔除.
        let res = !isNaN(variable)&&typeof variable==number;
        return res;
    },
    /**
     * 判断变量是否为数组的方法
     * @param {Any} variable  需要检测的变量值，必选
    */
    isArr:function(variable){
        return Array.isArray(variable);
    },
    /**
     * 打印正常日志的方法
     * @param {Any} variable  需要打印的变量值，必选
    */
    log: function(variable){
        console.log(variable);
    },
    /**
     * 打印消息日志的方法
     * @param {Any} variable  需要打印的变量值，必选
    */
    info: function(variable){
        console.info(variable);
    },
    /**
     * 打印错误日志的方法
     * @param {Any} variable  需要打印的变量值，必选
    */
    err: function(variable){
        console.error(variable);
    },
    /**
     * 数组去重的方法,通过Array.from()和Set对象来执行
     * @param {Array} arr  需要去重的数组值，必选
    */
    distinctArrFrom:function(arr){
        return Array.from(new Set(arr));
    },
    /**
     * 数组去重的方法,通过...(展开操作符)和Set对象来执行
     * @param {Array} arr  需要去重的数组值，必选
    */
    distinctArrExpand:function(arr){
        return [...new Set(arr)];
    },
    /**
     * 普通数组的进行升序排列,将普通数组转化隐式转化为数组对象，执行sort方法
     * @param {Array} arr  需要进行升序排列的数组值，必选
    */
    sortArr:function(arr){
        return arr.concat().sort((a,b)=>{return a-b})
    },
    /**
     * 数组中的值是否全部满足回调函数的条件
     * @param {Array} arrs  需要进行条件判断的数组值，必选
     * @param {Function} callback  回调函数，必须接受传参，并且有返回值，必选
     *                   回调函数中需要对接收到的数组值进行条件判断，并返回判断结果
    */
    isEveryArrRight:function(arrs,callback){
        return arrs.concat().every(callback(arr))
    },
    /**
     * 数组中是否存在满足回调函数条件的值
     * @param {Array} arrs  需要进行条件判断的数组值，必选
     * @param {Function} callback  回调函数，必须接受传参，并且有返回值，必选
     *                   回调函数中需要对接收到的数组值进行条件判断，并返回判断结果
    */
    isSomeArrRight:function(arrs,callback){
        return arrs.concat().some(callback(arr))
    },
    /**
     * 返回正则测试结果的方法
     * @param {RegExp} reg  用来检测变量的正则，必选
     * @param {Any} variable  需要检测的变量值，必选
    */
    testReg:function(reg,variable){
        let res = false;
        if(reg instanceof Array){
            res = RegExp(reg[0]).test(reg[1]);
        }else{
            res = reg.test(variable);
        }
        return res;
    },
    /**
     * 判断变量长度是否小于某个长度的方法
     * @param {Any} variable  需要检测的变量值，必选
     * @param {Number} num  用来检测变量的长度值，必选
    */
    testLowLength:function(variable,num){
        if(typeof num !=='number'||num<0){
            num = 0;
        }
        return variable.length > num;
    },
    /**
     * 判断变量长度是否等于某个长度的方法
     * @param {Any} variable  需要检测的变量值，必选
     * @param {Number} num  用来检测变量的长度值，必选
    */
    testEqualLength:function(variable,num){
        if(typeof num !=='number'||num<0){
            num = 0;
        }
        return variable.length = num;
    },
    /**
     * 判断变量长度是否超过某个长度的方法
     * @param {Any} variable  需要检测的变量值，必选
     * @param {Number} num  用来检测变量的长度值，必选
    */
    testBigLength:function(variable,num){
        if(typeof num !=='number'||num<0){
            num = 0;
        }
        return variable.length > num;
    },
    /**
     * 判断是否只为数字的方法
     * @param {Any} variable  需要检测的变量值，必选
    */
    onlyNum:function(variable){
        let _this = this;
        let reg= /^[0-9]*$/;
        return _this.testReg(reg,variable);
    },
    /**
     * 判断是否只为数字和字母的方法
     * @param {Any} variable  需要检测的变量值，必选
    */
    onlyNumLetter:function(variable){
        let _this = this;
        let reg= /^[0-9a-zA-Z]*$/g;
        return _this.testReg(reg,variable);
    },
    /**
     * 判断是否只为数字和字母和英文逗号的方法
     * @param {Any} variable  需要检测的变量值，必选
    */
    onlyNumLetterComma:function(variable){
        let _this = this;
        let reg= /^[0-9a-zA-Z,]*$/g;
        return _this.testReg(reg,variable);
    },
    /**
     * 判断输入的位数不超过16位的方法
     * @param {Any} variable  需要检测的变量值，必选
    */
    onlySixteen:function(variable){
        let _this = this;
        return _this.testBigLength(variable,16);
    },
    /**
     * 对外使用的工具类方法
     */
    /**
     * 分割原始参数数组，只保留用户输入的value值的方法
     * @param {Array} params  包含所有参数的param数组，必选
     *           格式举例[{text:'melon',data:'melon'},{text:'water',data:'water'}]
     *            每个子数组至少包含一个data属性值
    */
    splitArguData: function(params){
        let res = [];
        if(params instanceof Array &&params.length>0){
            for(let i=0;i<params.length;i++){
                res.push(params[i].data);
            }
        }else{
            res = "Parameter pass error,it is not an array object!";
        }

        return res;
    },
    /**
     * 将html字符串内容按照固定格式进行分割的方法
     * @param {Array} param  必选
     * 01 {String} str 被检索的字符串;
     * 02 {String} tagStr 用来做分割tag标签名;
     * 03 {Number} flag 数据返回模式,
     *        0 只返回第一次匹配的值，默认值  {String},
     *        1 返回所有匹配的值 {array},
    */
    splitTagStr: function(param){
        let res = null;
        if(param.length === 3){
            const tacitFlag = 1
            let str = param[0]
            let tagStr =param[1]
            let flag = param[2]
            if (!flag) {
                flag = tacitFlag;
            } else {
                if (typeof(flag) !== "number") {
                    flag = tacitFlag;
                }
            }
            let searchReg = new RegExp("<" + tagStr + "(.*?)>.*?<\/" + tagStr + ">", "g");
            switch (flag) {
            case 0:
                res = str.match(searchReg)[0];
                break;
            case 1:
                res = str.match(searchReg);
                break;
            default:
                res = str.match(searchReg)[0];
            }
        }else{
            res = "Parameter pass error,wrong number of arguments!";
        }

        return res;
    },
    /**
     * 截取html字符串中某段标签内容的方法
     * @param {Array} param  必选
     * 01 {String} str 被检索的字符串;
     * 02 {String} tagStr 需要选中的tag标签名;
     * 03 {Number} flag 数据返回模式,
     *        0 只返回被检索标签内容，默认值  {String},
     *        1 只返回剔除了检索标签内容的字符串    {String},
     *        2 返回，被检索标签内容，和剔除了检索标签内容的字符串  {Json},
     *        {tag:只返回被检索标签内容,text:剔除了检索标签内容的字符串}
    */
    cutTagStr: function(params){
        let res = null;
        if(params.length === 3){
            const tacitFlag = 2;
            let str = params[0];
            let tagStr = params[1];
            let flag = params[2];

            let searchReg = new RegExp("<" + tagStr + "(.*?)>(.+)<\/" + tagStr + ">", "g");
            if (!flag) {
                flag = tacitFlag;
            } else {
                if (typeof(flag) !== "number") {
                    flag = tacitFlag;
                }
            }
            switch (flag) {
            case 0:
                res = str.match(searchReg)[0];
                break;
            case 1:
                res = str.replace(searchReg, "");
                break;
            case 2:
                res = {tag: str.match(searchReg)[0], text: str.replace(searchReg, "")};
                break;
            default:
                res = {tag: str.match(searchReg)[0], text: str.replace(searchReg, "")};
            }
        }else{
            res = "Parameter pass error,wrong number of arguments!";
        }


        return res;
    },
    /**
     * 格式化日期的方法，将日期默认格式转化为yyyy-dd-MM HH:mm:ss
     * @param {Date} variable  需要转化的日期值，必选
    */
    formatDate:function(variable) {
        variable.toLocaleString("zh-CN",{hour12:false}).replace(/\b\d\b/g,'0$&').replace(new RegExp('/','gm'),'-');
    }
};


