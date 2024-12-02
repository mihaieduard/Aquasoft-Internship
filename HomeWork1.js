var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// 1.1 
var person = {
    name: "Alice",
    greet: function () {
        console.log("Hello, my name is ".concat(this.name, "!"));
    }
};
person.greet(); // Output: Hello, my name is Alice!
// 1.2
var x = 10;
var y = 20;
var z = 30;
// Reatribuirile
x = 15; // OK
y = 25; // OK
// z = 35; // Error: Assignment to constant variable
// Redeclarări
var x = 50; // OK
// let y = 40; // Error: Identifier 'y' has already been declared
// 1.3
// Arrays
var arr1 = [1, 2, 3];
var arr2 = __spreadArray(__spreadArray([], arr1, true), [4, 5], false); // [1, 2, 3, 4, 5]
// Objects
var obj1 = { a: 1, b: 2 };
var obj2 = __assign(__assign({}, obj1), { c: 3 }); // { a: 1, b: 2, c: 3 }
// 1.4
var obj = { a: 1, b: 2 };
// Iterare
for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
        console.log("".concat(key, ": ").concat(obj[key]));
    }
}
// Copiere
var shallowCopy = __assign({}, obj); // Shallow copy
function deepCopy(o) {
    return JSON.parse(JSON.stringify(o)); // Deep copy
}
// 1.5
var numbers = [1, 2, 3, 4, 5];
// Accessor
var sliced = numbers.slice(1, 3); // [2, 3]
// Iterare
numbers.forEach(function (num) { return console.log(num); }); // Logs each number
var doubled = numbers.map(function (num) { return num * 2; }); // [2, 4, 6, 8, 10]
// Mutator
numbers.push(6); // [1, 2, 3, 4, 5, 6]
numbers.splice(2, 1); // [1, 2, 4, 5, 6]
numbers.splice(2, 2); // [1, 2, 5, 6]
// numbers.forEach(num => console.log(num)); // Logs each number
// 1.6
// Callback
function fetchData(callback) {
    setTimeout(function () { return callback("Data fetched!"); }, 1000);
}
fetchData(function (data) { return console.log(data); });
// Promise
var fetchPromise = new Promise(function (resolve, reject) {
    setTimeout(function () { return resolve("Promise resolved!"); }, 1000);
});
fetchPromise.then(function (data) { return console.log(data); });
// 1.7
function fetchDataAsync() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(function () { return resolve("Async data!"); }, 1000); })];
                case 1:
                    data = _a.sent();
                    console.log(data);
                    return [2 /*return*/];
            }
        });
    });
}
fetchDataAsync();
// 1.8
function counter() {
    console.log("Script running...");
    var count = 0;
    return function () { return ++count; };
}
var myCounter = counter();
console.log(myCounter()); // 1
console.log(myCounter()); // 2
// 1.9
