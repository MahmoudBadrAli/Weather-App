import "./App.css";

// REACT
import { useEffect, useState } from "react";

//  MATERIAL UI
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// EXTERNAL LIBRARIES
import axios from "axios";

import { useTranslation } from "react-i18next";

import moment from "moment/min/moment-with-locales";
moment.locale("ar");

const theme = createTheme({
  typography: {
    fontFamily: ["Tajawal"],
  },
});

let cancelAxios = null;

const arabCapitals = {
  // شبه الجزيرة العربية
  Riyadh: { lat: 24.7136, lon: 46.6753 }, // السعودية
  "Abu Dhabi": { lat: 24.4539, lon: 54.3773 }, // الإمارات
  Manama: { lat: 26.2235, lon: 50.5876 }, // البحرين
  Kuwait: { lat: 29.3759, lon: 47.9774 }, // الكويت
  Muscat: { lat: 23.588, lon: 58.3829 }, // عمان
  Doha: { lat: 25.2854, lon: 51.531 }, // قطر
  Sanaa: { lat: 15.3694, lon: 44.191 }, // اليمن

  // الهلال الخصيب
  Amman: { lat: 31.9539, lon: 35.9106 }, // الأردن
  Damascus: { lat: 33.5138, lon: 36.2765 }, // سوريا
  Beirut: { lat: 33.8938, lon: 35.5018 }, // لبنان
  Jerusalem: { lat: 31.7769, lon: 35.2224 }, // فلسطين
  Baghdad: { lat: 33.3152, lon: 44.3661 }, // العراق

  // شمال أفريقيا
  Khartoum: { lat: 15.5007, lon: 32.5599 }, // السودان
  Cairo: { lat: 30.0444, lon: 31.2357 }, // مصر
  Tripoli: { lat: 32.8872, lon: 13.1913 }, // ليبيا
  Tunis: { lat: 36.8065, lon: 10.1815 }, // تونس
  Algiers: { lat: 36.7538, lon: 3.0588 }, // الجزائر
  Rabat: { lat: 34.0209, lon: -6.8416 }, // المغرب
  Nouakchott: { lat: 18.079, lon: -15.965 }, // موريتانيا

  // شرق أفريقيا
  Mogadishu: { lat: 2.0469, lon: 45.3182 }, // الصومال
  Djibouti: { lat: 11.588, lon: 43.145 }, // جيبوتي
  Moroni: { lat: -11.7172, lon: 43.2473 }, // جزر القمر
};

let showArabCapitals = [...Object.keys(arabCapitals)];

function App() {
  const { t, i18n } = useTranslation();

  // =================== STATES ===================
  const [capital, setCapital] = useState(
    localStorage.getItem("capital") || "Cairo"
  );

  const handleChange = (event) => {
    setCapital(event.target.value);
    localStorage.setItem("capital", event.target.value);
  };

  const [locale, setLocale] = useState(localStorage.getItem("locale") || "ar");
  const [dataAndTime, setDataAndTime] = useState("");
  const [weather, setWeather] = useState({
    temp: null,
    description: "",
    min: null,
    max: null,
    icon: null,
  });

  const direction = locale === "en" ? "ltr" : "rtl";

  // =================== EVENT HANDLERS ===================

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") || "ar";
    setLocale(savedLocale);
    i18n.changeLanguage(savedLocale);
    moment.locale(savedLocale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleLanguageClick() {
    const newLocale = locale === "en" ? "ar" : "en";
    setLocale(newLocale);
    i18n.changeLanguage(newLocale);
    moment.locale(newLocale);
    setDataAndTime(moment().format("dddd، D MMMM YYYY"));
    localStorage.setItem("locale", newLocale);
  }

  useEffect(() => {
    setDataAndTime(moment().format("dddd، D MMMM YYYY"));

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${arabCapitals[capital].lat}&lon=${arabCapitals[capital].lon}&appid=f77d2383fef24695e931f17677bbf408`,
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then(function (response) {
        // handle success
        const temp = response.data.main.temp;
        const min = response.data.main.temp_min;
        const max = response.data.main.temp_max;
        const decription = response.data.weather[0].description;
        const responseIcon = response.data.weather[0].icon;
        setWeather({
          temp: Math.round(temp - 273.15),
          min: Math.round(min - 273.15),
          max: Math.round(max - 273.15),
          description: decription,
          icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    return () => {
      if (cancelAxios) cancelAxios();
    };
  }, [capital]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* CONTENT CONTAINER */}
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {/* CARD */}
            <div
              dir={direction}
              style={{
                width: "100%",
                background: "rgb(28 52 91 / 36%)",
                color: "white",
                padding: "20px",
                borderRadius: "15px",
                boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
              }}
            >
              {/* CONTENT */}
              <div>
                {/* CITY & TIME */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "start",
                  }}
                  dir={direction}
                >
                  <Typography
                    variant="h2"
                    style={{
                      marginRight: "20px",
                      fontWeight: "600",
                    }}
                  >
                    {t(capital)}
                  </Typography>

                  <Typography variant="h5" style={{ marginRight: "20px" }}>
                    {dataAndTime}
                  </Typography>
                </div>
                {/* == CITY & TIME == */}

                <hr style={{ marginTop: "20px" }} />

                {/* CONTAINER OF DEGREE + CLOUD ICON */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  {/* DEGREE & DESCRIPTION */}
                  <div>
                    {/* TEMP */}
                    <div
                      style={{ display: "flex", justifyContent: "center" }}
                      dir={"rtl"}
                    >
                      <Typography variant="h1" style={{ textAlign: "right" }}>
                        {`${weather.temp ?? "--"}`}
                      </Typography>

                      <img src={weather.icon} alt="weather icon" />
                    </div>
                    {/*== TEMP ==*/}

                    <Typography variant="h6">{`${t(
                      weather.description
                    )}`}</Typography>

                    {/* MIN & MAX */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6">
                        {t("High")}: {weather.min ?? "--"}
                      </Typography>
                      <h5 style={{ margin: "12px" }}>|</h5>
                      <Typography variant="h6">
                        {t("Low")}: {weather.max ?? "--"}
                      </Typography>
                    </div>
                  </div>
                  {/*== DEGREE & DESCRIPTION ==*/}

                  <CloudIcon
                    style={{
                      fontSize: "200px",
                      color: "white",
                    }}
                  />
                </div>
                {/*= CONTAINER OF DEGREE + CLOUD ICON ==*/}
              </div>
              {/* == CONTENT == */}
            </div>
            {/*== CARD ==*/}

            {/* TRANSLATION CONTAINER */}
            <div
              dir={direction}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
                height: "40px",
              }}
            >
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  "& .MuiInputLabel-root": {
                    color: "white",
                    "&.Mui-focused": { color: "white" },
                  },
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                    "& .MuiSelect-icon": { color: "white" },
                  },
                }}
                size="small"
              >
                <InputLabel id="demo-simple-select-autowidth-label">
                  {t("Capitals")}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={capital}
                  onChange={handleChange}
                  autoWidth
                  label={t("Capitals")}
                  sx={{
                    color: "white",
                  }}
                >
                  {showArabCapitals.map((capital) => {
                    return <MenuItem value={capital}>{t(capital)}</MenuItem>;
                  })}
                </Select>
              </FormControl>
              <Button
                style={{ color: "white" }}
                variant="outlined"
                onClick={handleLanguageClick}
              >
                {locale == "en" ? "العربية" : "English"}
              </Button>
            </div>
            {/*== TRANSLATION CONTAINER ==*/}
          </div>
          {/*== CONTENT CONTAINER ==*/}
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
