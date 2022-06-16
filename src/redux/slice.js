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
    reset: (state) => {
        state.selectedVehicles = [];
        state.selectedPlanets = [];
    },
  },
})

export const { 
    fetchToken,
    fetchVehicles, 
    fetchPlanets,
    addVehicles,
    addPlanet,
    addToSelectVehicles,
    reset
 } = slice.actions


export default slice.reducer