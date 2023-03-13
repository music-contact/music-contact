const audios = [...document.getElementsByTagName('audio')]
// console.log('script audios > ', audios)

function pause(audios) {
  audios.forEach(audio => {
    audio.pause()
  })
}

audios.forEach(audio => {
  audio.volume = 0.2
  audio.addEventListener('play', (ev) => {
    const pauseAudios = audios.filter(audio => audio.currentSrc != ev.target.currentSrc)
    pause(pauseAudios)
    // console.log('ev > ', ev)
  })
})