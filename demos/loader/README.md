# Writing A Custom Source Loader Plugin

[demo page](https://flowplayer.github.io/advanced-demos/loader/)

This demo is designed with the purpose of how to write your own custom `Source` extension.  There are several valid use cases for this type of plugin, but the main one we will be focusing on is integration with an external Online Video Platform.

This commonly have a lifecycle like:

1. Make an HTTP request
2. Recieve a response Object that contains information about the actual source
3. Update the player to use the real source

## Necessary Interfaces

All loader plugins must implement a `wants` method and handle when they are called with an [arity of 4](https://en.wikipedia.org/wiki/Arity)

This receives much more attention with inline comments in the code samples.