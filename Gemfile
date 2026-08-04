source "https://rubygems.org"

# Direkt gepinnte Versionen statt der "github-pages"-Meta-Gem: mirrort exakt,
# was github-pages (Stand Prüfung) intern für jekyll/jekyll-seo-tag/
# jekyll-sitemap auf GitHub Pages selbst einsetzt (github-pages 232 pinnt
# jekyll 3.10.0 / jekyll-seo-tag 2.8.0 / jekyll-sitemap 1.4.0) — identisches
# Build-Ergebnis, aber ohne die vielen zusätzlichen github-pages-Abhängigkeiten
# (u.a. neuere ffi-Versionen), die auf diesem Rechner (System-Ruby 2.6.10)
# nicht installierbar sind. Workaround, kein Architektur-Bruch.
gem "jekyll", "3.10.0"
gem "jekyll-seo-tag", "2.8.0"
gem "jekyll-sitemap", "1.4.0"
gem "kramdown-parser-gfm"

# jekyll -> jekyll-watch -> listen -> rb-inotify zieht sonst ffi >= 1.17
# (braucht Ruby >= 3.0) — hart auf eine mit Ruby 2.6 kompatible Version
# gepinnt, obwohl rb-inotify auf macOS zur Laufzeit nie geladen wird.
gem "ffi", "< 1.17"

