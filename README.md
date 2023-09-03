# test-reveal-on-next

This is a simple application that allows the incorporation of a [Reveal.js](https://revealjs.com/) presentation into a [NextJS](https://nextjs.org/) / [React](https://react.dev/) application.

## Test this app

```bash
npm run dev
```

## Developer notes

The following notes outline an approach to developing a Next/React application that incorporates a Reveal presentation.

### Install node and npx

```bash
brew install node
npm install -g npx
```

### Create the app

```bash
npx create-next-app@latest
```

### Install `reveal.js`

There are a few react-reveal packages that wrap Reveal for React/Next applications, but they're a little out of date now (the latest was last updated 3 years ago), and aren't really suited to Next or server-side rendering without some extra work.

Install `reveal.js` directly:

```bash
npm install reveal.js
```

### Create a presentation component

**See `components/presentation.tsx`**

`reveal.js` will only run in a browser environment, as it needs access to client specific javascript objects, such as `navigator`. It also needs to be able to see the `div` elements with `reveal` and `slides` CSS classes, as soon as it is created. This code forces Next to only invoke it in a browser...

This is an invocation for Next - telling it that the component needs client-side rendering:

```tsx
'use client';
``` 

`Reveal` is only initialized inside a `useEffect` - which is called when the page and divs are ready:

```tsx
useEffect(() => {
    const deck = new Reveal({ embedded: true, plugins: [ Markdown ]});
    deck.initialize();
}, []);
```

The `embedded` option is set to true - and this helps to incorporate other elements into the presentation.

### Modify `globals.css`

**See: `app/globals.css`**

The global CSS has been simplified and adjusted to help fit the presentation to the page. If you are using another framework, such as [MUI](https://mui.com/), you may need to solve this another way.

Here, you can see that `margin` and `padding` on `html` and `body` have been zeroed. This removes any whitespace around the edges of the page.

`body` has also been set to `display: flex` (in column direction), which will allow us to resize the presentation to fit below any layout above it.

### Import the presentation component

**See: `app/slides/page.tsx`**

`dynamic` is used to import the `Presentation` element dynamically, with `ssr: false` to prevent server-side rendering.

The `Presentation` element is provided with child elements that contain the content to display. This allows the rendering of different content for different pages.
