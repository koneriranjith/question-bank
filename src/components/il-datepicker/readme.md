# il-datepicker



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type      | Default     |
| ------------- | ------------- | ----------- | --------- | ----------- |
| `dateFormat`  | --            |             | `String`  | `undefined` |
| `error`       | `error`       |             | `string`  | `undefined` |
| `label`       | `label`       |             | `string`  | `undefined` |
| `mask`        | `mask`        |             | `any`     | `undefined` |
| `placeholder` | `placeholder` |             | `string`  | `undefined` |
| `readOnly`    | `read-only`   |             | `boolean` | `undefined` |
| `required`    | `required`    |             | `boolean` | `undefined` |
| `tooltip`     | --            |             | `String`  | `undefined` |
| `value`       | `value`       |             | `string`  | `undefined` |


## Events

| Event          | Description | Type                  |
| -------------- | ----------- | --------------------- |
| `valueChanged` |             | `CustomEvent<string>` |


## Dependencies

### Used by

 - [il-beneficiary](../il-beneficiary)
 - [question-bank](../question-bank)

### Depends on

- [il-tooltip](../il-tooltip)

### Graph
```mermaid
graph TD;
  il-datepicker --> il-tooltip
  il-beneficiary --> il-datepicker
  question-bank --> il-datepicker
  style il-datepicker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
