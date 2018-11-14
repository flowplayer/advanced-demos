# (cloud-hosted) Flowplayer Native & SPA Architectures

This demo will walk you through some basic concepts on how to integrate (cloud-hosted) Flowplayer Native with your SPA framework.

[demo page](https://flowplayer.github.io/advanced-demos/cloud-spa/)

## Tech

1. [flowplayer](https://flowplayer.com) as our video player
2. [mithril.js](https://mithril.js.org) as our SPA framework
3. [parcel](https://github.com/parcel-bundler/parcel) as our development toolchain

## How to run this demo?

```bash
npm install && npm start
```

Then navigate to `http://localhost:1234`

## Details / Player

Using a cloud-hosted Flowplayer Native player in your SPA is fully supported out-of-the-box, 
but requires a bit more setup and teardown than your standard static HTML page.

Nearly all modern SPA frameworks have the concept of lifecycles, and what to do when a component
is torn down, so that external dependencies can be safely cleaned up.

In Flowplayer Native we expose the `player.destroy()` method.  It is important that when your SPA destroys a view containing
a player that this method is called so that the player can internally clean up any unsafe references that may have been accrued.

## Special Considerations

Since we are loading the flowplayer assets via a cloud-hosted player, we must also subscribe to the internal loader that the cloud-hosted players
use to parallelize the loading of asssets.  

There is a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) for this loading of subresources
available at `flowplayer.cloud` to allow you to easily do this.

