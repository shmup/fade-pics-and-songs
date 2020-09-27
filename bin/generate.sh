# -[R]aw input, -[s]ort, and -[c]ompact

for i in pics/* ; do convert "$i" "${i%.*}.png"; done

cat << JSON
{
  "pics": $(find pics -path 'pics/*.png' | jq -R -s -c 'split("\n")[:-1]'),
  "songs": $(find songs -path 'songs/*.mp3' | jq -R -s -c 'split("\n")[:-1]')
}
JSON
