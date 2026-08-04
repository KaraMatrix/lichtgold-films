# Lichtgold Films — Videograf-Website (KaraMatrix-CMS-Stack)

Design-Port des final abgenommenen Lichtgold-Films-Designs (statisches HTML,
6 Seiten) in den Jekyll+Pages-CMS-Stack. Öffentliche Kontaktdaten (Adresse,
E-Mail, Ansprechpartner) sind aus der Quelle übernommen und echt; rechtliche
Pflichttexte sind weiterhin Platzhalter (siehe `[Platzhalter: …]` in
`_pages/impressum.md` / `_pages/datenschutz.md`) — die muss der Kunde liefern.

## Seitenstruktur (6 Kernseiten + Theme-System)

Jede Kernseite ist eine eigene Markdown-Datei im Root (`index.md`,
`hochzeiten.md`, `events.md`, `commercials.md`, `ueber-mich.md`, `kontakt.md`)
mit `page_type` (steuert den Block in `_layouts/default.html`) und `theme`
(`hell` oder `dunkel`, per CMS-Feld „Darstellung" umschaltbar). Hell/Dunkel
sind CSS-Variablen-Sets in `assets/style.css`, aktiviert über
`data-theme="…"` auf `<body>` — keine zwei Stylesheets, eine Quelle der
Wahrheit für Nav/Buttons/Footer/Hero, die auf beiden Themes vorkommen.

Seiteninhalte (Texte, Bilder, Werte-Kacheln, FAQ, Prozess-Schritte …) liegen
in `_data/startseite.yml`, `_data/hochzeiten.yml`, `_data/events.yml`,
`_data/commercials.yml`, `_data/ueber-mich.yml`, `_data/kontakt.yml` — je
Kernseite eine Datei, komplett über `.pages.yml` editierbar.

## Struktur — was neu ist ggü. dem Basis-Template

- `_data/settings.yml` — Firmenname/Kontakt/Farbe + neu: `ansprechpartner`,
  `instagram_handle`/`_url`, `vimeo_url`, `youtube_url`, `formular_endpoint`
  (leer = Kontaktformular ausgeblendet, „Andere Wege"-Spalte läuft dann volle
  Breite). `telefon` ist optional (leer = Anruf-Button/Sektion blendet sich
  aus) — es ist keine reale Telefonnummer bekannt (POLA, keine erfundenen
  Daten).
- Alte generische Homepage-Sektionen `leistungen` (Preise) und `testimonials`
  wurden aus `_data/startseite.yml`/`.pages.yml` entfernt — im Lichtgold-
  Quelldesign kommt keine der beiden Sektionen vor (Fidelity + kein toter
  Config-Rest).
- `_projekte/`-Kategorien auf `hochzeit` / `event` / `commercial` reduziert
  (matcht die 3 Kernseiten). Wird gefiltert nach Kategorie auf Home (alle
  gemischt), Hochzeiten (`hochzeit`) und Commercials (`commercial`) gezeigt;
  Events hat im Quelldesign kein Portfolio-Grid, nur statische
  Service-Kategorien — bewusst nicht erfunden.
- `_includes/video.html` — unverändert, das validierte Klick-zum-Laden-System
  (YouTube/Vimeo, DSGVO). Vor dem Klick lädt NICHTS extern.
- `_includes/projekt-card.html` — neu im Lichtgold-Look (Play-Icon nur wenn
  `video_url` gesetzt ist — sonst kein irreführender Play-Button auf einem
  Standbild ohne Video).
- `assets/script.js` — Burger-Menü (neu, zentral statt pro Seite dupliziert),
  Video-Klick-Handler, Scroll-Reveal.
- **Scroll-Reveal-Fix:** Das Basis-Template nutzte eine „Blenden-Iris"
  (`clip-path: circle(0%)` → `circle(140%)`). Das macht das Element für
  Chromiums `IntersectionObserver` dauerhaft nicht-detektierbar (Ratio bleibt
  für immer 0, der Callback feuert nie) — ein reproduzierter Deadlock, kein
  Testartefakt: bei `clip-path:circle(0%)` bleibt der komplette Seiteninhalt
  unsichtbar. Ersetzt durch die robuste Fade+TranslateY-Variante aus der
  Quelle. **Falls andere Kundenprojekte dieselbe „Blenden-Iris" nutzen, dort
  ebenfalls prüfen/fixen.**
- Self-hosted Fonts (`assets/fonts/*.woff2`, Cormorant Garamond + Outfit) statt
  `fonts.googleapis.com` — DSGVO, 0 externe Font-Requests.
- Fake-UI entfernt: Video-Fortschrittsbalken/Zeit-Anzeige aus der Quelle
  (`00:00 / 02:45`, `38 %`-Balken) waren statisch und nie echt — gestrichen
  (POLA). Formular-„Danke"-Overlay der Quelle (JS `preventDefault`) entfernt —
  sobald ein echter `formular_endpoint` gesetzt ist, muss die Anfrage auch
  wirklich ankommen, kein simuliertes Erfolgs-UI.

## Neuen Kunden aus diesem Template anlegen

1. **Repo erstellen:** Auf GitHub „Use this template" (oder Ordner in ein neues
   Repo kopieren, `git init`, push nach `github.com/<account>/<kunde>`).
