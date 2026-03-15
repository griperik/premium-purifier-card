# Premium Purifier Card

A premium, highly customizable air purifier card for Home Assistant. Designed to feel like a native app rather than a dashboard widget — with animated particles, a glowing ring, real-time air quality data and full UI configuration without any YAML.

![Premium Purifier Card](https://raw.githubusercontent.com/your-griperik/premium-purifier-card/main/preview.png)

## Features

🌬️ **Air Quality Display**
Shows AQI, CO₂, VOC, NOx, PM1, PM2.5, PM4 and PM10 inside the ring. Each sensor can be toggled on or off individually, and the ring automatically resizes based on how many sensors are active.

✨ **Animated Particles**
Particles are drawn toward the center of the ring, simulating air being pulled into the purifier. Speed syncs to fan percentage or can be set manually.

💫 **Glowing Ring**
A pulsing ring that animates and glows. Rotation speed can be synced to fan speed or set manually. The ring, glow and animation can all be toggled independently.

🌡️ **Sensor Stats**
Temperature, humidity, fan speed and filter lifetime are shown in a clean stat row below the ring. Boxes around the stats can be toggled off for a minimal look.

⚡ **Fan Speed Slider**
A smooth, touch friendly slider to control fan speed directly from the card. Uses the fan entity percentage.

🎛️ **Dropdown Mode Selector**
Tap the fan icon to open a dropdown with all available fan preset modes. Supports a custom input_select entity for automation driven workflows.

🔋 **Filter Lifetime**
Shows filter health under the purifier icon in the header, with a filter icon and percentage.

🎨 **Full Color Customization**
Primary color, secondary color, light and dark background colors are all configurable with a color picker. Card transparency can be set from 0 to 100 percent.

🌍 **Multilingual**
The entire card and editor automatically adapts to your Home Assistant language. Supported languages: Swedish, English, German, French, Dutch, Norwegian, Danish, Finnish, Spanish and Polish.

🌙 **Auto Dark and Light Theme**
The card detects whether your background color is dark or light and adjusts all text and element colors automatically.

⚙️ **No YAML Required**
Everything is configured through a graphical editor. Entity pickers are filtered by measurement unit so you always pick the right sensor.

## Installation

### Via HACS (Recommended)

1. Open HACS in your Home Assistant
2. Go to **Frontend**
3. Click the three dots in the top right and select **Custom repositories**
4. Add `https://github.com/your-username/premium-purifier-card` with category **Dashboard**
5. Find **Premium Purifier Card** in the list and install it
6. Reload your browser

### Manual

1. Download `premium-purifier-card.js` from the latest release
2. Copy it to `/config/www/premium-purifier-card.js`
3. Go to **Settings → Dashboards → Resources**
4. Add `/local/premium-purifier-card.js` as a JavaScript module
5. Reload your browser

## Usage

1. Edit your dashboard
2. Click **Add card**
3. Search for **Premium Purifier Card**
4. Configure your entities in the visual editor

## Configuration

All settings are available in the visual editor. No YAML needed.

| Setting | Description |
|---|---|
| Power entity | A fan or switch entity to toggle on/off |
| Temperature sensor | Sensor with °C or °F unit |
| Humidity sensor | Sensor with % unit |
| Mode entity | Select entity for fan modes |
| PM2.5 sensor | Used for the air quality label (Excellent, Good, etc.) |
| Filter sensor | Sensor reporting filter lifetime in % |
| AQI / CO₂ / VOC / NOx / PM1 / PM2.5 / PM4 / PM10 | Individual air quality sensors shown inside the ring |
| Custom mode selector | Replace the built-in fan modes with a custom input_select entity |
| Card transparency | 0 = fully transparent, 100 = solid |
| Ring speed | 0 = still, 100 = fast pulse |
| Particle speed | 0 = still, 100 = fast |
| Sync ring to fan speed | Ring animation speed follows fan percentage |
| Sync particles to fan speed | Particle speed follows fan percentage |

## Supported Languages

Swedish 🇸🇪  English 🇬🇧  German 🇩🇪  French 🇫🇷  Dutch 🇳🇱  Norwegian 🇳🇴  Danish 🇩🇰  Finnish 🇫🇮  Spanish 🇪🇸  Polish 🇵🇱

## Requirements

No external dependencies. No HACS plugins required. Just drop in the JS file and go.

## License

MIT License. See [LICENSE](LICENSE) for details.

## Contributing

Found a bug or have a feature request? Open an issue on GitHub. Pull requests are welcome!
