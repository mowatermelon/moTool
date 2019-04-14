/*
 * @Author: wu Eva
 * @Date: 2018-04-10 11:33:17
 * @Last Modified by: melonHero
 * @Last Modified time: 2019-04-14 18:26:26
 */
 
/**
 * 不对外暴露的内置函数------------------------------------------------------------------------------------------------------------------------- start
 */

/**
 * 判断对象是否是通过选择器获取到的HTML元素
 * @param {elm}  elm 通过选择器获取到的元素，必选，且是正确的元素，则返回父级元素的后代查询选择效果。
 * @returns {Boolean} res 返回值，布尔值，返回值为真，则说明对象是的，反之，则不是
 */
export const checkELm = (elm) => {
    return elm !== undefined && elm && elm.nodeName !== undefined;
}

/**
 * 判断对象是否是通过选择器获取到的HTML元素
 * @param {String}  type 创建的元素类型，如div,object,span等等
 * @returns {elm} res 创建完成的元素
 */
export const createElm = (type = 'object') => {
    return type && document.createElement(type);
}

/**
 * 通过元素选择器来获取HTML元素
 * @param {String}  selector  需要进行选择的选择器，必选。
 * @param {String}  cls  元素的所包含的class，必选。
 * @param {elm}  elm 通过选择器获取到的父级元素，非必选，如果不为空，且是正确的元素，则返回父级元素的后代查询选择效果。
 * @returns {elm} elm 返回值，HTML 元素
 */
export const getByQuery = (selector, elm) => {
    let res = null
    // 判断是否为dom元素，判断这个dom元素是否存在子元素
    if (checkELm(elm)) {
        res = elm.querySelectorAll(selector) || []
    } else {
        // 如果判断不符合标准，则返回全局查找对象
        res = document.querySelectorAll(selector) || []
    }
    return res
}

/**
 * 不对外暴露的内置函数------------------------------------------------------------------------------------------------------------------------- end
 */

/**
 * 修改或者获取HTML元素相关------------------------------------------------------------------------------------------------------------------------- start
 */

/**
 * 通过元素id来获取HTML元素
 * @param {String}  id  元素的唯一id，必选。
 * @returns {elm} 返回值，HTML 元素
 */
export const getById = (id) => {
    return document.getElementById(id)
}

/**
 * 通过元素class来获取HTML元素
 * @param {String}  cls  元素的所包含的class，必选。
 * @returns {elm} 返回值，HTML 元素
 */
export const getByClass = (cls) => {
    return document.getElementsByClassName(cls)
}
/**
 * 通过元素tag标签来获取HTML元素，性能较低请注意
 * @param {String}  tag  元素的tag标签名，必选。
 * @returns {elm} 返回值，HTML 元素
 */
export const getByTag = (tag) => {
    return getByQuery(tag)
}

/**
 * 通过HTML元素属性查询元素，性能较低请注意
 * @param {String}  attr  元素的所包含的属性名，必选。
 *形如 a[target=_blank]，tag加上属性限制
 * @returns {elm} 返回值，HTML 元素
 */
export const getByAttr = (attr) => {
    return getByQuery(attr)
}

/**
 * 查询HTML元素的前置元素
 * @param {elm}  elm 通过选择器获取到的HTML 元素
 * @returns {elm} 返回值，HTML 元素
 */
export const getElmPrev = (elm) => {
    let res = null
    if (checkELm(elm)) {
        res = elm.previousElementSibling
    }

    return res
}

/**
 * 查询HTML元素的后置元素
 * @param {elm}  elm 通过选择器获取到的HTML 元素
 * @returns {elm} 返回值，HTML 元素
 */
export const getElmNext = (elm) => {
    let res = null
    if (checkELm(elm)) {
        res = elm.nextElementSibling
    }

    return res
}

/**
 * 查询HTML元素的所有前置元素
 * @param {elm}  elm 通过选择器获取到的HTML 元素
 * @returns {elm} 返回值，HTML 元素
 */
