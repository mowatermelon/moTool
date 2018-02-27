/*
 * @Author: melon.wuEva 
 * @Date: 2018-02-25 13:48:40 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-27 18:29:38
 */

"use strict";

//wuEva 常用功能集中插件
var moTool = {
    /**
     * 保证工具类正常使用的方法
     */
    //分割原始参数数组，只保留用户输入的value值
    splitArguData: (params)=>{
        /**
         * @param params Array 包含所有参数的param数组
         *          格式举例[{text:'melon',data:'melon'},{text:'water',data:'water'}]
         *          每个子数组至少包含一个data属性值
         */        
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
    //打印正常日志
    log: (str)=>{
        console.log(str);
    },
    //打印消息日志
    info: (str)=>{
        console.info(str);
    },
    //打印错误日志
    err: (str)=>{
        console.error(str);
    },
    /**
     * 对外使用的工具类方法
     */
    //将html字符串内容按照固定格式进行分割
    splitTagStr: (str, tagStr, flag)=>{
        /**
         * @param str String 被检索的字符串
         * @param tagStr String 用来做分割tag标签名
         * @param flag Number 数据返回模式
         *        0 只返回第一次匹配的值，默认值  String   
         *        1 返回所有匹配的值 array   
         */
        let res = null;
        const tacitFlag = 0;
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

        return res;
    },
    //截取html字符串中某段标签内容
    cutTagStr: (str, tagStr, flag)=>{
        /**
         * @param str String 被检索的字符串
         * @param tagStr String 需要选中的tag标签名
         * @param flag Number 数据返回模式
         *        0 只返回被检索标签内容，默认值  String   
         *        1 只返回剔除了检索标签内容的字符串    String       
         *        2 返回，被检索标签内容，和剔除了检索标签内容的字符串    Json   
         *          {tag:只返回被检索标签内容,text:剔除了检索标签内容的字符串}
         */
        let res = null;
        const tacitFlag = 0;
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

        return res;
    }
};


