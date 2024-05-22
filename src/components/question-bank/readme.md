# question-bank



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute               | Description | Type      | Default     |
| ---------------------- | ----------------------- | ----------- | --------- | ----------- |
| `apiBaseUrl`           | `api-base-url`          |             | `string`  | `undefined` |
| `applicationId`        | `application-id`        |             | `string`  | `undefined` |
| `carrierAuthorization` | `carrier-authorization` |             | `string`  | `undefined` |
| `client`               | `client`                |             | `string`  | `undefined` |
| `formId`               | `form-id`               |             | `string`  | `undefined` |
| `isFormValidation`     | `is-form-validation`    |             | `boolean` | `undefined` |
| `singleForm`           | `single-form`           |             | `boolean` | `undefined` |
| `userId`               | `user-id`               |             | `string`  | `undefined` |


## Methods

### `debouncedMethod(payload: any) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `storeAnswerInQuestion(payload: any) => Promise<any>`



#### Returns

Type: `Promise<any>`




## Dependencies

### Depends on

- [il-input](../il-input)
- [il-textarea](../il-textarea)
- [il-address](../il-address)
- [il-datepicker](../il-datepicker)
- [il-multi-choice](../il-multi-choice)
- [il-notes](../il-notes)
- [il-dropdown](../il-dropdown)
- [il-radio-button](../il-radio-button)
- [il-file-loader](../il-file-loader)
- [il-beneficiary](../il-beneficiary)
- [il-combobox](../il-combobox)

### Graph
```mermaid
graph TD;
  question-bank --> il-input
  question-bank --> il-textarea
  question-bank --> il-address
  question-bank --> il-datepicker
  question-bank --> il-multi-choice
  question-bank --> il-notes
  question-bank --> il-dropdown
  question-bank --> il-radio-button
  question-bank --> il-file-loader
  question-bank --> il-beneficiary
  question-bank --> il-combobox
  il-input --> il-tooltip
  il-textarea --> il-tooltip
  il-address --> il-tooltip
  il-address --> il-input
  il-datepicker --> il-tooltip
  il-multi-choice --> il-tooltip
  il-notes --> il-tooltip
  il-dropdown --> il-tooltip
  il-radio-button --> il-tooltip
  il-file-loader --> il-tooltip
  il-beneficiary --> il-input
  il-beneficiary --> il-textarea
  il-beneficiary --> il-datepicker
  il-beneficiary --> il-multi-choice
  il-beneficiary --> il-dropdown
  il-beneficiary --> il-radio-button
  il-beneficiary --> il-tooltip
  il-combobox --> il-tooltip
  style question-bank fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
