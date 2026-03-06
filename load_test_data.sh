#!/bin/bash

BASE_URL="https://musical-space-funicular-7rj7wxjpwj3rv5r-8000.app.github.dev"

echo "🚀 Seeding PromptLab test data..."
echo ""

# ─────────────────────────────────────────
# COLLECTIONS
# ─────────────────────────────────────────

echo "📁 Creating collections..."

CODE_COLLECTION=$(curl -s -X POST "$BASE_URL/collections" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Code Generation",
    "description": "Prompts for generating, refactoring, and debugging code across languages"
  }')
CODE_ID=$(echo $CODE_COLLECTION | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
echo "  ✅ Code Generation → $CODE_ID"

CREATIVE_COLLECTION=$(curl -s -X POST "$BASE_URL/collections" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Creative Writing",
    "description": "Fiction, narrative, and stylistic writing prompts for various genres and formats"
  }')
CREATIVE_ID=$(echo $CREATIVE_COLLECTION | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
echo "  ✅ Creative Writing → $CREATIVE_ID"

SUMMARY_COLLECTION=$(curl -s -X POST "$BASE_URL/collections" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Text Summarization",
    "description": "Prompts for condensing technical docs, news, financial reports, and meeting notes"
  }')
SUMMARY_ID=$(echo $SUMMARY_COLLECTION | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
echo "  ✅ Text Summarization → $SUMMARY_ID"

echo ""

# ─────────────────────────────────────────
# PROMPTS — CODE GENERATION
# ─────────────────────────────────────────

echo "📝 Creating Code Generation prompts..."

curl -s -X POST "$BASE_URL/prompts" \
  -H "Content-Type: application/json" \
  -d "{
    \"title\": \"Debug My Function\",
    \"content\": \"Here is a {{language}} function that is supposed to {{expected_behavior}} but instead it {{actual_behavior}}:\n\n{{code}}\n\nIdentify the bug and provide a corrected version with an explanation.\",
    \"tags\": [\"debugging\", \"code-review\", \"code-generation\"],
    \"collection_id\": \"$CODE_ID\"
  }" > /dev/null && echo "  ✅ Debug My Function"

curl -s -X POST "$BASE_URL/prompts" \
  -H "Content-Type: application/json" \
  -d "{
    \"title\": \"Refactor for Readability\",
    \"content\": \"Refactor the following {{language}} code to improve readability and follow best practices. Do not change the external behavior. Add comments where the logic is non-obvious.\n\n{{code}}\",
    \"tags\": [\"refactor\", \"clean-code\", \"code-generation\"],
    \"collection_id\": \"$CODE_ID\"
  }" > /dev/null && echo "  ✅ Refactor for Readability"

curl -s -X POST "$BASE_URL/prompts" \
  -H "Content-Type: application/json" \
  -d "{
    \"title\": \"Generate REST Endpoint\",
    \"content\": \"Write a {{framework}} REST API endpoint for the following requirement:\n\nResource: {{resource}}\nOperation: {{operation}}\nBusiness rules: {{rules}}\n\nInclude input validation, error handling, and a brief docstring.\",
    \"tags\": [\"api\", \"backend\", \"code-generation\"],
    \"collection_id\": \"$CODE_ID\"
  }" > /dev/null && echo "  ✅ Generate REST Endpoint"

echo ""

# ─────────────────────────────────────────
# PROMPTS — CREATIVE WRITING
# ─────────────────────────────────────────

echo "📝 Creating Creative Writing prompts..."

curl -s -X POST "$BASE_URL/prompts" \
  -H "Content-Type: application/json" \
  -d "{
    \"title\": \"Vivid Scene Opener\",
    \"content\": \"Write the opening scene of a short story set in {{setting}}. The protagonist is {{character_description}}. The tone should be {{tone}}. Focus on sensory detail — what the character sees, hears, and feels. End the scene on an unresolved tension.\",
    \"tags\": [\"fiction\", \"scene-writing\", \"creative-writing\"],
    \"collection_id\": \"$CREATIVE_ID\"
  }" > /dev/null && echo "  ✅ Vivid Scene Opener"

