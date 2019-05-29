/*
 * @File: xxtea算法的js加密处理类,还包含了UtfParser类,还包含了Base64类
 * @Author: Wu Eva
 * @Date: 2019-01-22 12:15:55
 * @Last Modified by: Wu Eva
 * @Last Modified time: 2019-05-28 16:40:55
 */
'use strict';

const _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const { error: _error } = console;
/**
 * @class Base64Class 帮助基类
 */
class Base64Class {
    // #region  基础属性设置 --------------------------------------------------------------------------------------------------------
    // constructor() {
    //     // private property
    //     // this._keyStr = _keyStr;
    // };
    // #endregion  基础属性设置--------------------------------------------------------------------------------------------------------
    // #region 静态方法 --------------------------------------------------------------------------------------------------------- */
    static init() {
        return new Base64Class();
    }
    // #endregion 静态方法--------------------------------------------------------------------------------------------------------- */

    // public method for encoding
    static encode(input) {
        let output = '';
        let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        let i = 0;

        input = Base64Class._utf8_encode(input);

        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output += _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }

        return output;
    };

    // public method for decoding
    static decode(input) {
        let output = '';
        let chr1, chr2, chr3;
        let enc1, enc2, enc3, enc4;
        let i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 !== 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 !== 64) {
                output = output + String.fromCharCode(chr3);
            }
        }

        output = this._utf8_decode(output);

        return output;
    };
    static encode64(input) {
        let output = '';
        let chr1; let chr2; let chr3 = '';
        let enc1; let enc2; let enc3; let enc4 = '';
        let i = 0;

        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
            _keyStr.charAt(enc1) +
            _keyStr.charAt(enc2) +
            _keyStr.charAt(enc3) +
            _keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = '';
            enc1 = enc2 = enc3 = enc4 = '';
        } while (i < input.length);

        return output;
    }
    static decode64(input) {
        let output = '';
        let chr1; let chr2; let chr3 = '';
        let enc1; let enc2; let enc3; let enc4 = '';
        let i = 0;

        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        const base64test = /[^A-Za-z0-9\+\/\=\n]/g;
        if (base64test.exec(input)) {
            _error('There were invalid base64 characters in the input text.\n' +
                  "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                  'Expect errors in decoding.');
        }
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

        do {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 !== 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 !== 64) {
                output = output + String.fromCharCode(chr3);
            }

            chr1 = chr2 = chr3 = '';
            enc1 = enc2 = enc3 = enc4 = '';
        } while (i < input.length);

        return output;
    }
    // private method for UTF-8 encoding
    static _utf8_encode(string) {
        string = string.replace(/\r\n/g, '\n');
        let utftext = '';

        for (let n = 0; n < string.length; n++) {
            const c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }

        return utftext;
    };

    // private method for UTF-8 decoding
    static _utf8_decode(utftext) {
        let string = '';
        let i = 0;
        let c = 0;
        // let c1 = 0;
        let c2 = 0;
        let c3 = 0;

        while (i < utftext.length) {
            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }

        return string;
    };

    // #endregion 静态方法 --------------------------------------------------------------------------------------------------------
}

/**
 * @class UtfParserClass类
 */
class UtfParserClass {
    // #region  基础属性设置 --------------------------------------------------------------------------------------------------------
    // #endregion  基础属性设置--------------------------------------------------------------------------------------------------------

    // #region  静态方法 --------------------------------------------------------------------------------------------------------

    // #region 对象内部使用 --------------------------------------------------------------------------------------------------------

    // #region 对象内部使用 --- 基础实例化相关方法---------------------------------------------------------------
    /**
    * 用于对象实例化
    * @param {String} privateKey 用于加密的私钥
    * @returns {Object} 返回已经实例化完成的对象
    */
    static init() {
        const res = new UtfParserClass();
        return res;
    }
    // #endregion 对象内部使用 --- 基础实例化相关方法---------------------------------------------------------------

    // #endregion 对象内部使用--------------------------------------------------------------------------------------------------------

    // #region 对象外部使用 --------------------------------------------------------------------------------------------------------

    // function:change utf16 to utf8
    // parms(str):string that you want to change
    static utf16to8(str) {
        let out, i, c;
        const len = str.length;

        out = '';
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
        }
        return out;
    }

    // function:change utf8 to utf16
    // parms(str):string that you want to change
    static utf8to16(str) {
        str = str.toString();

        const len = str.length;
        let out, i, c;
        let char2, char3;

        out = '';
        i = 0;
        while (i < len) {
            c = str.charCodeAt(i++);
            switch (c >> 4) {
                case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                    // 0xxxxxxx
                    out += str.charAt(i - 1);
                    break;
                case 12: case 13:
                    // 110x xxxx  10xx xxxx
                    char2 = str.charCodeAt(i++);
                    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                    break;
                case 14:
                    // 1110 xxxx  10xx xxxx  10xx xxxx
                    char2 = str.charCodeAt(i++);
                    char3 = str.charCodeAt(i++);
                    out += String.fromCharCode(((c & 0x0F) << 12) |
               ((char2 & 0x3F) << 6) |
               ((char3 & 0x3F) << 0));
                    break;
            }
        }

        return out;
    }

    // #endregion 对象外部使用--------------------------------------------------------------------------------------------------------
}