2. **GitHub Pages aktivieren:** Repo → Settings → Pages → Source: `main` /
   `(root)`. Nach ein paar Minuten ist die Seite unter
   `https://<account>.github.io/<kunde>/` live.
3. **Inhalte anpassen:**
   - `_data/settings.yml` — Firmenname, Kontakt, Erreichbarkeit, Primärfarbe.
   - `_data/startseite.yml` — Hero, Leistungen/Pakete, Über mich, Stimmen.
   - `_projekte/` — Portfolio-Projekte (eine Datei pro Projekt).
   - `_data/navigation.yml` — Haupt-Navigation (Reihenfolge über `nav_order`).
   - `_pages/impressum.md`, `_pages/datenschutz.md` — Platzhalter durch echte
     Rechtstexte ersetzen (siehe eckige Klammern `[Platzhalter: …]`).
   - `_posts/2026-07-10-…md` — Beispiel-Blogpost vor dem Livegang löschen
     oder durch einen echten Beitrag ersetzen.
4. **Farbe setzen:** `farbe_primaer` in `settings.yml` als Hex-Code — steuert
   automatisch Buttons, Links und Akzente über die ganze Seite.

## CMS-Add-on verbinden (pagescms.org)

1. Auf [pagescms.org](https://pagescms.org) mit GitHub einloggen, das
   Kunden-Repo auswählen. `.pages.yml` ist bereits vorkonfiguriert
   (Website-Einstellungen, Navigation, Unterseiten, Blog).
2. **Collaborator einladen:** GitHub-Repo → Settings → Collaborators →
   Kunden-E-Mail einladen (Rolle: Write reicht, kein Admin nötig).
   Der Kunde bekommt eine E-Mail, akzeptiert die Einladung und kann sich
   danach auf pagescms.org per Magic-Link/GitHub-Login anmelden und im
   CMS-Formular editieren — kein direkter Repo-/Code-Zugriff nötig.
3. Jede Änderung im CMS erzeugt automatisch einen Commit im Repo; GitHub
   Pages baut die Seite danach selbst neu (kein manueller Deploy-Schritt).

## Neue Unterseite anlegen (ohne CMS)

Markdown-Datei in `_pages/` anlegen mit Front Matter:

```yaml
---
title: Beispieltitel
nav_label: Kurzform für die Navigation
nav_order: 50
nav_location: header   # oder footer
published: true
---
Inhalt der Seite …
```

## Lokal testen

```bash
bundle install
bundle exec jekyll serve
```

## Blog (Add-on)

Neue Datei in `_posts/` als `YYYY-MM-DD-titel.md` mit Front Matter
`title` und `date`. Die Übersichtsseite `/aktuelles/` erscheint automatisch
in der Navigation, sobald mindestens ein Beitrag existiert.

**Hinweis SEO:** Die Meta-Description/JSON-LD kommt aus `_config.yml` (`description:`) und wird EINMALIG beim Kunden-Setup gesetzt — CMS-Änderungen am Slogan ändern nur die sichtbare Seite, nicht das Google-Snippet. Beim Setup beide konsistent setzen.