export const getElmPrevAll = (elm) => {
    let res = null
    if (checkELm(elm)) {
        const parentDom = elm.parentElement;
        const childrenArr = parentDom.children;
        res = [];
        for (let i = 0; i < childrenArr.length; i++) {
            const childrenObj = childrenArr[i];
            if (childrenObj === elm) {
                break;
            }
            res.push(childrenObj);
        }
    }

    return res
}

/**
 * 查询HTML元素的所有后置元素
 * @param {elm}  elm 通过选择器获取到的HTML 元素
 * @returns {elm} 返回值，HTML 元素
 */
export const getElmNextAll = (elm) => {
    let res = null
    if (checkELm(elm)) {
        const parentDom = elm.parentElement;
        const childrenArr = parentDom.children;
        res = [];
        for (let i = childrenArr.length - 1; i >= 0; i--) {
            const childrenObj = childrenArr[i];
            if (childrenObj === elm) {
                break;
            }
            res.unshift(childrenObj);
        }
    }

    return res
}

/**
 * 查询HTML元素的后代元素，性能较低请注意
 * @param {elm}  elm 通过选择器获取到的HTML 元素
 * @param {String}  selector  后代元素的所包含的属性名，必选。
 * @returns {elm} 返回值，HTML 元素
 */
export const findElmChild = (elm, selector) => {
    return getByQuery(selector, elm)
}

/**
 * 查询HTML元素的后代元素，性能较低请注意
 * @param {elm}  elm 通过选择器获取到的HTML 元素
 * @returns {elm} 返回值，HTML 元素
 */
export const getElmChild = (elm) => {
    let res = null
    if (checkELm(elm)) {
        res = elm.children
    }
    return res
}

/**
 * 查询HTML元素的后代元素，性能较低请注意
 * @param {elm}  elm 通过选择器获取到的HTML 元素
 * @returns {elm} 返回值，HTML 元素
 */
export const getElmParent = (elm) => {
    let res = null
    if (checkELm(elm)) {
        res = elm.parentNode
    }
    return res;
}

/**
 * Closest 获得匹配选择器的第一个祖先元素，从当前元素开始沿 DOM 树向上。
 * @param {elm}  elm 通过选择器获取到的HTML 元素
 * @param {String}  selector  后代元素的所包含的属性名，必选。
 * @returns {elm} 返回值，HTML 元素
 */
export const getElmClosest = (elm, selector) => {
    const matchesSelector = elm.matches || elm.webkitMatchesSelector || elm.mozMatchesSelector || elm.msMatchesSelector

    while (elm) {
        if (matchesSelector.call(elm, selector)) {
            return elm
        } else {
            elm = elm.parentElement
        }
    }
    return null
}

/**
 * ParentsUntil 获取当前每一个匹配元素集的祖先，不包括匹配元素的本身。
 * @param {elm}  elm 通过选择器获取到的HTML 元素
 * @param {String}  selector  后代元素的所包含的属性名，必选。
 * @param {Condition}  filter  寻找祖先元素的过滤条件。
 * @returns {Array} 返回值，HTML 元素集合
 */
export const getElmPUntil = (elm, selector, filter) => {
    const result = []
    if (checkELm(elm)) {
        const matchesSelector = elm.matches || elm.webkitMatchesSelector || elm.mozMatchesSelector || elm.msMatchesSelector

        // match start from parent
        elm = elm.parentElement
        while (elm && !matchesSelector.call(elm, selector)) {
            if (!filter) {
                result.push(elm)
            } else {
                if (matchesSelector.call(elm, filter)) {
                    result.push(elm)
                }
            }
            elm = elm.parentElement
        }
    }

    return result
}

/**
 * Append 插入到子节点的末尾
 * @param {elm}  elm 通过选择器获取到的HTML 元素
 * @param {String}  content  需要设置的值，必选。
 * @param {Number}  type  需要插入内容的类型，必选。
 *0：HTML string 1：Native Element
 * @returns {Boolean} 返回值，是否执行成功
 */
