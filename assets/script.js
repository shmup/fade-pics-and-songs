((document) => {
  fetch('data.json')
    .then(resp => resp.json())
    .then(media => {
      console.debug("LOADED");
      console.debug(Object.values(media).map(v => v.join('\n')).join('\n'));
    });
})(document)
