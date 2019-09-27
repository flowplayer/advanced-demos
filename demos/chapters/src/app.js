
import m        from "mithril"
import video    from "./mocks/video"
import chapters from "./mocks/chapters"
const None  = {}
const State = {active_chapter: None}

const player = flowplayer("#player", 
  { ...video
  , preload: "metadata"
  , cuepoints: chapters
  })

player.on(flowplayer.events.CUEPOINT_START, e => {
  State.active_chapter = e.data.cuepoint
  console.log(e.type, State.active_chapter)
  m.redraw()
})

const seek_to_chapter = chapter => {
  if (State.active_chapter == chapter) return 
  if (player.readyState < 1) return player.setOpts({start_time: chapter.startTime})
  console.log("startTime", chapter.startTime)
  player.currentTime = chapter.startTime
}

const ChapterState = chapter => {
  return { onclick: seek_to_chapter.bind(0, chapter)
         , class: State.active_chapter.id == chapter.id ? "active" : ""
         , id: chapter.id 
         }
}

const Chapter = chapter => {
  return m("li", ChapterState(chapter), 
    [ m("span.title", chapter.title)
    , m("span.description", chapter.description)
    ])
}

const ChapterList = ()=> m("ol", chapters.map(Chapter))

m.mount(
  document.getElementById("chapters"), {view: ChapterList})

window.App = {State, player}