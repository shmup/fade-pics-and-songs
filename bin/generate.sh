# -[R]aw input, -[s]ort, and -[c]ompact
cat << JSON
{
  "pics": $(ls pics | jq -R -s -c 'split("\n")[:-1]'),
  "songs": $(find songs -path 'songs/*.mp3' | jq -R -s -c 'split("\n")[:-1]')
}
JSON
