
import m        from "mithril"
import video    from "./mocks/video"
import * as Chapters from "./mocks/chapters"
const None  = {}
const State = {active_chapter: None}

const player = flowplayer("#player", 
  { ...video
  , preload   : "metadata"
  , cuepoints : Chapters.All
  })

player.on(flowplayer.events.CUEPOINT_START, e => {
  State.active_chapter = e.data.cuepoint
  console.log(e.type, State.active_chapter)
  m.redraw()
})

const seek_to_chapter = chapter => {
  if (State.active_chapter == chapter) return 
  if (player.readyState < 1) return player.setOpts({start_time: chapter.startTime})
  player.currentTime = chapter.startTime
}

const on_navigation = (chapter) => {
  history.pushState(chapter, chapter.title, "#" + chapter.id)
  document.title = chapter.title
  seek_to_chapter(chapter)
  return false
}

const ChapterNavigation = chapter => {
  return { href    : chapter.id
         , onclick : on_navigation.bind(0, chapter)
         , class   : State.active_chapter.id == chapter.id ? "active" : ""
         , id      : chapter.id 
         }
}

const Chapter = chapter => {
  return m("li", 
    m("a", ChapterNavigation(chapter), 
      [ m("span.title", chapter.title)
      , m("span.description", chapter.description)
      ]))
}

const ChapterList = ()=> m("ol", Chapters.All.map(Chapter))

m.mount(
  document.getElementById("chapters"), {view: ChapterList})

window.App = {State, player, Chapters}
// add support for History
window.addEventListener("popstate", e => seek_to_chapter(e.state))
// add support for deep links
if (document.location.hash) {
  const chapter = Chapters.find_by_hash(document.location.hash)
  console.log("deep_link(%o)", chapter)
  seek_to_chapter(chapter)
}