#!/usr/bin/env bash
# Opens an issue assigned to the repository owner as a reminder to share a post on LinkedIn,
# with the text prepared in app/blog/linkedin/<slug>.txt. It waits for the post to be live,
# so the reminder never arrives before the deploy, and skips posts already reminded.
# Usage: linkedin-reminder.sh <slug>...
set -euo pipefail

base_url='https://www.pasqualinosorice.com'
label='linkedin'

# Reads a frontmatter field, removing the YAML quotes ('' is an escaped ' in single quotes)
frontmatter() {
  sed -nE "s/^$1: *//p" "$2" | head -n1 | sed -E "s/^'(.*)'$/\1/; s/^\"(.*)\"$/\1/; s/''/'/g"
}

gh label create "$label" --color 0A66C2 \
  --description 'Promemoria per condividere un articolo su LinkedIn' --force

for slug in "$@"; do
  post="app/blog/posts/${slug}.mdx"
  text_file="app/blog/linkedin/${slug}.txt"
  url="${base_url}/blog/${slug}"

  if [ ! -f "$post" ]; then
    echo "::error::Post not found: ${post}"
    exit 1
  fi

  title=$(frontmatter title "$post")
  issue_title="Condividi su LinkedIn: ${title}"

  if gh issue list --label "$label" --state all --limit 500 --json title --jq '.[].title' |
    grep -qxF "$issue_title"; then
    echo "Reminder already sent for ${slug}"
    continue
  fi

  # The deploy takes a couple of minutes: wait up to 20 for the post to respond
  live=false
  for _ in $(seq 1 40); do
    if curl -fsS -o /dev/null "$url"; then
      live=true
      break
    fi
    sleep 30
  done
  if [ "$live" != true ]; then
    echo "::error::${url} is not live after 20 minutes, no reminder sent"
    exit 1
  fi

  body=$(mktemp)
  {
    echo "L'articolo è online: ${url}"
    echo
    if [ -f "$text_file" ]; then
      echo "Copia il testo in un nuovo post su LinkedIn e metti il link nel primo commento: i post con un link esterno nel testo vengono mostrati a meno persone."
      echo
      echo '### Testo del post'
      echo
      echo '```text'
      cat "$text_file"
      echo '```'
    else
      echo "Per questo articolo non c'è un testo pronto in \`${text_file}\`. Il riassunto da cui partire:"
      echo
      echo "> $(frontmatter summary "$post")"
    fi
    echo
    echo '### Primo commento'
    echo
    echo '```text'
    echo "L'articolo completo: ${url}"
    echo '```'
    echo
    echo "Quando hai pubblicato, chiudi questa issue: le issue chiuse con l'etichetta \`${label}\` sono il registro di cosa hai condiviso."
  } >"$body"

  gh issue create --title "$issue_title" --body-file "$body" --label "$label" \
    --assignee "$GITHUB_REPOSITORY_OWNER"
done