export const appendElm = (elm, content, type) => {
    let res = false
    if (checkELm(elm)) {
        if (type === 0 && typeof content === 'string') {
            elm.insertAdjacentHTML('beforeend', content)
            res = true
        } else if (type === 1 && checkELm(content)) {
            elm.appendChild(content)
            res = true
        }
    }

    return res
}

/**
 * Append 插入到子节点的开头
 * @param {elm}  elm 通过选择器获取到的HTML 元素
 * @param {String}  content  需要设置的值，必选。
 * @param {Number}  type  需要插入内容的类型，必选。
 *0：HTML string 1：Native Element
 * @returns {Boolean} 返回值，是否执行成功
 */
export const prependElm = (elm, content, type) => {
    let res = false
    if (checkELm(elm)) {
        if (type === 0 && typeof content === 'string') {
            elm.insertAdjacentHTML('afterbegin', content)
            res = true
        } else if (type === 1 && checkELm(content)) {
            elm.insertBefore(content, elm.firstChild)
            res = true
        }
    }

    return res
}

/**
 * insertBefore 在选中元素前插入新节点
 * @param {elm}  elm 通过选择器获取到的HTML 元素
 * @param {String}  content  需要设置的值，必选。
 * @param {Number}  type  需要插入内容的类型，必选。
 *0：HTML string 1：Native Element
 * @returns {Boolean} 返回值，是否执行成功
 */
export const insertBeforeElm = (elm, content, type) => {
    let res = false
    if (checkELm(elm)) {
        if (type === 0 && typeof content === 'string') {
            elm.insertAdjacentHTML('beforebegin', content)
            res = true
        } else if (type === 1 && checkELm(content)) {
            if (elm.parentNode) {
                elm.parentNode.insertBefore(content, elm)
                res = true
            }
        }
    }

    return res
}

/**
 * insertBefore 在选中元素前插入新节点
 * @param {elm}  elm 通过选择器获取到的HTML 元素
 * @param {String}  content  需要设置的值，必选。
 * @param {Number}  type  需要插入内容的类型，必选。
 *0：HTML string 1：Native Element
 * @returns {Boolean} 返回值，是否执行成功
 */
export const insertAfterElm = (elm, content, type) => {
    let res = false
    if (checkELm(elm)) {
        if (type === 0 && typeof content === 'string') {
            elm.insertAdjacentHTML('afterend', content)
            res = true
        } else if (type === 1 && checkELm(content)) {
            if (elm.parentNode) {
                elm.parentNode.insertBefore(content, elm.nextSibling)
                res = true
            }
        }
    }

    return res
}
/**
 * 移除HTML元素
 * @param {elm}  elm 通过选择器获取到的HTML 元素
 * @returns {elm} 返回值，执行是否成功
 */
export const removeElm = (elm) => {
    let res = false;
    if (checkELm(elm)) {
        elm.parentNode.removeChild(elm);
        res = true;
    }
    return res;
}
/**
 * 修改或者获取HTML元素相关------------------------------------------------------------------------------------------------------------------------- end
 */

/**
 * 修改或者获取HTML元素内容相关------------------------------------------------------------------------------------------------------------------------- start
 */

/**
 * 获取Form Input/Textarea的内容值
 * @param {String}  selector  后代元素的所包含的属性名，必选。
 * @returns {elm} 返回值，对应的value值
 */
export const getFValue = (selector) => {
    let res = ''
    const temp = getByQuery(selector)
    if (temp.length !== 0) {
        res = temp.value
    }
    return res
}

/**
 * 获取Form Input/Textarea的内容值
 * @param {String}  selector  必须能选择到元素的选择器，必选。
 * @param {String}  val  需要设置的值，必选。
 * @returns {Boolean} 返回值，是否执行成功
 */
