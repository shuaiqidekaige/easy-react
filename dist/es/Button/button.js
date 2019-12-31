import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React from 'react';

var Button =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Button, _React$Component);

  function Button() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Button.prototype;

  _proto.render = function render() {
    return React.createElement("div", null, "2");
  };

  return Button;
}(React.Component);

export default Button;