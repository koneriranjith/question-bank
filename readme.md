[![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)](https://stenciljs.com)

# Installation and usage

The easiest way to use @ilife-tech/question-bank-ilife is to install it from npm

```bash
npm i @ilife-tech/question-bank-ilife --save

Or

yarn add @ilife-tech/question-bank-ilife
```

## Import the component in React Application

import the component in the `App.js` file

```javascript
import { applyPolyfills, defineCustomElements } from '@ilife-tech/question-bank-ilife/loader';
```

## Consume the component

Initialize components in App.js

```javascript
import React, { useEffect } from 'react';
import { applyPolyfills, defineCustomElements } from '@ilife-tech/question-bank-ilife/loader';

function App() {
  useEffect(() => {
    applyPolyfills().then(() => {
      defineCustomElements();
    });
  }, []);

  return <div className="App">...</div>;
}

export default App;
```

## Using component

Now The components should then be available in any of the React Application

You can use it

```html
<question-bank client="" api-base-url="" application-id="" user-id="" form-id="" />
```

## Props

Common props you want to specify include:

- `client` - specify client name (to add which client we are using) this prifix we are using for base html class name for customize the question-bank component styles
- `api-base-url` - base url to get the quesion bank data
- `application-id` - application id is unique identification for client
- `carrier-authorization` - carrier-authorization is required field
- `user-id` - user id is unique identification for user
- `form-id` - form id is unique identification for form data

- `is-form-validation` - if the value is true to check require field validation for the form

- `single-form` - if the value is true we show single form (or) we can avoid the props to render step form

## customize your component style

let's say guardian is client using this component so in client we added 'guardian'

```html
<question-bank client="guardian" api-base-url="" application-id="" user-id="" form-id="" />
```

base class we add the client prifix as guardian, from this class we can add our custorm style

```html
<div class="question-bank question-bank--guardian">...</div>
```

- `question-bank` - existing base class
- `question-bank--guardian` - we can extend or update you custom style with this class

# write your own custom style from this base class "question-bank--guardian"

```scss
.question-bank--guardian {
  background-color: blue;
}
```
