#!/usr/bin/env bash
set -euo pipefail

# load .env from project root
if [ -f "$(dirname "$0")/../../.env" ]; then
  export $(grep -E 'SECRET_KEY|PROJECT_REF|VITE_SUPABASE_URL' "$(dirname "$0")/../../.env" | xargs)
fi

# verify required env variables
if [ -z "${SECRET_KEY:-}" ]; then
  echo "❌ SECRET_KEY is missing"
  exit 1
fi

if [ -z "${PROJECT_REF:-}" ]; then
  echo "❌ PROJECT_REF is missing"
  exit 1
fi

# fetch types from Supabase management API
raw_response="$(
  curl -s -w '\n%{http_code}' \
    -H "Authorization: Bearer $SECRET_KEY" \
    "https://api.supabase.com/v1/projects/$PROJECT_REF/types/typescript?included_schemas=public"
)"

# split body and status code
response_status="$(printf '%s' "$raw_response" | tail -n1)"
response_body="$(printf '%s' "$raw_response" | sed '$d')"

# handle unsuccessful responses
if [ "$response_status" != "200" ]; then
  echo "❌ HTTP $response_status"
  echo "$response_body"
  exit 1
fi

# extract the 'types' field from the JSON
types_value="$(
  printf '%s' "$response_body" |
  node -pe 'const d = JSON.parse(require("fs").readFileSync(0,"utf8")); d.types'
)"

# ensure types were returned
if [ -z "$types_value" ] || [ "$types_value" = "undefined" ]; then
  echo "❌ Response JSON did not contain a valid .types field"
  exit 1
fi

# write types to file
printf '%s\n' "$types_value" > src/types/database.schema.ts

# done
echo "✅ Types updated → src/types/database.schema.ts"