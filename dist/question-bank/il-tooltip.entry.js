import { r as registerInstance, h } from './index-b342e128.js';

const ilTooltipCss = "@import url(\"https://fonts.googleapis.com/css2?family=Karla:wght@200;300;400;500;600;700;800&display=swap\"); *{margin:0;padding:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.il-tooltip-info{position:absolute;color:#ccc;display:inline-block;margin-left:5px;z-index:1}.il-tooltip-info:hover .tooltip-text{display:block}.il-tooltip-info .tooltip-text{display:none;background-color:#000;color:#fff;border-radius:6px;padding:0px 10px 5px 5px;z-index:1;margin-left:10px;position:relative;top:-28px;left:19px;word-break:break-word}.il-tooltip-info .tooltip-text .icon{position:relative;left:-16px;color:#000;font-size:20px}";

const IlTooltip = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.tooltip = undefined;
  }
  render() {
    return (h("span", { class: "il-tooltip-info" }, "\u24D8", h("span", { class: "tooltip-text" }, h("span", { class: "icon" }, "\u25C4"), this.tooltip)));
  }
};
IlTooltip.style = ilTooltipCss;

export { IlTooltip as il_tooltip };

//# sourceMappingURL=il-tooltip.entry.js.map