import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'searchSolution',
  initialState: {
    token: '',
    vehicles: [],
    planets: [],
    selectedVehicles:['','','',''],
    selectedPlanets:['','','',''],
    toSelectVehicles:[],
    time:0,
    reset:false
  },
  reducers: {
    fetchToken: (state, action) => {
      state.token = action.payload;
    },
    fetchVehicles: (state, action) => {
      state.vehicles = action.payload;
    },
    fetchPlanets: (state, action) => {
      state.planets = action.payload;
    },
    addVehicles: (state, action) => {
      state.selectedVehicles = action.payload;
    },
    addPlanet: (state, action) => {
      state.selectedPlanets = action.payload;
    },
    addToSelectVehicles: (state, action) => {
      state.toSelectVehicles = action.payload;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },  
    reset: (state) => {
        state.selectedVehicles = ['','','',''];
        state.selectedPlanets = ['','','',''];
        state.reset = true;
    },
    revert: (state) => {
        state.reset = false;
    }

  },
})

export const { 
    fetchToken,
    fetchVehicles, 
    fetchPlanets,
    addVehicles,
    addPlanet,
    addToSelectVehicles,
    setTime,
    reset,
    revert
 } = slice.actions


export default slice.reducer