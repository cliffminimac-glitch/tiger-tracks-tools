# BUILD STANDARDS — Required for Every Tool

## Backup & Recovery (MANDATORY on every app/tool)

Every tool must include a collapsible **⚙️ Backup & Recovery** section in the footer or settings panel with:

### 1. Export Full Backup (.html)
- Button: `Export Full Backup (.html)`
- Downloads `document.documentElement.outerHTML` as a self-contained `.html` file
- Filename: `{project-name}_backup_{YYYY-MM-DD}.html`
- Must be fully functional when opened in any browser

### 2. Export Source Code
- Button: `Export Source Code`
- Downloads raw source as `.txt` with a commented header block:
  ```
  // Project: <name>
  // Description: <desc>
  // Created: <date> | Last Modified: <date>
  // Dependencies: <list>
  // Setup: <instructions>
  ```

### 3. Export/Import State Data
- `Export Data (JSON)` — downloads all localStorage/state as JSON
- `Import Data` — uploads JSON file to restore state
- Covers ALL persistent data keys used by the app

### 4. Version Header
- Small version tag in footer: `v1.x — YYYY-MM-DD`
- Increment on every significant change

### UI Placement
- Grouped in collapsible `⚙️ Backup & Recovery` footer section
- Not cluttering main UI

---

## Why
- Artifacts break and get lost
- Single HTML file = full restore from any browser
- GitHub export = version control backup
- JSON export/import = data is never lost
