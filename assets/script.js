((document) => {
  const $ = x => [...document.querySelectorAll(x)];
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  let frame = $('.wrapper').pop(), picIndex = 1, songIndex = 1;

  const renderPic = filename => {
    const url = `url('pics/${filename}')`;
    console.debug(url);
    frame.style.backgroundImage = url;
    document.title = filename;
  };

  const renderAudioPlayer = songs => {
    const player = new Audio(`songs/${songs[0]}`);

    player.addEventListener('ended',function(){
      if (songIndex === songIndex.length - 1) {
        songIndex = 0;
      }
      player.src = `songs/${songs[songIndex]}`
      player.pause();
      player.load();
      player.play();

      songIndex += 1;
    });

    player.controls = true;

    frame.append(player);
  }

  const run = (pics, songs) => {
    renderPic(pics[0]);
    renderAudioPlayer(songs);

    setInterval(() => {
      if (picIndex === pics.length - 1) {
        picIndex = 0;
      }

      renderPic(pics[picIndex]);

      picIndex += 1;
    }, 3000);
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