curl -s -X POST "$BASE_URL/prompts" \
  -H "Content-Type: application/json" \
  -d "{
    \"title\": \"Constrained Short Story\",
    \"content\": \"Write a {{sentence_count}}-sentence {{genre}} story. The setting is {{setting}}. The tension must come entirely from implication — never state the threat directly. Every sentence must do double duty: advance the plot AND reveal character.\",
    \"tags\": [\"flash-fiction\", \"constrained-writing\", \"creative-writing\"],
    \"collection_id\": \"$CREATIVE_ID\"
  }" > /dev/null && echo "  ✅ Constrained Short Story"

curl -s -X POST "$BASE_URL/prompts" \
  -H "Content-Type: application/json" \
  -d "{
    \"title\": \"Professional Document Writer\",
    \"content\": \"Write a {{document_type}} from the perspective of {{narrator}}. Tone: {{tone}}. Key points to convey: {{key_points}}. Constraints: no clichés, no filler phrases, under {{word_limit}} words.\",
    \"tags\": [\"professional-writing\", \"business\", \"creative-writing\"],
    \"collection_id\": \"$CREATIVE_ID\"
  }" > /dev/null && echo "  ✅ Professional Document Writer"

echo ""

# ─────────────────────────────────────────
# PROMPTS — SUMMARIZATION
# ─────────────────────────────────────────

echo "📝 Creating Text Summarization prompts..."

curl -s -X POST "$BASE_URL/prompts" \
  -H "Content-Type: application/json" \
  -d "{
    \"title\": \"Technical Summary for Non-Technical Audience\",
    \"content\": \"Summarize the following technical content for a {{audience}} in {{format}}. Avoid jargon. Focus on what changed, why it matters, and any tradeoffs or risks.\n\n{{content}}\",
    \"tags\": [\"summarization\", \"technical-writing\", \"audience-adaptation\"],
    \"collection_id\": \"$SUMMARY_ID\"
  }" > /dev/null && echo "  ✅ Technical Summary for Non-Technical Audience"

curl -s -X POST "$BASE_URL/prompts" \
  -H "Content-Type: application/json" \
  -d "{
    \"title\": \"Neutral News Brief\",
    \"content\": \"Summarize the following news excerpt in {{sentence_count}} sentences. The summary must be factually neutral — do not editorialize, assign blame, or imply causation beyond what is stated. Suitable for a daily briefing.\n\n{{article}}\",
    \"tags\": [\"news\", \"summarization\", \"neutral-tone\"],
    \"collection_id\": \"$SUMMARY_ID\"
  }" > /dev/null && echo "  ✅ Neutral News Brief"

curl -s -X POST "$BASE_URL/prompts" \
  -H "Content-Type: application/json" \
  -d "{
    \"title\": \"Earnings Call Executive Summary\",
    \"content\": \"Write a one-paragraph executive summary of the following financial commentary. Highlight: revenue performance vs expectations, margin changes, key risks, and forward guidance. Audience: {{audience}}.\n\n{{earnings_text}}\",
    \"tags\": [\"finance\", \"summarization\", \"executive-summary\"],
    \"collection_id\": \"$SUMMARY_ID\"
  }" > /dev/null && echo "  ✅ Earnings Call Executive Summary"

echo ""

# ─────────────────────────────────────────
# VERIFY
# ─────────────────────────────────────────

echo "🔍 Verifying seed data..."
PROMPT_COUNT=$(curl -s "$BASE_URL/prompts" | grep -o '"id"' | wc -l | tr -d ' ')
COLLECTION_COUNT=$(curl -s "$BASE_URL/collections" | grep -o '"id"' | wc -l | tr -d ' ')
echo "  📦 Collections: $COLLECTION_COUNT"
echo "  📄 Prompts:     $PROMPT_COUNT"
echo ""
echo "✅ Done! Visit $BASE_URL/docs to explore the API."
