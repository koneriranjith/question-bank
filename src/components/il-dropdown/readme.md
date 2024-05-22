# il-dropdown



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type                  | Default     |
| ------------- | ------------- | ----------- | --------------------- | ----------- |
| `error`       | `error`       |             | `string`              | `undefined` |
| `isDefault`   | --            |             | `Object`              | `undefined` |
| `label`       | `label`       |             | `string`              | `undefined` |
| `options`     | --            |             | `HTMLOptionElement[]` | `[]`        |
| `placeholder` | `placeholder` |             | `string`              | `undefined` |
| `readOnly`    | `read-only`   |             | `boolean`             | `undefined` |
| `required`    | --            |             | `Boolean`             | `undefined` |
| `tooltip`     | --            |             | `String`              | `undefined` |
| `value`       | `value`       |             | `string`              | `undefined` |


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
  il-dropdown --> il-tooltip
  il-beneficiary --> il-dropdown
  question-bank --> il-dropdown
  style il-dropdown fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
