# Water Bill Card

A custom Lovelace card for displaying water bill data from MQTT (e.g., QingLong → MQTT → Home Assistant).

## ✨ Features
- Shows balance, arrears, usage, payment history
- Click to view details in dialog
- Responsive & theme-aware (light/dark mode)
- Works with single MQTT sensor entity

## 📥 Installation via HACS
1. Open HACS → Frontend → ⋮ → Custom repositories
2. Add URL: `https://github.com/zxs1216/water-bill-card`
3. Category: **Lovelace**
4. Install the card
5. Refresh your browser

## 🧩 Manual Usage
Add to your Lovelace dashboard:
```yaml
type: custom:water-bill-card
entity: sensor.your_water_sensor
name: 水费账单
