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
    },
    {
      name:'sortArr',
      use:'moTool.sortArr(arr)',
      content:'普通数组的进行升序排列,将普通数组转化隐式转化为数组对象，执行sort方法',
      code:'moTool.sortArr([1,2,2,3,5,4,5])',
      exec:function(oldParams,_this){
        moTool.log(oldParams);
        return moTool.sortArr(JSON.parse(oldParams[0].data));
      },
      res:'',
      params:[
        {
          name:'arr',
          data:'',
          isSel:false
        }
      ]
    },
    {
      name:'distinctArrFrom',
      use:'moTool.distinctArrFrom(arr)',
      content:'数组去重的方法,通过Array.from()和Set对象来执行',
      code:'moTool.distinctArrFrom([1,2,2,3,5,4,5])',
      exec:function(oldParams,_this){
        moTool.log(oldParams);
        return moTool.distinctArrFrom(JSON.parse(oldParams[0].data));
      },
      res:'',
      params:[
        {
          name:'arr',
          data:'',
          isSel:false
        }
      ]
    },
    {
      name:'distinctArrExpand',
      use:'moTool.distinctArrExpand(arr)',
      content:'数组去重的方法,通过...(展开操作符)和Set对象来执行',
      code:'moTool.distinctArrExpand([1,2,2,3,5,4,5])',
      exec:function(oldParams,_this){
        moTool.log(oldParams);
        return moTool.distinctArrExpand(JSON.parse(oldParams[0].data));
      },
      res:'',
      params:[
        {
          name:'arr',
          data:[],
          isSel:false
        }
      ]
    },
    {
      name:'testReg',
      use:'moTool.testReg(reg,variable)',
      content:'返回正则测试结果的方法',
      code:'moTool.testReg(/^[0-9]*$/,"a")',
      exec:function(oldParams,_this){
        let res = null;
        moTool.log(oldParams);
        let newParams = moTool.splitArguData(oldParams);
        if(newParams instanceof Array){
          moTool.log(newParams);
          res = moTool.testReg(newParams);
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
          name:'reg',
          data:'',
          isSel:false
        },
        {
          name:'variable',
          data:'',
          isSel:false
        }
      ]
    },
    {
      name:'onlyNum',
      use:'moTool.onlyNum(variable)',
      content:'判断是否只为数字的方法',
      code:'moTool.onlyNum("a")',
      exec:function(oldParams,_this){
        moTool.log(oldParams);
        return moTool.onlyNum(oldParams[0].data);
      },
      res:'',
      params:[
        {
          name:'variable',
          data:'',
          isSel:false
        }
      ]
    },
    {
      name:'onlyNumLetter',
      use:'moTool.onlyNumLetter(variable)',
      content:'判断是否只为数字和字母的方法',
      code:'moTool.onlyNumLetter("a,")',
      exec:function(oldParams,_this){
        moTool.log(oldParams);
        return moTool.onlyNumLetter(oldParams[0].data);
      },
      res:'',
      params:[
        {
          name:'variable',
          data:'',
          isSel:false
        }
      ]
    },
    {
      name:'onlyNumLetterComma',
      use:'moTool.onlyNumLetterComma(variable)',
      content:'判断是否只为数字和字母和英文逗号的方法',
      code:'moTool.onlyNumLetterComma("a，")',
      exec:function(oldParams,_this){
        moTool.log(oldParams);
        return moTool.onlyNumLetterComma(oldParams[0].data);
      },
      res:'',
      params:[
        {
          name:'variable',
          data:'',
          isSel:false
        }
      ]
    },
    {
      name:'fillArr',
      use:'moTool.fillArr(reg,variable)',
      content:'返回正则测试结果的方法',
      code:'moTool.fillArr(10,"a")',
      exec:function(oldParams,_this){
        let res = null;
        moTool.log(oldParams);
        let newParams = moTool.splitArguData(oldParams);
        if(newParams instanceof Array){
          moTool.log(newParams);
          res = moTool.fillArr(newParams);
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
          name:'count',
          data:'',
          isSel:false
        },
        {
          name:'variable',
          data:'',
          isSel:false
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
    },
    {
      name:'sortArr',
      use:'moTool.sortArr(arr)',
      content:'普通数组的进行升序排列,将普通数组转化隐式转化为数组对象，执行sort方法',
      code:'moTool.sortArr([1,2,2,3,5,4,5])',
      exec:'[1,2,2,3,4,5,5]',
      params:[
        {
          name:'arr',
          type:'Array',
          explain:'需要进行升序排列的数组值，必选',
          example:'[1,2,2,3,5,4,5]'
        }
      ]
    },
    {
      name:'distinctArrFrom',
      use:'moTool.distinctArrFrom(arr)',
      content:'数组去重的方法,通过Array.from()和Set对象来执行',
      code:'moTool.distinctArrFrom([1,2,2,3,5,4,5])',
      exec:'[1, 2, 3, 5, 4]',
      params:[
        {
          name:'arr',
          type:'Array',
          explain:'需要去重的数组值，必选',
          example:'[1,2,2,3,5,4,5]'
        }
      ]
    },
    {
      name:'distinctArrExpand',
      use:'moTool.distinctArrExpand(arr)',
      content:'数组去重的方法,通过...(展开操作符)和Set对象来执行',
      code:'moTool.distinctArrExpand([1,2,2,3,5,4,5])',
      exec:'[1, 2, 3, 5, 4]',
      params:[
        {
          name:'arr',
          type:'Array',
          explain:'需要去重的数组值，必选',
          example:'[1,2,2,3,5,4,5]'
        }
      ]
    },
    {
      name:'testReg',
      use:'moTool.testReg(reg,variable)',
      content:'返回正则测试结果的方法',
      code:'moTool.testReg("^[0-9]*$","a")',
      exec:'false',
      params:[
        {
          name:'reg',
          type:'RegExp',
          explain:'用来检测变量的正则，必选',
          example:'^[0-9]*$'
        },
        {
          name:'variable',
          type:'Any',
          explain:'需要检测的变量值，必选',
          example:'a'
        }
      ]
    },
    {
      name:'onlyNum',
      use:'moTool.onlyNum(variable)',
      content:'判断是否只为数字的方法',
      code:'moTool.onlyNum("a")',
      exec:'false',
      params:[
        {
          name:'variable',
          type:'Any',
          explain:'需要检测的变量值，必选',
          example:'a'
        }
      ]
    },
    {
      name:'onlyNumLetter',
      use:'moTool.onlyNumLetter(variable)',
      content:'判断是否只为数字和字母的方法',
      code:'moTool.onlyNumLetter("a,")',
      exec:'false',
      params:[
        {
          name:'variable',
          type:'Any',
          explain:'需要检测的变量值，必选',
          example:'a,'
        }
      ]
    },
    {
      name:'onlyNumLetterComma',
      use:'moTool.onlyNumLetterComma(variable)',
      content:'判断是否只为数字和字母和英文逗号的方法',
      code:'moTool.onlyNumLetterComma("a，")',
      exec:'false',
      params:[
        {
          name:'variable',
          type:'Any',
          explain:'需要检测的变量值，必选',
          example:'a，'
        }
      ]
    },
    {
      name:'fillArr',
      use:'moTool.fillArr(count,variable)',
      content:'返回规定长度和规定填充数组的方法',
      code:'moTool.fillArr(10,"a")',
      exec:'[ "a", "a", "a", "a", "a", "a", "a", "a", "a", "a" ]',
      params:[
        {
          name:'count',
          type:'Number',
          explain:'返回数组的长度，必选',
          example:'^[0-9]*$'
        },
        {
          name:'variable',
          type:'Any',
          explain:'返回数组需要填充的内容，必选',
          example:'a'
        }
      ]
    }
  ];
  return res;
}

