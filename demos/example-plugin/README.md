# Custom Plugins

Building plugins with Flowplayer Native is very easy, all plugins are `Function`s very similar to a middleware pattern from elsewhere in the JavaScript ecosystem.

## Basic Plugins

Basic plugins are of [arity 3](https://en.wikipedia.org/wiki/Arity) or [Ternary](https://en.wikipedia.org/wiki/Ternary_operation).

Almost all basic plugins will begin something like this:

```javascript
function custom_plugin (opts, root, video) {}
```

for those of your that read TypeScript-style type notations, we can say:
```typescript
interface Plugin {
  (opts: Record<string, any>, root : HTMLDivElement, video: HTMLVideoElement): void;
}
```

## Best Practices / Event-based Architecture

All plugins in Flowplayer core are build around an [Event-based Architecture](https://en.wikipedia.org/wiki/Event-driven_architecture) model. The `video` argument is the [Event Bus](https://en.wikipedia.org/wiki/Message_broker) for all of our Event-Based Architecture 

The benefits for this design are many but a few key points are:
1. progressively enhancive as plugins can consume events without caring if a peer plugin exists or not. 
2. browsers have decades of performance optimizations around efficiently dispatching events
3. error-resilience

Strictly-speaking, each plugin should define a Dictionary of its own events.

## Best Practices / Configuration

It is best practice to namespace your plugin's configuration:

```javascript
flowplayer("#player", {my_custom_plugin: {...custom_opts}})
```

**Always** prefer explicitness over magic, mode IDE's with autocomplete make it trivial to tab-complete most longer names, and you can always alias them to something shorter if you prefer once you are inside of your plugin context.

Bad Behavior:

```javascript
function custom_plugin (opts, root, video) {
  // dangerous lookup, bad configuration namespace
  var k = opts.cp.api_key
}
```

Good behavior:

```javascript
function custom_plugin (opts, root, video) {
  var config = opts.custom_plugin
  // return early if we should only run this plugin when it is configured properly
  if ("object" !== typeof config) {
    return console.warn("plugin(:custom_plugin) was not configured correctly", config)
  }
}
```

## Unsafe References

Quite often it is useful to cache DOM lookups and maintain unsafe references, however the next logical question is then how to know when to free those references since in SPAs they can accrue and crash a browser tab over a long-lived session.

For this we have the `REAP` event, which plugins can listen to to know that it is now safe to prune those references.

These is a detailed example in the codebase here.

## Configuration Is Reactive

Configuration is not a static object inside of a Player instance, it can change over time.  This was an intentional design decision made for performance reasons, as it allows each plugin to run only subsets of code without destroying and recreating a player everytime we want to update a player's state.

This allows for a player to evolve over time and each plugin to react appropriately by subscribing to the `flowplayer.events.CONFIG` event.

```javascript
function custom_plugin (opts, root, video) {
  video.on(flowplayer.events.CONFIG, function () {
    // opts was updated and we should do something 
    // with the new changes if necessary
  })
}
```

The rest of the code in this directory is here to help you grok these concepts, please open any issues for anything found to be unclear.

The goal of this example will be how to implement a dummy analytics plugin for an **imaginary** service called [Munin](https://en.wikipedia.org/wiki/Huginn_and_Muninn).