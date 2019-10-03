/**
 * this will return a valid `flowplayer()` configuration object
 * more often than not though, you may need to transform your
 * API response
 */
const FAKE_OPTS =
  { poster      : "https://source.unsplash.com/random"
  , title       : "my ovp / fake"
  , description : "this was loaded from a mocked API"
  }

const FAKE_SRC = 
  { src  : ["https://edge.flowplayer.org/starwreck/hls/playlist.m3u8"]
  , opts : FAKE_OPTS
  }
/**
 * a bunch of fake error messages just for illustration
 */
const ERROR_MESSAGES =
  [ "api not available"
  , "media not found"
  , "content not available in your region"
  , "you have reached maximum free views per month"
  ]

/**
 * this is a mock API response from some OVP platform
 * to illustrate the asynchronous loading of data
 */
export const response = ()=> Promise.resolve(Math.random() > 0.2 ? {ok: FAKE_SRC} : {err: fake_error()})
/**
 * get a fake error message just for demonstration purposes
 * because Error handling is **always** important
 */
const fake_error = ()=> ({message: ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)]})