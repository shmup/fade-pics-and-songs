((document) => {
  const $ = x => document.querySelector(x);
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const frame = $('.wrapper'), content = $('.content');
  let picIndex = 0, songIndex = 0;

  const renderPics = pics => {
    frame.style.backgroundImage = `url('pics/${pics[picIndex]}')`
    document.title = pics[picIndex];

    setInterval(() => {
      picIndex = picIndex+1 > pics.length-1 ? 0 : picIndex+1;
      frame.style.backgroundImage = `url('pics/${pics[picIndex]}')`;
      document.title = pics[picIndex];
    }, 3000);
  };

  const renderAudioPlayer = songs => {
    const player = new Audio(`songs/${songs[songIndex]}`);
    player.controls = true;

    player.addEventListener('ended',function(){
      songIndex = songIndex+1 > songs.length-1 ? 0 : songIndex+1;
      player.src = `songs/${songs[songIndex]}`
      player.pause();
      player.load();
      player.play();

      console.debug(songs[songIndex], songs, songIndex);
    });

    player.addEventListener('error', e => {
      console.debug(e);
      console.debug(songs);
      console.debug(songIndex);
    });

    content.append(player);
  }

  const run = (pics, songs) => {
    renderPics(pics);
    renderAudioPlayer(songs);
  }

  fetch('data.json')
    .then(resp => resp.json())
    .then(media => {
      const {pics, songs} = media;

      console.debug('LOADED');
      console.debug(Object.values(media).map(v => v.join('\n')).join('\n'));

      run(pics, songs);
    });
})(document)
