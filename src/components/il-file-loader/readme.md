# il-file-loader



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description | Type      | Default     |
| ------------------ | -------------------- | ----------- | --------- | ----------- |
| `checkboxText`     | `checkbox-text`      |             | `string`  | `undefined` |
| `error`            | `error`              |             | `string`  | `undefined` |
| `fileResponseList` | `file-response-list` |             | `any`     | `undefined` |
| `isShowCheckbox`   | --                   |             | `Boolean` | `undefined` |
| `label`            | `label`              |             | `string`  | `undefined` |
| `readOnly`         | `read-only`          |             | `boolean` | `undefined` |
| `required`         | --                   |             | `Boolean` | `undefined` |
| `selectedValue`    | `selected-value`     |             | `any`     | `undefined` |
| `tooltip`          | --                   |             | `String`  | `undefined` |


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
  il-file-loader --> il-tooltip
  question-bank --> il-file-loader
  style il-file-loader fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