export const setFValue = (selector, val) => {
    let res = false
    const oldVal = getFValue(selector)
    const temp = getByQuery(selector)
    if (temp.length !== 0 && val !== oldVal) {
        temp.value = val
        res = true
    }
    return res
}

/**
 * 获取元素的特性
 * @param {elm}  elm 通过选择器获取到的HTML 元素，必选。
 * @param {String}  attr  元素的所包含的特性名，必选。
 * @returns {attr} 返回值，获取到的元素特性
 */
export const getElmAttr = (elm, attr) => {
    let res = null;
    if (checkELm(elm)) {
        res = elm.getAttribute(attr);
    }
    return res;
}

/**
 * 设置元素的特性
 * @param {elm}  elm 通过选择器获取到的HTML 元素，必选。
 * @param {String}  attr  元素的所包含的特性名，必选。
 * @param {String}  val  想要设置的值，必选。
 * @returns {Boolean} 返回值，是否执行成功
 */
export const setElmAttr = (elm, attr, val) => {
    let res = false;
    if (checkELm(elm)) {
        const oldVal = getElmAttr(elm, attr);
        if (val !== oldVal) {
            elm.setAttribute(attr, val);
            res = true;
        }
    }
    return res;
}

/**
 * 批量设置元素的特性
 * @param {elm}  elm 通过选择器获取到的HTML 元素，必选。
 * @param {Object}  val  想要设置的值，必选。
 * @returns {Boolean} 返回值，是否执行成功
 */
export const batchSetElmAttr = (elm, val) => {
    let res = false;
    if (checkELm(elm) && val && val instanceof Object) {
        for (const attr in val) {
            elm.setAttribute(attr, val[attr]);
        }
        res = true;
    }
    return res;
}

/**
 * 获取元素的特性
 * @param {elm}  elm 通过选择器获取到的HTML 元素，必选。
 * @param {String}  attr  元素的所包含的特性名，必选。
 * @returns {Boolean} 返回值，是否执行成功
 */
export const removeElmAttr = (elm, attr) => {
    let res = false;
    if (checkELm(elm)) {
        elm.removeAttribute(attr);
        res = true;
    }
    return res;
}

/**
 * 获取元素的属性
 * @param {elm}  elm 通过选择器获取到的HTML 元素，必选。
 * @param {String}  attr  元素的所包含的属性名，必选。
 * @returns {attr} 返回值，获取到的元素属性
 */
export const getElmProp = (elm, prop) => {
    let res = null;
    if (checkELm(elm)) {
        res = elm[prop];
    }
    return res;
}

/**
 * 获取元素的属性
 * @param {elm}  elm 通过选择器获取到的HTML 元素，必选。
 * @param {String}  attr  元素的所包含的属性名，必选。
 * @param {String}  val  想要设置的值，必选。
 * @returns {Boolean} 返回值，是否执行成功
 */
export const setElmProp = (elm, prop, val) => {
    let res = false;
    if (checkELm(elm)) {
        const oldVal = getElmProp(elm, prop);
        if (val !== oldVal) {
            elm[prop] = val;
            res = true;
        }
    }
    return res;
}

/**
 * 获取元素的样式
 * @param {elm}  elm 通过选择器获取到的HTML 元素，必选。
 * @param {String}  elmStyle  元素的所包含的样式名，必选。
 * @returns {style} 返回值，获取到的元素样式
 */
export const getElmStyle = (elm, elmStyle) => {
    let res = null;
    if (checkELm(elm)) {
        res = elm.style[elmStyle];
    }
    return res;
}

/**
 * 获取元素的高度
 * @param {elm}  elm 通过选择器获取到的HTML 元素，必选。
 * @param {Number}  heightType 高度类型 [0：height，1：outerHeight]，默认0，为非必选。
 * @returns {style} 返回值，获取到的元素高度
 */
