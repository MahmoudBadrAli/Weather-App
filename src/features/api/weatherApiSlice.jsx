import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeather = createAsyncThunk(
  "weatherAPI/fetchWeather",
  async ({ lat, lon }) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f77d2383fef24695e931f17677bbf408`
    );

    const temp = response.data.main.temp;
    const feelsLike = response.data.main.feels_like;
    const min = response.data.main.temp_min;
    const max = response.data.main.temp_max;
    const description = response.data.weather[0].description;
    const responseIcon = response.data.weather[0].icon;

    return {
      temp: Math.round(temp - 273.15),
      feelsLike: Math.round(feelsLike - 273.15),
      min: Math.round(min - 273.15),
      max: Math.round(max - 273.15),
      description,
      icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
    };
  }
);

export const weatherApiSlice = createSlice({
  name: "weatherApi",
  initialState: {
    weather: {},
    isLoading: false,
    isFailed: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.weather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state) => {
        state.isLoading = false;
        state.isFailed = true;
      });
  },
});

// export const {} = weatherApiSlice.actions;

export default weatherApiSlice.reducer;
