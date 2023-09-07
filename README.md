# test-reveal-on-next

This is a simple application that allows the incorporation of a [Reveal.js](https://revealjs.com/) presentation into a [NextJS](https://nextjs.org/) / [React](https://react.dev/) application.

- NextJS / React web app
- Incoroporates Reveal slides as content
- HTML content is loaded from a remote (or local) URL
- React element inside the HTML content can be created as needed
- Slide show can be multiplexed between controller and clients

Multiplexing allows the controller to update all the clients as it moves through the presentation. Effectively, they follow along...

![](docs/images/multiplexing-slides-1-and-2.gif)

## Test this app

If you've just cloned the repository, you probably need to install the node packages:

```bash
npm install
```

Now you can launch the development server:

```bash
npm run dev
```

It'll serve the application at: [localhost:3000](http://localhost:3000)

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

**See `components/Presentation.tsx`**

`reveal.js` will only run in a browser environment, as it needs access to client specific javascript objects, such as `navigator`. It also needs to be able to see the `div` elements with `reveal` and `slides` CSS classes, as soon as it is created. This code forces Next to only invoke it in a browser...

This is an invocation for Next - telling it that the component needs client-side rendering:

```tsx
"use client";
<<<<<<< HEAD
```

`Reveal` is only initialized inside a `useEffect` - which is called when the page and divs are ready:

```tsx
useEffect(() => {
  const deck = new Reveal({ embedded: true, plugins: [Markdown] });
  deck.initialize();
}, []);
=======
>>>>>>> experimental-content-retrieval
```

`Reveal` is only created inside a `useEffect` - which is called when the page and divs are ready.

The `embedded` option is set to true - and this helps to incorporate other layout and elements alongside the presentation. As the presentation no longer automatically fills the page, the `reveal` `div` will need to have its size specified in CSS...

_NB. The configuration also includes multiplex information and dependencies. See below for more information._

`Reveal` is only initialised once the content inside the presentation is ready. See below for details of how the content is retrieved and rendered.

### Modify `globals.css`

**See: `app/globals.css`**

The global CSS has been simplified and adjusted to help fit the presentation to the page. If you are using another framework, such as [MUI](https://mui.com/), you may need to solve this another way.

Here, you can see that `margin` and `padding` on `html` and `body` have been zeroed. This removes any whitespace around the edges of the page.

`body` has also been set to `display: flex` (in column direction), which will allow us to resize the presentation to fit below any layout above it.

### Import the presentation component

**See: `app/slides/page.tsx`**

`dynamic` is used to import the `Presentation` element dynamically, with `ssr: false` to prevent server-side rendering.

## Remote content

The `Presentation` element has a `src` parameter, and this is passed to an internal `PresentationContent` element which uses the [SWR](https://swr.vercel.app/) library to fetch the content. This content is then enriched (React elements are created where needed inside it), and then rendered inside the `Presentation`.

### Dynamically creating React elements

Some of the content is regular HTML, but some of the elements are React components. There are a number of packages that might help us convert the HTML and manage React components:

| Library                                                                  | Last updated |
| ------------------------------------------------------------------------ | ------------ |
| [html-react-parser](https://www.npmjs.com/package/html-react-parser)     | recently     |
| [html-to-react](https://www.npmjs.com/package/html-to-react)             | recently     |
| ~~[react-html-parser](https://www.npmjs.com/package/react-html-parser)~~ | 6 years ago  |

Install `html-react-parser`

```bash
npm install html-react-parser
```

**NB.** `html-react-parser` is simple to use, but not XSS-safe, and should be used with caution. `PresentationContent` manages replacement of individual React elements by type:

```tsx
const options = {
  replace: (domNode: any) => {
    if (domNode instanceof Element && domNode.attribs) {
      switch (domNode.tagName) {
        case "question":
          console.log("Enriching question tag...");
          let question = domNode.attribs["question"];
          let explanation = domNode.attribs["explanation"];
          let instruction = domNode.attribs["instruction"];
          if (question && explanation && instruction) {
            return (
              <Question
                question={question}
                explanation={explanation}
                instruction={instruction}
              />
            );
          }
          break;
      }
    }
  },
};
```

## Multiplexing

Multiplexing allows a controller presentation to send its state to client presentations on other devices (ie. to allow them to follow along).

There are 3 components:

- Any number of client presentations
- A controller\* presentation, with the same slides
- A socket.io based server that passes messages between the various presentations

_\*Sometimes referred to as a master presentation._

### The server

This demo uses the server at: https://reveal-multiplex.glitch.me/

```tsx
const SOCKET_IO_SERVER = "https://reveal-multiplex.glitch.me/";
```

- To test locally, you could also run your own server.
- A production system should host its own server.
- See: [reveal/multiplex](https://github.com/reveal/multiplex)

### Client and controller

Install the multiplex plugin:

```bash
npm install reveal-multiplex
```

The Presentation component in `presentation.tsx` accepts several parameters:

- `secret` (a secret to permit control, or `null` if acting as the client)
- `id` (the id of the presentation)
- `role` (not currently used)

- To collect a fresh secret and id from the server, visit: https://reveal-multiplex.glitch.me/token

The multiplex plugin is configured during initialization of Reveal:

```tsx
multiplex: {
    secret: secret,
    id: id,
    url: SOCKET_IO_SERVER
},
dependencies: [
    { src: 'https://reveal-multiplex.glitch.me/socket.io/socket.io.js', async: true },
    { src: 'https://reveal-multiplex.glitch.me/master.js', async: true },
    { src: 'https://reveal-multiplex.glitch.me/client.js', async: true },
]
```

Because these dependencies rely on being able to find `Reveal` as a global variable, we also add this, just before initialization:

```tsx
window.Reveal = reveal;
```
