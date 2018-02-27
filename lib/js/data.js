"use strict";

function getTestData(){
  let res = [
    {
      name:'splitTagStr',
      use:'moTool.splitTagStr(str, tagStr, flag)',
      content:'将html字符串内容按照固定格式进行分割',
      code:'moTool.splitTagStr("<table><tr><td>1</td><td>2</td></tr></table><table><tr><td>1</td><td>2</td></tr></table><table><tr><td>1</td><td>2</td></tr></table><table><tr><td>1</td><td>2</td></tr></table><table><tr><td>1</td><td>2</td></tr></table><table><tr><td>1</td><td>2</td></tr></table>", "table", 1)',
      exec:function(oldParams,_this){
        let res = null;
        moTool.log(oldParams);
        let newParams = moTool.splitArguData(oldParams);
        if(newParams instanceof Array){
          moTool.log(String(newParams));
          res = moTool.splitTagStr(newParams);
          moTool.log(res);
        }else{
          moTool.err(newParams);
          res =  newParams;
        }
        return res;
      },
      res:'',
      params:[
        {
          name:'检索内容',
          data:'',
          isSel:false
        },
        {
          name:'分割tag值',
          data:'',
          isSel:false
        },
        {
          name:'返回模式',
          data:'',
          isSel:true,
          values:[0,1]            
        }
      ]
    },
    {
      name:'cutTagStr',
      use:'moTool.cutTagStr(str, tagStr, flag)',
      content:'截取html字符串中某段标签内容',
      code:'moTool.cutTagStrcutTagStr("<table><caption>test</caption><tr><td>1</td><td>2</td></tr></table>", "caption", 2)',
      exec:function(oldParams,_this){
        let res = null;
        moTool.log(oldParams);
        let newParams = moTool.splitArguData(oldParams);
        if(newParams instanceof Array){
          moTool.log(String(newParams));
          res = moTool.cutTagStr(newParams);
          moTool.log(res);
        }else{
          moTool.err(newParams);
          res =  newParams;
        }
        return res;
      },
      res:'',
      params:[
        {
            name:'检索内容',
            data:'',
            isSel:false
          },
          {
            name:'选中tag值',
            data:'',
            isSel:false
          },
          {
            name:'返回模式',
            data:'',
            isSel:true,
            values:[0,1,2]            
          }
      ]
    }
  ];

  return res;
}


function getDocsData(){
  let res = [
    {
      name:'splitTagStr',
      use:'moTool.splitTagStr(str, tagStr, flag)',
      content:'将html字符串内容按照固定格式进行分割',
      code:'moTool.splitTagStr("<table><tr><td>1</td><td>2</td></tr></table><table><tr><td>1</td><td>2</td></tr></table><table><tr><td>1</td><td>2</td></tr></table><table><tr><td>1</td><td>2</td></tr></table><table><tr><td>1</td><td>2</td></tr></table><table><tr><td>1</td><td>2</td></tr></table>", "table", 1)',
      exec:'["<table><tr><td>1</td><td>2</td></tr></table>", "<table><tr><td>1</td><td>2</td></tr></table>", "<table><tr><td>1</td><td>2</td></tr></table>", "<table><tr><td>1</td><td>2</td></tr></table>", "<table><tr><td>1</td><td>2</td></tr></table>", "<table><tr><td>1</td><td>2</td></tr></table>"]',
      params:[
        {
          name:'str',
          type:'String',
          explain:'被检索的字符串',
          example:'<table><tr><td>1</td><td>2</td></tr></table><table><tr><td>1</td><td>2</td></tr></table><table><tr><td>1</td><td>2</td></tr></table><table><tr><td>1</td><td>2</td></tr></table><table><tr><td>1</td><td>2</td></tr></table><table><tr><td>1</td><td>2</td></tr></table>'
        },
        {
          name:'tagStr',
          type:'String',
          explain:'用来做分割tag标签名',
          example:"table",
        },
        {
          name:'flag',
          type:'Number',
          explain:'数据返回模式,值为0代表只返回第一次匹配的值，默认值;值为1代表返回所有匹配的数组集合',
          example:'0或者1'
        }
      ]
    },
    {
      name:'cutTagStr',
      use:'moTool.cutTagStr(str, tagStr, flag)',
      content:'截取html字符串中某段标签内容',
      code:'moTool.cutTagStrcutTagStr("<table><caption>test</caption><tr><td>1</td><td>2</td></tr></table>", "caption", 2)',
      exec:'{tag: "<caption>test</caption>", text: "<table><tr><td>1</td><td>2</td></tr></table>"}',
      params:[
        {
          name:'str',
          type:'String',
          explain:'被检索的字符串',
          example:'<table><caption>test</caption><tr><td>1</td><td>2</td></tr></table>'
        },
        {
          name:'tagStr',
          type:'String',
          explain:'需要选中的tag标签名',
          example:"caption",
        },
        {
          name:'flag',
          type:'Number',
          explain:'数据返回模式,值为0代表只返回被检索标签内容，默认值;值为1只返回剔除了检索标签内容的字符串;值为2返回被检索标签内容，和剔除了检索标签内容的字符串',
          example:'0或者1或者2'
        }
      ]
    }
  ];
  return res;
}