/**
 * @class XxteaClass类
 */
class XxteaClass {
    // #region  基础属性设置 --------------------------------------------------------------------------------------------------------
    constructor(privateKey) {
        this._keyString = privateKey;
    };
    // #endregion  基础属性设置--------------------------------------------------------------------------------------------------------

    // #region  静态方法 --------------------------------------------------------------------------------------------------------

    // #region 对象内部使用 --------------------------------------------------------------------------------------------------------

    // #region 对象内部使用 --- 基础实例化相关方法---------------------------------------------------------------
    /**
    * 用于对象实例化
    * @param {String} privateKey 用于加密的私钥
    * @returns {Object} 返回已经实例化完成的对象
    */
    static init(privateKey) {
        const res = new XxteaClass(privateKey);
        return res;
    }
    // #endregion 对象内部使用 --- 基础实例化相关方法---------------------------------------------------------------

    // #endregion 对象内部使用--------------------------------------------------------------------------------------------------------

    // #region 对象外部使用 --------------------------------------------------------------------------------------------------------
    // 将长整形转换为string,private
    _long2str(v, w) {
        const vl = v.length;
        let n = (vl - 1) << 2;
        if (w) {
            const m = v[vl - 1];
            if ((m < n - 3) || (m > n)) return null;
            n = m;
        }
        for (let i = 0; i < vl; i++) {
            v[i] = String.fromCharCode(v[i] & 0xff,
                v[i] >>> 8 & 0xff,
                v[i] >>> 16 & 0xff,
                v[i] >>> 24 & 0xff);
        }
        if (w) {
            return v.join('').substring(0, n);
        } else {
            return v.join('');
        }
    }

    // 将string转换为long,private
    _str2long(s, w) {
        const len = s.length;
        const v = [];
        for (let i = 0; i < len; i += 4) {
            v[i >> 2] = s.charCodeAt(i) |
              s.charCodeAt(i + 1) << 8 |
              s.charCodeAt(i + 2) << 16 |
              s.charCodeAt(i + 3) << 24;
        }
        if (w) {
            v[v.length] = len;
        }
        return v;
    }

    // function: encrypt str with private key by xxtea
    xxtea_encrypt(str) {
        if (str === '') {
            return '';
        }
        str = Base64Class.encode64(UtfParserClass.utf16to8(str));
        const v = this._str2long(str, true);
        const k = this._str2long(this._keyString, false);
        if (k.length < 4) {
            k.length = 4;
        }
        const n = v.length - 1;

        let z = v[n]; let y = v[0]; const delta = 0x9E3779B9;
        let mx; let e; let p; let q = Math.floor(6 + 52 / (n + 1)); let sum = 0;
        while (q-- > 0) {
            sum = sum + delta & 0xffffffff;
            e = sum >>> 2 & 3;
            for (p = 0; p < n; p++) {
                y = v[p + 1];
                mx = (z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z);
                z = v[p] = v[p] + mx & 0xffffffff;
            }
            y = v[0];
            mx = (z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z);
            z = v[n] = v[n] + mx & 0xffffffff;
        }

        return Base64Class.encode64(this._long2str(v, false));
    }

    // function: decrypt str with private key by xxtea
    xxtea_decrypt(str) {
        if (str === '') {
            return '';
        }
        str = Base64Class.decode64(str);
        const v = this._str2long(str, false);
        const k = this._str2long(this._keyString, false);
        if (k.length < 4) {
            k.length = 4;
        }
        const n = v.length - 1;

        let z = v[n - 1]; let y = v[0]; const delta = 0x9E3779B9;
        let mx; let e; let p; const q = Math.floor(6 + 52 / (n + 1)); let sum = q * delta & 0xffffffff;
        while (sum !== 0) {
            e = sum >>> 2 & 3;
            for (p = n; p > 0; p--) {
                z = v[p - 1];
                mx = (z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z);
                y = v[p] = v[p] - mx & 0xffffffff;
            }
            z = v[n];
            mx = (z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z);
            y = v[0] = v[0] - mx & 0xffffffff;
            sum = sum - delta & 0xffffffff;
        }

        return UtfParserClass.utf8to16(Base64Class.decode64(this._long2str(v, true)));
    }
    // #endregion 对象外部使用--------------------------------------------------------------------------------------------------------
}
export default XxteaClass;
