"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _web = require("web3");

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _this = undefined;

var web3 = new _web2.default(window.web3.currentProvider);

window.addEventListener("load", (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!window.ethereum) {
            _context.next = 11;
            break;
          }

          window.web3 = new _web2.default(window.ethereum);
          _context.prev = 2;
          _context.next = 5;
          return window.ethereum.enable();

        case 5:
          _context.next = 9;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](2);

        case 9:
          _context.next = 12;
          break;

        case 11:
          // Legacy dapp browsers...
          if (window.web3) {
            window.web3 = new _web2.default(web3.currentProvider);
          }
          // Non-dapp browsers...
          else {
              console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
            }

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, _this, [[2, 7]]);
})));

exports.default = web3;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtL3dlYjMuanMiXSwibmFtZXMiOlsiV2ViMyIsIndlYjMiLCJ3aW5kb3ciLCJjdXJyZW50UHJvdmlkZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiZXRoZXJldW0iLCJlbmFibGUiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUDs7Ozs7Ozs7QUFFQSxJQUFNLE9BQU8sQUFBSSxBQUFKLGtCQUFTLE9BQU8sQUFBUCxLQUFZLEFBQXJCLEFBQWI7O0FBRUEsT0FBTyxBQUFQLGlCQUF3QixBQUF4QixpRkFBZ0MsbUJBQUE7Z0VBQUE7Y0FBQTt1Q0FBQTthQUFBO2VBRTFCLE9BQU8sQUFGbUIsVUFBQTs0QkFBQTtBQUFBO0FBRzVCOztpQkFBTyxBQUFQLE9BQWMsQUFBSSxBQUFKLGtCQUFTLE9BQU8sQUFBaEIsQUFBZCxBQUg0QjswQkFBQTswQkFBQTtpQkFNcEIsT0FBTyxBQUFQLFNBQWdCLEFBQWhCLEFBTm9COzthQUFBOzBCQUFBO0FBQUE7O2FBQUE7MEJBQUE7MENBQUE7O2FBQUE7MEJBQUE7QUFBQTs7YUFXOUI7QUFDSztjQUFJLE9BQU8sQUFBWCxNQUFpQixBQUNwQjttQkFBTyxBQUFQLE9BQWMsQUFBSSxBQUFKLGtCQUFTLEtBQUssQUFBZCxBQUFkLEFBQ0Q7QUFDRDtBQUhLO2VBSUEsQUFDSDtzQkFBUSxBQUFSLElBQVksQUFBWixBQUNEO0FBbEI2Qjs7YUFBQTthQUFBOzBCQUFBOztBQUFBOzBCQUFBO0FBQWhDLEFBcUJBOztrQkFBZSxBQUFmIiwiZmlsZSI6IndlYjMuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvc3BvbmdlYm9iL3NvbGlkaXR5X2Rldi9TbWFydCBDb250cmFjdHMvQ291cnNlIFByYWN0aWNlcy9raWNrc3RhcnRlci9raWNrc3RhcnRlcl9jb250cmFjdCJ9