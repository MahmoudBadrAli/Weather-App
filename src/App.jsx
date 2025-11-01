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
import CircularProgress from "@mui/material/CircularProgress";
import WrongLocationIcon from "@mui/icons-material/WrongLocation";

// EXTERNAL LIBRARIES
import { useTranslation } from "react-i18next";
import moment from "moment/min/moment-with-locales";
moment.locale("ar");

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "./features/api/weatherApiSlice";

const theme = createTheme({
  typography: {
    fontFamily: ["Tajawal"],
  },
});

const arabCapitals = {
  Riyadh: { lat: 24.7136, lon: 46.6753, country: "Saudi Arabia" },
  "Abu Dhabi": { lat: 24.4539, lon: 54.3773, country: "UAE" },
  Manama: { lat: 26.2235, lon: 50.5876, country: "Bahrain" },
  Kuwait: { lat: 29.3759, lon: 47.9774, country: "Kuwait" },
  Muscat: { lat: 23.588, lon: 58.3829, country: "Oman" },
  Doha: { lat: 25.2854, lon: 51.531, country: "Qatar" },
  Sanaa: { lat: 15.3694, lon: 44.191, country: "Yemen" },

  Amman: { lat: 31.9539, lon: 35.9106, country: "Jordan" },
  Damascus: { lat: 33.5138, lon: 36.2765, country: "Syria" },
  Beirut: { lat: 33.8938, lon: 35.5018, country: "Lebanon" },
  Jerusalem: { lat: 31.7769, lon: 35.2224, country: "Palestine" },
  Baghdad: { lat: 33.3152, lon: 44.3661, country: "Iraq" },

  Khartoum: { lat: 15.5007, lon: 32.5599, country: "Sudan" },
  Cairo: { lat: 30.0444, lon: 31.2357, country: "Egypt" },
  Tripoli: { lat: 32.8872, lon: 13.1913, country: "Libya" },
  Tunis: { lat: 36.8065, lon: 10.1815, country: "Tunisia" },
  Algiers: { lat: 36.7538, lon: 3.0588, country: "Algeria" },
  Rabat: { lat: 34.0209, lon: -6.8416, country: "Morocco" },
  Nouakchott: { lat: 18.079, lon: -15.965, country: "Mauritania" },

  Mogadishu: { lat: 2.0469, lon: 45.3182, country: "Somalia" },
  Djibouti: { lat: 11.588, lon: 43.145, country: "Djibouti" },
  Moroni: { lat: -11.7172, lon: 43.2473, country: "Comoros" },
};

let showArabCapitals = [...Object.keys(arabCapitals)];

function App() {
  // REDUX CODE
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.weatherApi.isLoading);
  const isFailed = useSelector((state) => state.weatherApi.isFailed);
  const weather = useSelector((state) => state.weatherApi.weather);

  // I18N CODE
  const { t, i18n } = useTranslation();

  // =================== STATES ===================
  const [capital, setCapital] = useState(
    localStorage.getItem("capital") || "Cairo"
  );

  const [locale, setLocale] = useState(localStorage.getItem("locale") || "ar");
  const [dataAndTime, setDataAndTime] = useState("");

  const direction = locale === "en" ? "ltr" : "rtl";

  // =================== EVENT HANDLERS ===================

  const handleChange = (event) => {
    setCapital(event.target.value);
    localStorage.setItem("capital", event.target.value);
  };

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
    setDataAndTime(moment().format("dddd, D MMMM YYYY"));
    localStorage.setItem("locale", newLocale);
  }

  useEffect(() => {
    dispatch(
      fetchWeather({
        lat: arabCapitals[capital].lat,
        lon: arabCapitals[capital].lon,
      })
    );
    setDataAndTime(moment().format("dddd, D MMMM YYYY"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                padding: "12px 20px",
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
                    }}
                  >
                    {t(capital)}
                  </Typography>

                  <Typography
                    variant="h5"
                    style={{ marginRight: "20px", fontWeight: "300" }}
                  >
                    {dataAndTime}
                  </Typography>
                </div>
                {/* == CITY & TIME == */}

                <hr
                  style={{ marginTop: direction == "rtl" ? "15px" : "10px" }}
                />

                {/* CONTAINER OF DEGREE + CLOUD ICON */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  {/* DEGREE & DESCRIPTION */}
                  {isFailed ? (
                    <WrongLocationIcon
                      className="wrong-location"
                      style={{ fontSize: "175px" }}
                    ></WrongLocationIcon>
                  ) : (
                    <div>
                      {/* TEMP */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        dir={"rtl"}
                      >
                        {isLoading ? (
                          <CircularProgress
                            style={{
                              color: "white",
                              margin: "25px 0",
                              width: "65px",
                              height: "65px",
                            }}
                          />
                        ) : (
                          <>
                            <Typography
                              variant="h1"
                              style={{ textAlign: "right" }}
                            >
                              {weather.temp}
                            </Typography>
                            <img src={weather.icon} alt="weather icon" />
                          </>
                        )}
                      </div>
                      {/*== TEMP ==*/}

                      <Typography
                        style={{
                          fontWeight: "200",
                          marginTop: "-10px",
                          marginBottom: "5px",
                        }}
                        variant="h6"
                      >
                        {t("Feels Like")}:
                        {weather.feelsLike ? (
                          " " + weather.feelsLike
                        ) : (
                          <CircularProgress
                            size={18}
                            style={{ color: "white", marginRight: "5px" }}
                          />
                        )}
                      </Typography>

                      <Typography
                        style={{ fontWeight: "300" }}
                        variant="h6"
                      >{`${t(weather.description)}`}</Typography>

                      {/* MIN & MAX */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="h6">
                          {t("High")}:{" "}
                          {weather.min ?? (
                            <CircularProgress
                              size={18}
                              style={{ color: "white" }}
                            />
                          )}
                        </Typography>
                        <h5 style={{ margin: "12px" }}>|</h5>
                        <Typography variant="h6">
                          {t("Low")}:{" "}
                          {weather.max ?? (
                            <CircularProgress
                              size={18}
                              style={{ color: "white" }}
                            />
                          )}
                        </Typography>
                      </div>
                    </div>
                  )}
                  {/*== DEGREE & DESCRIPTION ==*/}

                  {isFailed ? (
                    <div>
                      <p
                        style={{
                          fontSize: "35px",
                          color: "white",
                          lineHeight: "1.2",
                          marginBottom: "10px",
                        }}
                      >
                        {t("Whoops! a little glitch happened")}
                      </p>
                      <span
                        style={{
                          letterSpacing: "1.5px",
                        }}
                      >
                        {t("Please try again later")}
                      </span>
                    </div>
                  ) : (
                    <CloudIcon
                      style={{
                        fontSize: "200px",
                        color: "white",
                      }}
                    />
                  )}
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
                    return [
                      <ListSubheader key={`${capital}-header`}>
                        {t(arabCapitals[capital].country)}
                      </ListSubheader>,
                      <MenuItem key={capital} value={capital}>
                        {t(capital)}
                      </MenuItem>,
                    ];
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
