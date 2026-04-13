# Empty Angular Host App - <ai-chat-box> Web Component Integration

## Overview

This is a simple Angular application that demonstrates embedding a React-built web component (`<ai-chat-box>`) into an Angular host using the `r2wc` (React to Web Component) library.

The React component is compiled into a standalone JavaScript file (`ai-chat-box.es.js`) that registers a custom element. The Angular app simply loads this file and uses the custom element tag in its template — no React installation required.

## How It Works

- index.html loads Meridian CDN scripts (web components)
- index.html loads ai-chat-box.es.js (registers <ai-chat-box> custom element)
- app.html uses <ai-chat-box> with Angular
- app.ts provides props and listens for custom events

## Files Changed / Added

### `public/ai-chat-box.es.js`

- **Added**: The compiled React web component bundle
- Built using `r2wc` library which wraps a React component as a native web component
- Contains React, React-DOM, styles, and component logic (all bundled)
- Registers `<ai-chat-box>` as a custom element in the browser
- **No React installation needed in Angular — everything is self-contained in this file**

### `src/app/mockMessage.json`

- **Added**: Mock data representing an AI response message
- Passed into the `<ai-chat-box>` component via the `apiEndpoint` prop
- Matches the `Message` type expected by the chatbox component
- Specific to mock response **ANYTHING CAN BE A RESPONSE**

### `src/app/app.html`

- **Changed**: Added the `<ai-chat-box>` custom element
- Uses Angular property binding to pass props:
  - `[isLoggedIn]` - boolean to control login state
  - `[models]` - array of available AI models
  - `[apiEndpoint]` - mock message response data

### `src/app/app.ts`

- **Changed**: Added component logic for the web component
  - Added `CUSTOM_ELEMENTS_SCHEMA` so Angular allows unknown custom elements
  - Added `ViewChild` reference to the `<ai-chat-box>` element
  - Added `AfterViewInit` lifecycle hook to attach custom event listeners
  - Defined props (`isLoggedIn`, `models`, `apiEndpoint`) to pass into the web component
  - Listens for `ai-chat-message-sent` custom event from the web component

### `src/index.html`

- **Changed**: Added Meridian CDN scripts and stylesheets
  - Meridian CSS (`base.css`) for web component styling
  - Meridian JS (`web.js`, `index.js`) to register Meridian web components (`<mds-button>`, `<mds-empty-state>`, etc.)
  - `<script>` tag to load `ai-chat-box.es.js`

### `package.json`

- **No relevant changes** — no React or Meridian packages installed

## Key Concepts

### Meridian CDN

The React chatbox component uses Meridian web components internally (e.g., `<mds-button>`, `<mds-dropdown-menu>`). These must be registered in the browser before the chatbox renders. The CDN scripts handle this registration globally. For future use, registration likely not required as environments already have Meridian web components registered.

### React Dependencies

React and React-DOM are bundled inside `ai-chat-box.es.js`. The Angular host does not need to install or know about React at all.

### CUSTOM_ELEMENTS_SCHEMA

Angular does not recognize custom HTML elements by default. Adding `CUSTOM_ELEMENTS_SCHEMA` tells Angular to allow unknown elements like `<ai-chat-box>` without throwing errors.

### Custom Events

The web component emits custom events (e.g., `ai-chat-message-sent`) that Angular can listen to using standard `addEventListener` on the element reference.

## Local Installation

Follow these steps to run on a local development server.

### Prerequisites

- Node.js
- npm (included with Node.js)

```bash
# Clone the repository
git clone https://github.com/moonchoe-8451/poc_react_webcomponent_aiplatform_MOCK_HOST.git
cd poc_react_webcomponent_aiplatform_MOCK_HOST

# Install dependencies
npm install

# Start the dev server
npm start

# Open browser
http://localhost:4200
```
