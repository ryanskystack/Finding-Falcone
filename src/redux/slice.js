import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'searchSolution',
  initialState: {
    token: '',
    rockets: [],
    planets: [],
    selectedRockets:[],
    selectedPlanets:[],
  },
  reducers: {
    fetchToken: (state, action) => {
      state.token = action.payload;
    },
    fetchRockets: (state, action) => {
      state.rockets = action.payload;
    },
    fetchPlanets: (state, action) => {
      state.planets = action.payload;
    },
    addRocket: (state, action) => {
      state.selectedRockets.push(action.payload)
    },
    addPlanet: (state, action) => {
        state.selectedPlanets.push(action.payload);
    },
    reset: (state, action) => {
        state.selectedRockets = [];
        state.selectedPlanets = [];
    },
  },
})

export const { 
    fetchToken,
    fetchRockets, 
    fetchPlanets,
    addRocket,
    addPlanet,
    reset
 } = slice.actions


export default slice.reducer