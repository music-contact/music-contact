const audios = [...document.getElementsByTagName('audio')]
// console.log('script audios > ', audios)
audios.forEach(audio => {
  audio.volume = 0.2
})