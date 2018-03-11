# polyfill

## babel-ployfill

全局作用域，大小 250kb+

使用方式，在入口文件增加：

```js
import 'babel-polyfill'
```

如果使用 webpack，可以直接：

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: 'babel-loader'
            }
        ]
    },
    entry: {
        'entry': ['babel-polyfill', './src/index']
    }
}
```

## babel-runtime

https://babeljs.io/docs/plugins/transform-runtime/

> Note: instance methods such as "foobar".includes("foo") will not work since that would require modification of existing built-ins (Use babel-polyfill for that).

不会编译类似 `Array.prototype.includes` 的实例方法，可以编译 `Array.from`, `Object.assgin`，以及 `Promise`，`Set` 等

example

```json
// .babelrc
{
    "plugins": [
        [
            "transform-runtime",
            {
                "helpers": true,
                "polyfill": true,
                "regenerator": true,
                "moduleName": "babel-runtime"
            }
        ]
    ]
}
```

### Options

#### helpers

是否将内联 babel helpers （classCallCheck，extends）替换为对一个独立模块的调用。

example

```js
// source code
export class Person {
    constructor() {
        this.name = 'Patrick'
    }
    tellName() {
        console.lpg(this.name)
    }
}


export class Boy {

}
```

out

```js
// without helpers
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Person = function () {
    function Person() {
        _classCallCheck(this, Person);

        this.name = 'Patrick';
    }

    _createClass(Person, [{
        key: 'tellName',
        value: function tellName() {
            console.lpg(this.name);
        }
    }]);

    return Person;
}();

var Boy = function Boy() {
    _classCallCheck(this, Boy);
};
```

```js
// use helpers
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(433);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(434);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);


var Person = function () {
    function Person() {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Person);

        this.name = 'Patrick';
    }

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Person, [{
        key: 'tellName',
        value: function tellName() {
            console.lpg(this.name);
        }
    }]);

    return Person;
}();

var Boy = function Boy() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Boy);
};
```

在这个例子中，使用 Helpers 的代码反而会增加，因为在里面还有使用其他的一些基础模块。不过，在一个应用中，使用 helpers 可以优化大量重复代码，因为会将其放在一个模块去调用。
