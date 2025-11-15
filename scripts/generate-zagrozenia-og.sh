#!/bin/bash

# Skrypt pomocniczy do generowania obrazka OG dla artykułu o zagrożeniach kredytowych
# Wymaga: przeglądarki z obsługą JavaScript

echo "📸 Generator obrazka OG - Zagrożenia Kredytowe"
echo ""
echo "Instrukcja:"
echo "1. Otwórz plik scripts/generate-zagrozenia-og-image.html w przeglądarce"
echo "2. Kliknij przycisk 'Pobierz jako JPG'"
echo "3. Zapisz plik jako: public/images/blog/zagrozenia-kredytowe-og.jpg"
echo ""
echo "Lub użyj tego skryptu, aby otworzyć plik automatycznie:"
echo ""

# Sprawdź system operacyjny i otwórz plik
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open scripts/generate-zagrozenia-og-image.html
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open scripts/generate-zagrozenia-og-image.html 2>/dev/null || sensible-browser scripts/generate-zagrozenia-og-image.html
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    # Windows
    start scripts/generate-zagrozenia-og-image.html
else
    echo "Nie można automatycznie otworzyć przeglądarki."
    echo "Otwórz ręcznie: scripts/generate-zagrozenia-og-image.html"
fi

echo ""
echo "✅ Plik HTML został otwarty w przeglądarce."
echo "   Po pobraniu obrazka, zapisz go jako: public/images/blog/zagrozenia-kredytowe-og.jpg"