export const getElmHeight = (elm, heightType = 0) => {
    let res = 0;
    if (!checkELm(elm)) {
        return res;
    }
    if (heightType === 1) {
        res = elm.offsetHeight;
        return res;
    }
    if (heightType === 0) {
        res = elm.style.height;
        if (!res) {
            const style = getComputedStyle(elm);
            res = style.height;
        }
    }
    return parseFloat(res);
}

/**
 * 获取元素的宽度
 * @param {elm}  elm 通过选择器获取到的HTML 元素，必选。
 * @param {Number}  widthType 宽度类型 [0：width，1：outerWidth]，默认0，为非必选。
 * @returns {style} 返回值，获取到的元素宽度
 */
export const getElmWidth = (elm, widthType = 0) => {
    let res = 0;
    if (!checkELm(elm)) {
        return res;
    }
    if (widthType === 1) {
        res = elm.offsetWidth;
        return res;
    }
    if (widthType === 0) {
        res = elm.style.width;
        if (!res) {
            const style = getComputedStyle(elm);
            res = style.width;
        }
    }
    return parseFloat(res);
}

/**
 * 设置元素的宽度
 * @param {elm}  elm 通过选择器获取到的HTML 元素，必选。
 * @param {Number}  widthValue 宽度值，必选。
 * @param {String}  defaultUnit 宽度单位，默认px，为非必选。
 * @returns 无
 */
export const setElmWidth = (elm, widthValue = 0, defaultUnit = 'px') => {
    const res = false;
    if (!checkELm(elm)) {
        return res;
    }
    if (Number(widthValue)) {
        widthValue += defaultUnit;
    }
    setElmStyle(elm, 'width', widthValue);
    return !res;
}

/**
 * 设置元素的高度
 * @param {elm}  elm 通过选择器获取到的HTML 元素，必选。
 * @param {Number}  heightValue 高度值，必选。
 * @param {String}  defaultUnit 高度单位，默认px，为非必选。
 * @returns 无
 */
export const setElmHeight = (elm, heightValue = 0, defaultUnit = 'px') => {
    const res = false;
    if (!checkELm(elm)) {
        return res;
    }
    if (Number(heightValue)) {
        heightValue += defaultUnit;
    }
    setElmStyle(elm, 'height', heightValue);
    return !res;
}

/**
 * 获取元素的样式
 * @param {elm}  elm 通过选择器获取到的HTML 元素，必选。
 * @param {String}  elmStyle  元素的所包含的样式名，必选。
 * @param {String}  val  想要设置的值，必选。
 * @returns {Boolean} 返回值，是否执行成功
 */
export const setElmStyle = (elm, elmStyle, val) => {
    let res = false;
    if (checkELm(elm)) {
        const oldVal = getElmStyle(elm, elmStyle);
        if (val !== oldVal) {
            elm.style[elmStyle] = val;
            res = true;
        }
    }
    return res;
}

/**
 * 获取到页面最外层的Document的宽度
 * @returns {Number} 返回值，获取到的宽度值
 */
export const getDocW = () => {
    const body = document.body
    const html = document.documentElement
    const width = Math.max(
        body.offsetWidth,
        body.scrollWidth,
        html.clientWidth,
        html.offsetWidth,
        html.scrollWidth
    )
    return width
}

/**
 * 获取到页面最外层的Document height的高度
 * @returns {Number} 返回值，获取到的高度值
 */
export const getDocH = () => {
    const body = document.body
    const html = document.documentElement
    const height = Math.max(
        body.offsetHeight,
        body.scrollHeight,
        html.clientHeight,
        html.offsetHeight,
        html.scrollHeight
    )
    return height
}

/**
 * 获取到页面window的宽度
 * @param {Boolean} type 是否包含滚动条的宽度，必选。
 * @returns {Number} 返回值，获取到的宽度值
 */
export const getWinW = (type) => {
    let res = 0
    type = type || false
    if (type) {
        // 含 scrollbar
        res = window.document.documentElement.clientWidth
    } else {
        // 不含 scrollbar，与 jQuery 行为一致
        res = window.innerWidth
    }
    return res
}

