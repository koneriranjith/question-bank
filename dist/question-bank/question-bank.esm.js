import { B as BUILD, c as consoleDevInfo, H, d as doc, N as NAMESPACE, p as promiseResolve, b as bootstrapLazy } from './index-b342e128.js';
export { s as setNonce } from './index-b342e128.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

/*
 Stencil Client Patch Browser v4.0.1 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    // NOTE!! This fn cannot use async/await!
    if (BUILD.isDev && !BUILD.isTesting) {
        consoleDevInfo('Running in development mode.');
    }
    if (BUILD.cloneNodeFix) {
        // opted-in to polyfill cloneNode() for slot polyfilled components
        patchCloneNodeFix(H.prototype);
    }
    if (BUILD.profile && !performance.mark) {
        // not all browsers support performance.mark/measure (Safari 10)
        // because the mark/measure APIs are designed to write entries to a buffer in the browser that does not exist,
        // simply stub the implementations out.
        // TODO(STENCIL-323): Remove this patch when support for older browsers is removed (breaking)
        // @ts-ignore
        performance.mark = performance.measure = () => {
            /*noop*/
        };
        performance.getEntriesByName = () => [];
    }
    // @ts-ignore
    const scriptElm = BUILD.scriptDataOpts
        ? Array.from(doc.querySelectorAll('script')).find((s) => new RegExp(`\/${NAMESPACE}(\\.esm)?\\.js($|\\?|#)`).test(s.src) ||
            s.getAttribute('data-stencil-namespace') === NAMESPACE)
        : null;
    const importMeta = import.meta.url;
    const opts = BUILD.scriptDataOpts ? (scriptElm || {})['data-opts'] || {} : {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};
const patchCloneNodeFix = (HTMLElementPrototype) => {
    const nativeCloneNodeFn = HTMLElementPrototype.cloneNode;
    HTMLElementPrototype.cloneNode = function (deep) {
        if (this.nodeName === 'TEMPLATE') {
            return nativeCloneNodeFn.call(this, deep);
        }
        const clonedNode = nativeCloneNodeFn.call(this, false);
        const srcChildNodes = this.childNodes;
        if (deep) {
            for (let i = 0; i < srcChildNodes.length; i++) {
                // Node.ATTRIBUTE_NODE === 2, and checking because IE11
                if (srcChildNodes[i].nodeType !== 2) {
                    clonedNode.appendChild(srcChildNodes[i].cloneNode(true));
                }
            }
        }
        return clonedNode;
    };
};

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy([["il-tooltip",[[0,"il-tooltip",{"tooltip":[16]}]]],["il-beneficiary",[[0,"il-beneficiary",{"label":[1537],"value":[1537],"tooltip":[16],"error":[1],"required":[4],"customColumns":[16],"maxLength":[2,"max-length"],"minLength":[2,"min-length"],"questionId":[2,"question-id"],"blurUpdateAnswerType":[16],"beneficiaries":[32],"formData":[32]}]]],["il-address",[[0,"il-address",{"label":[1537],"value":[1544],"tooltip":[16],"error":[1],"readOnly":[4,"read-only"],"apiBaseUrl":[1,"api-base-url"],"required":[4],"carrierAuthorization":[1,"carrier-authorization"],"placeholder":[16],"dropdown":[32],"options":[32],"searchQuery":[32],"isOpen":[32],"getOptions":[64],"debouncedMethod":[64]},[[8,"click","handleClickOutside"]]]]],["il-combobox",[[0,"il-combobox",{"options":[16],"value":[1],"label":[1],"error":[1],"readOnly":[4,"read-only"],"placeholder":[1],"required":[16],"tooltip":[16],"isDefault":[16],"isOpen":[32],"dropdown":[32],"inputValue":[32],"newOption":[32]},[[8,"click","handleClickOutside"]]]]],["il-notes",[[0,"il-notes",{"selectedValue":[8,"selected-value"],"notes":[1],"isShowCheckbox":[16],"checkboxText":[1,"checkbox-text"],"readOnly":[4,"read-only"],"label":[1],"required":[16],"error":[1],"tooltip":[16]}]]],["il-dropdown",[[0,"il-dropdown",{"options":[16],"value":[1],"label":[1],"error":[1],"readOnly":[4,"read-only"],"placeholder":[1],"required":[16],"tooltip":[16],"isDefault":[16],"isOpen":[32],"dropdown":[32]},[[8,"click","handleClickOutside"]]]]],["il-radio-button",[[0,"il-radio-button",{"options":[16],"selectedValue":[8,"selected-value"],"label":[1],"readOnly":[4,"read-only"],"isDefault":[16],"error":[1],"required":[16],"tooltip":[16]}]]],["il-input",[[0,"il-input",{"label":[1537],"value":[1537],"type":[1],"mask":[8],"questionType":[16],"tooltip":[16],"error":[1],"required":[4],"readOnly":[4,"read-only"],"placeholder":[1],"showPassword":[32]}]]],["question-bank",[[0,"question-bank",{"client":[1],"apiBaseUrl":[1,"api-base-url"],"applicationId":[1,"application-id"],"carrierAuthorization":[1,"carrier-authorization"],"userId":[1,"user-id"],"formId":[1,"form-id"],"singleForm":[4,"single-form"],"isFormValidation":[4,"is-form-validation"],"isErrorInRequiredMessage":[32],"questions":[32],"error":[32],"isStepForm":[32],"stepFormId":[32],"formData":[32],"formErrorMessage":[32],"isLoading":[32],"storeAnswerInQuestion":[64],"debouncedMethod":[64]}]]],["my-multi-select",[[0,"my-multi-select",{"options":[16],"label":[1],"error":[1],"values":[16],"required":[16],"placeholder":[1],"tooltip":[16],"isOpen":[32],"dropdown":[32]},[[8,"click","handleClickOutside"]]]]],["il-file-loader",[[0,"il-file-loader",{"fileResponseList":[8,"file-response-list"],"label":[1],"required":[16],"readOnly":[4,"read-only"],"error":[1],"tooltip":[16],"isShowCheckbox":[16],"checkboxText":[1,"checkbox-text"],"selectedValue":[8,"selected-value"],"selectedIndex":[32]}]]],["il-datepicker",[[0,"il-datepicker",{"label":[1537],"value":[1537],"mask":[8],"tooltip":[16],"error":[1],"required":[4],"readOnly":[4,"read-only"],"dateFormat":[16],"placeholder":[1],"showPassword":[32]}]]],["il-multi-choice",[[0,"il-multi-choice",{"options":[16],"selectedValue":[8,"selected-value"],"label":[1],"required":[16],"isDefault":[16],"readOnly":[4,"read-only"],"error":[1],"tooltip":[16]}]]],["il-textarea",[[0,"il-textarea",{"label":[1537],"value":[1537],"error":[1],"required":[16],"readOnly":[4,"read-only"],"placeholder":[1],"tooltip":[16]}]]]], options);
});

//# sourceMappingURL=question-bank.esm.js.map