function getComponentsData(){
  let res = [
    {
      name:'ScaleBar',
      use:'"./components/maps/ScaleBar"',
      content:'给Map添加比例尺组件',
      code:['<scale-bar></scale-bar>','<scale-bar position="top-left"></scale-bar>'],
      params:[
        {
          name:'position',
          type: 'String',
          default: "bottom-left",
          explain:'选填项，需要添加的比例尺相对于地图的位置，只有四个值可配置，top-left，top-right，bottom-left和bottom-right',
          example:'top-left'
        }
      ]
    },
    {
      name:'PictureMarkerSymbol',
      use:'"./components/maps/PictureMarkerSymbol"',
      content:'给Map添加线条标识组件',
      code:[
        '<picture-marker-symbol :iLong="114.40845006666666" :iLati="30.456864444444443"></picture-marker-symbol>',
        '<picture-marker-symbol :iLong="114.40845006666666" :iLati="30.456864444444443" img-url="mark2.png" i-width="15px" i-height="4pt" x-offset="2px" :y-offset="2"></picture-marker-symbol>'
      ],
      params:[
        {
          name:'iLong',
          type: 'Number',
          default: 0,
          explain:'必填项，需要添加图片标识点对应的经度',
          example: 114.40845006666666
        },
        {
          name:'iLati',
          type: 'Number',
          default: 0,
          explain:'必填项，需要添加图片标识点对应的纬度',
          example: 40.456864444444443
        },
        {
          name:'imgUrl',
          type: 'String',
          default: 'mark.png',
          explain:'选填项，需要添加标识的图片名称',
          example:'mark2.png'
        },
        {
          name:'iWidth',
          type: 'String or Number',
          default: '15px',
          explain:'选填项，需要添加标识的图片宽度',
          example:'20px'
        },
        {
          name:'iHeight',
          type: 'String or Number',
          default: "15px",
          explain:'选填项，需要添加标识的图片高度',
          example:4
        },
        {
          name:'xOffset',
          type: 'String or Number',
          default: 0,
          explain:'选填项，需要添加标识的图片相对给定的经纬度的x轴方向偏移',
          example:'2pt'
        },
        {
          name:'yOffset',
          type: 'String or Number',
          default: 0,
          explain:'选填项，需要添加标识的图片相对给定的经纬度的y轴方向偏移',
          example: 1
        }
      ]
    },
    {
      name:'LineMarkerSymbol',
      use:'"./components/maps/LineMarkerSymbol"',
      content:'给Map添加线条标识组件',
      code:[
        '<line-symbol :lPaths="[[114.40845006666666,30.456864444444443],[114.40845006666666,35.456864444444443],[114.40845006666666,40.456864444444443]]"></line-symbol>',
        '<line-symbol :lPaths="[[114.40845006666666,30.456864444444443],[114.40845006666666,35.456864444444443],[114.40845006666666,40.456864444444443]]" :lColor="[226, 119, 40]" lWidth="2px"></line-symbol>'
      ],
      params:[
        {
          name:'lPaths',
          type: 'Array',
          default: [],
          explain:'必填项，需要添加标识中每个点对应的经纬度',
          example:'[[114.40845006666666,30.456864444444443],[114.40845006666666,35.456864444444443],[114.40845006666666,40.456864444444443]]'
        },
        {
          name:'lColor',
          type: 'Array',
          default: [255, 255, 255],
          explain:'选填项，需要添加线条标识对应的RGB颜色值',
          example:'[226, 119, 40]'
        },
        {
          name:'lWidth',
          type: 'String or Number',
          default: 0.75,
          explain:'选填项，需要添加线条标识对应的线条的宽度',
          example:'2pt'
        }
      ]
    }
  ];
  return res;
}
