const chapter = (idx) => {
  let startTime = minutes(10) * idx
  // must be finite number
  if (startTime == 0) startTime = startTime + 0.1

  const endTime = startTime + minutes(10) - 1

  const chapter_number = idx + 1
  
  return { startTime, endTime
         , id          : `chapter-${chapter_number}`
         , title       : `Chapter ${chapter_number}`
         , description : `Some details about Chapter ${chapter_number}`
         }
}

const minutes = 
  n => n * 60

export const All = 
  Array.from({length: 11}, (_, idx)=> chapter(idx))

export const ById = All.reduce((lookup, chapter)=> Object.assign(lookup, 
  {[chapter.id]: chapter}))

export const find_by_hash = hash => ById[hash.slice(1)]