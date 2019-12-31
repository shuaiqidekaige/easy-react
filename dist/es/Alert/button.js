import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React from 'react';

var Alter =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Alter, _React$Component);

  function Alter() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Alter.prototype;

  _proto.render = function render() {
    return React.createElement("div", null, "3");
  };

  return Alter;
}(React.Component);

export default Alter;