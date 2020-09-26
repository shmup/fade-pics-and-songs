cat << JSON
{
  "pics": $(ls pics | jq -R -s -c 'split("\n")[:-1]'),
  "songs": $(ls songs | jq -R -s -c 'split("\n")[:-1]')
}
JSON
