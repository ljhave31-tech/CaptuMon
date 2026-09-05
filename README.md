# Captumon

Captumon is a mobile-focused web application that lets users capture items using their device camera and records them like a Pokédex entry.

## Project Goals

- [ ] Capture items via device camera (photo/video)
- [ ] Auto-detect item metadata from the captured media
- [ ] Display captured items as Pokédex-style cards/entries
- [ ] Support offline capture and sync when online
- [ ] Enable sharing of captured entries
- [ ] Organize items into collections/binders
- [ ] Search and filter captured entries
- [ ] Responsive mobile-first design

## Core Needs

### Frontend
- [ ] HTML5 structure with mobile viewport meta
- [ ] CSS with mobile-first responsive design
- [ ] Camera access via `getUserMedia` / `MediaDevices`
- [ ] File upload fallback for unsupported devices
- [ ] IndexedDB or localStorage for local persistence
- [ ] Service Worker for offline capability (PWA)
- [ ] Manifest file for installability

### Capture Flow
- [ ] Camera viewfinder UI
- [ ] Capture button (photo/video toggle)
- [ ] Preview before saving
- [ ] Basic image/video preprocessing

### Data Model
- [ ] Entry schema (id, media, timestamp, tags, notes)
- [ ] Unique ID generation for each capture
- [ ] Thumbnail generation for list views

### UI/UX
- [ ] Home screen with capture CTA
- [ ] Grid/list view of captured entries
- [ ] Detail view (Pokédex card style)
- [ ] Empty states and loading skeletons
- [ ] Touch-friendly controls (min 44px targets)
- [ ] Dark mode support

## Upgrades / Future Enhancements

- [x] AI-based image recognition (identify captured objects)
- [ ] Barcode/QR code scanning
- [ ] Voice notes for entries
- [ ] AR overlay when viewing entries
- [ ] Social features (friends, trading, leaderboards)
- [ ] Cloud sync across devices
- [ ] Export/import entries (JSON, CSV)
- [x] Statistics and streaks
- [ ] Achievements/badges system
- [ ] Widget support for home screen
- [ ] Camera filters and effects
- [ ] Batch import from gallery
- [x] Categories and smart tagging
- [ ] Map view for location-tagged captures
- [ ] Watch face / wearable support

## Tech Stack

- HTML5 / CSS3 / Vanilla JavaScript (or framework TBD)
- Service Workers for offline support
- localStorage for local persistence
- Camera API (`navigator.mediaDevices.getUserMedia`)
- TensorFlow.js + MobileNet for on-device image recognition

## Getting Started

```bash
# Clone the repository
git clone <repo-url> captumon

# Open in browser (no build step required for initial version)
open index.html
```

## File Structure (Planned)

```
/
├── index.html
├── styles/
│   └── main.css
├── scripts/
│   ├── app.js
│   ├── camera.js
│   ├── recognition.js
│   ├── storage.js
│   └── ui.js
├── assets/
│   └── icons/
├── manifest.json
└── sw.js
```
