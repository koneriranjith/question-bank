# il-notes



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute        | Description | Type      | Default     |
| ---------------- | ---------------- | ----------- | --------- | ----------- |
| `checkboxText`   | `checkbox-text`  |             | `string`  | `undefined` |
| `error`          | `error`          |             | `string`  | `undefined` |
| `isShowCheckbox` | --               |             | `Boolean` | `undefined` |
| `label`          | `label`          |             | `string`  | `undefined` |
| `notes`          | `notes`          |             | `string`  | `undefined` |
| `readOnly`       | `read-only`      |             | `boolean` | `undefined` |
| `required`       | --               |             | `Boolean` | `undefined` |
| `selectedValue`  | `selected-value` |             | `any`     | `undefined` |
| `tooltip`        | --               |             | `String`  | `undefined` |


## Events

| Event          | Description | Type                   |
| -------------- | ----------- | ---------------------- |
| `valueChanged` |             | `CustomEvent<Boolean>` |


## Dependencies

### Used by

 - [question-bank](../question-bank)

### Depends on

- [il-tooltip](../il-tooltip)

### Graph
```mermaid
graph TD;
  il-notes --> il-tooltip
  question-bank --> il-notes
  style il-notes fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
