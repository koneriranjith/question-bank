# my-multi-select



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type                  | Default     |
| ------------- | ------------- | ----------- | --------------------- | ----------- |
| `error`       | `error`       |             | `string`              | `undefined` |
| `label`       | `label`       |             | `string`              | `undefined` |
| `options`     | --            |             | `HTMLOptionElement[]` | `[]`        |
| `placeholder` | `placeholder` |             | `string`              | `undefined` |
| `required`    | --            |             | `Boolean`             | `undefined` |
| `tooltip`     | --            |             | `String`              | `undefined` |
| `values`      | --            |             | `string[]`            | `[]`        |


## Events

| Event           | Description | Type                    |
| --------------- | ----------- | ----------------------- |
| `valuesChanged` |             | `CustomEvent<string[]>` |


## Dependencies

### Depends on

- [il-tooltip](../il-tooltip)

### Graph
```mermaid
graph TD;
  my-multi-select --> il-tooltip
  style my-multi-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
