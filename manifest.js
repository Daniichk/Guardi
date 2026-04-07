{
  "manifest_version": 3,
  "name": "Guard: Focus First",
  "version": "1.0",
  "description": "Solve tasks before watching YouTube",
  "permissions": ["storage"],
  "content_scripts": [
    {
      "matches": ["*://www.youtube.com/*"],
      "js": ["content.js"],
      "run_at": "document_start"
    }
  ]
}