/**
 * 获取到页面window的高度
 * @param {Boolean} type 是否包含滚动条的高度，必选。
 * @returns {Number} 返回值，获取到的宽度值
 */
export const getWinH = (type) => {
    let res = 0
    type = type || false
    if (type) {
        // 含 scrollbar
        res = window.document.documentElement.clientHeight
    } else {
        // 不含 scrollbar，与 jQuery 行为一致
        res = window.innerHeight
    }
    return res
}

/**
 * 获取元素的html内容
 * @param {elm}  elm 通过选择器获取到的HTML 元素，必选。
 * @param {Number}  HtmlType HTML类型 [0：innerHTML，1：outerHTML]，默认0，为非必选。
 * @returns {attr} 返回值，获取到的元素属性
 */
export const getElmHTML = (elm, HtmlType = 0) => {
    let res = 0;
    if (!checkELm(elm)) {
        return res;
    }
    if (HtmlType === 1) {
        res = elm.outerHTML;
        return res;
    }
    if (HtmlType === 0) {
        res = elm.innerHTML;
    }
    return res;
}

/**
 * 修改元素的html内容
 * @param {elm}  elm 通过选择器获取到的HTML 元素，必选。
 * @param {String}  val  想要设置的值，必选。
 * @param {Number}  HtmlType HTML类型 [0：innerHTML，1：outerHTML]，默认0，为非必选。
 * @returns {Boolean} 返回值，元素的包含的html内容
 */
export const setElmHTML = (elm, val, HtmlType = 0) => {
    let res = false;
    if (!checkELm(elm)) {
        return res;
    }
    const oldVal = getElmHTML(elm, HtmlType);
    if (val === oldVal) {
        return res;
    }
    if (HtmlType === 1) {
        elm.outerHTML = val;
        res = true;
        return res;
    }
    if (HtmlType === 0) {
        elm.innerHTML = val;
        res = true;
    }
    return res;
}

/**
 * 修改或者获取HTML元素内容相关------------------------------------------------------------------------------------------------------------------------- end
 */

/**
 * 修改或者获取HTML元素样式相关------------------------------------------------------------------------------------------------------------------------- start
 */

/**
 * 给元素添加样式
 * @param {elm}  elm 通过选择器获取到的HTML 元素，必选。
 * @param {String}  className  需要添加的className，必选。
 * @returns {Boolean} 返回值，是否执行成功
 */
export const addClass = (elm, className) => {
    let res = false
    if (checkELm(elm) && className) {
        elm.classList.add(className)
        res = true
    }
    return res
}

/**
 * 给元素移除样式
 * @param {elm}  elm 通过选择器获取到的HTML 元素，必选。
 * @param {String}  className  需要移除的className，必选。
 * @returns {Boolean} 返回值，是否执行成功
 */
export const removeClass = (elm, className) => {
    let res = false
    if (checkELm(elm) && className) {
        elm.classList.remove(className)
        res = true
    }
    return res
}

/**
 * 判断元素是否包含某个样式
 * @param {elm}  elm 通过选择器获取到的HTML 元素，必选。
 * @param {String}  className  需要查询的className，必选。
 * @returns {Boolean} 返回值，是否执行成功
 */
export const hasClass = (elm, className) => {
    let res = false
    if (checkELm(elm)) {
        res = [...elm.classList].includes(className)
    }
    return res
}

/**
 * 动态切换元素样式
 * @param {elm}  elm 通过选择器获取到的HTML 元素，必选。
 * @param {String}  className  需要切换的className，必选。
 * @returns {Boolean} 返回值，是否执行成功
 */
export const toggleClass = (elm, className) => {
    let res = false
    if (checkELm(elm)) {
        elm.classList.toggle(className)
        res = hasClass(elm, className)
    }
    return res
}

/**
 * 修改或者获取HTML元素样式相关------------------------------------------------------------------------------------------------------------------------- start
 */

export default {}
