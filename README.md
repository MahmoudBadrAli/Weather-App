# 🌤️ Arabic Capitals Weather App

A **React-based weather application** that displays the current weather, temperature range, and date for **Arab capitals**.  
It supports **Arabic and English languages** and provides a clean UI powered by **Material UI**.

---

## 🚀 Features

- 🌍 View real-time weather data for all **Arab capitals**  
- 🌡️ Display **current, minimum, and maximum temperatures**  
- 🕓 Shows the **current date** localized in Arabic or English  
- 🔁 Toggle **between Arabic and English** with a single button  
- 💾 Automatically remembers your last selected **capital** and **language**  
- ⚙️ Built using **React + Material UI**

---

## 🧠 Tech Stack

| Category | Technology |
|-----------|-------------|
| Frontend | [React](https://react.dev/) |
| UI Framework | [Material UI (MUI)](https://mui.com/) |
| HTTP Client | [Axios](https://axios-http.com/) |
| Date Formatting | [Moment.js](https://momentjs.com/) |
| Internationalization (i18n) | [react-i18next](https://react.i18next.com/) |
| Weather Data API | [OpenWeatherMap API](https://openweathermap.org/api) |

---

## 📦 Installation

1. **Clone this repository**

```bash
git clone https://github.com/your-username/arabic-capitals-weather.git
cd arabic-capitals-weather
npm install
npm start
Your app should now be running at:
👉 http://localhost:3000

⚙️ API Configuration

- This app uses the OpenWeatherMap API to fetch live weather data.
- To make it work: Create a free account at OpenWeatherMap.org.
- Example:
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}` ```

---

## 🌐 Supported Capitals

- This app currently supports all Arab capitals, including:

Riyadh, Abu Dhabi, Manama, Kuwait, Muscat, Doha, Sanaa, Amman, Damascus, Beirut, Jerusalem, Baghdad, Khartoum, Cairo, Tripoli, Tunis, Algiers, Rabat, Nouakchott, Mogadishu, Djibouti, and Moroni.

---

## 🎨 UI Highlights

- ✨ Designed with Material UI for a modern, clean, and responsive look.

- 🧭 Clean Layout — adapts perfectly across all screen sizes.

- 🔤 RTL (Right-to-Left) Support — full Arabic language compatibility.

- 🌤️ Dynamic Weather Icons — updates based on real-time weather data.

- 🗓️ Localized Date Formatting — uses moment.js to show dates in Arabic or English.

- 💾 Persistent Preferences — automatically saves selected capital and language in localStorage.

- ⚡ Smooth User Experience — fast, lightweight, and intuitive UI design.
