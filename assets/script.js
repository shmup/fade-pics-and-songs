(document => {
  const $ = x => document.querySelector(x);

  const content = $('.content'),
    header = $('.header');

  let picIndex = 0,
    songIndex = 0,
    cyclePicsId = null;

  const cyclePics = (pics, picIndex, speed) => {
    return setInterval(() => {
      picIndex = picIndex + 1 > pics.length - 1 ? 0 : picIndex + 1;
      content.style.backgroundImage = `url('${pics[picIndex]}')`;
      document.title = pics[picIndex];
    }, speed * 1000);
  };

  const renderPics = (pics, speed) => {
    content.style.backgroundImage = `url('${pics[picIndex]}')`;
    document.title = pics[picIndex];

    if (cyclePicsId) {
      clearTimeout(cyclePicsId);
    }

    cyclePicsId = cyclePics(pics, picIndex, speed);
  };

  const renderAudioPlayer = songs => {
    const player = $('.player');
    player.src = songs[0];

    player.addEventListener('ended', function() {
      songIndex = songIndex + 1 > songs.length - 1 ? 0 : songIndex + 1;
      player.src = songs[songIndex];
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
  };

  const run = (pics, songs) => {
    renderPics(pics, $('.slider').value);
    renderAudioPlayer(songs);
  };

  const get = async (pics, songs) => {
    for (const thing of [].concat(...pics, ...songs)) {
      await setTimeout(() => fetch(thing), 0);
    }
  }

  fetch('data.json')
    .then(resp => resp.json())
    .then(media => {
      const {pics, songs} = media;

      get(pics, songs);

      console.debug('LOADED');
      console.debug(
        Object.values(media)
          .map(v => v.join('\n'))
          .join('\n')
      );

      const slider = $('.slider');
      slider.addEventListener('change', e => {
        renderPics(pics, e.target.value);
      });

      slider.addEventListener('input', e => {
        $('.seconds').innerHTML = e.target.value;
      });

      $('.reset-pics').addEventListener('click', () => {
        picIndex = 0;
        renderPics(pics, slider.value);
      });

      run(pics, songs);
    });
})(document);
