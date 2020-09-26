((document) => {
  const $ = x => document.querySelector(x);

  const frame = $('.wrapper'), header = $('.header');

  let picIndex = 0, songIndex = 0, cyclePicsId = null;

  const cyclePics = (pics, picIndex, speed) => {
    return setInterval(() => {
      picIndex = picIndex+1 > pics.length-1 ? 0 : picIndex+1;
      frame.style.backgroundImage = `url('pics/${pics[picIndex]}')`;
      document.title = pics[picIndex];
    }, speed * 1000);
  }

  const renderPics = (pics, speed) => {
    frame.style.backgroundImage = `url('pics/${pics[picIndex]}')`
    document.title = pics[picIndex];

    if (cyclePicsId) {
      clearTimeout(cyclePicsId);
    }

    cyclePicsId = cyclePics(pics, picIndex, speed);
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

    header.append(player);
  }

  const run = (pics, songs) => {
    renderPics(pics, 15);
    renderAudioPlayer(songs);
  }

  fetch('data.json')
    .then(resp => resp.json())
    .then(media => {
      const {pics, songs} = media;

      console.debug('LOADED');
      console.debug(Object.values(media).map(v => v.join('\n')).join('\n'));

      const slider = $('.slider');
      slider.addEventListener('change', e => {
        $('.seconds').innerHTML = e.target.value;
        renderPics(pics, e.target.value);
      });

      run(pics, songs);
    });
})(document)
