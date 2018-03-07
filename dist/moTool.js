/*
 * @Author: melon.wuEva 
 * @Date: 2018-02-25 13:48:40 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-03-07 12:02:35
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
    splitTagStr: (param)=>{
        /**
         * @param 01 str String 被检索的字符串
         * @param 02 tagStr String 用来做分割tag标签名
         * @param 03 flag Number 数据返回模式
         *        0 只返回第一次匹配的值，默认值  String   
         *        1 返回所有匹配的值 array   
         */
        let res = null;
        if(param.length === 3){
            const tacitFlag = 1;            
            let str = param[0];
            let tagStr = param[1];        
            let flag = param[2];    
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
    //截取html字符串中某段标签内容
    cutTagStr: (params)=>{
        /**
         * @param 01 str String 被检索的字符串
         * @param 02 tagStr String 需要选中的tag标签名
         * @param 03 flag Number 数据返回模式
         *        0 只返回被检索标签内容，默认值  String   
         *        1 只返回剔除了检索标签内容的字符串    String       
         *        2 返回，被检索标签内容，和剔除了检索标签内容的字符串    Json   
         *          {tag:只返回被检索标签内容,text:剔除了检索标签内容的字符串}
         */
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
    }
};


