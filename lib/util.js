"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._readFile = exports._filterVersion = void 0;
const fs = __importStar(require("fs"));
function _filterVersion(stdmsg) {
    const cliVersion = stdmsg.match('(\\d+\\.)(\\d+\\.)(\\d+)');
    if (cliVersion)
        return cliVersion[0];
    else
        return '0.0.0';
}
exports._filterVersion = _filterVersion;
function _readFile(path, usrOpts) {
    const opts = {
        encoding: 'utf8',
        lineEnding: '\n'
    };
    Object.assign(opts, usrOpts);
    return new Promise((resolve, reject) => {
        const rs = fs.createReadStream(path, { encoding: opts.encoding });
        let acc = '';
        let pos = 0;
        let index;
        rs
            .on('data', chunk => {
            index = chunk.indexOf(opts.lineEnding);
            acc += chunk;
            if (index === -1) {
                pos += chunk.length;
            }
            else {
                pos += index;
                rs.close();
            }
        })
            .on('close', () => resolve(acc.slice(acc.charCodeAt(0) === 0xFEFF ? 1 : 0, pos)))
            .on('error', err => reject(err));
    });
}
exports._readFile = _readFile;
;
//# sourceMappingURL=util.js.map