import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'searchSolution',
  initialState: {
    token: '',
    rockets: [],
    planets: [],
    selectedRockets:['','','',''],
    selectedPlanets:['','','',''],
    toSelectRockets:[],
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
      state.selectedRockets = action.payload;
    },
    addPlanet: (state, action) => {
      state.selectedPlanets = action.payload;
    },
    addToSelectRockets: (state, action) => {
      state.toSelectRockets = action.payload;
    },
    reset: (state) => {
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
    addToSelectRockets,
    reset
 } = slice.actions


export default slice.reducer