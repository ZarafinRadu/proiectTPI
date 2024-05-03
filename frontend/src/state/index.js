import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    mode:'dark',
    user:null,
    token:null,
    initialArr:["Berlin", "Madrid", "London", "Ibiza", "Antalya", "Hurghada", "New York City", "Bora Bora", "Rome", "Tokyo", "Maldives", "Phuket", "Dubai", "Miami", "Singapore"],
    cities:[],
    search:'',
    city:'',
    searchResults:[],
    listings:{},
    favorites:[]
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setMode:(state)=>{
            state.mode = state.mode==='light' ? 'dark' :'light'
        },
        setLogin:(state,action)=>{
            state.user = action.payload.user
            state.token = action.payload.token
        },
        setLogout:(state)=>{
            state.user = null;
            state.token = null;
        },
        setCities:(state,action)=>{
            state.cities = action.payload.cities
        },
        setSearch:(state,action)=>{
            state.search=action.payload.search
        },
        setCity:(state,action)=>{
            state.city=action.payload.city
        },
        setSearchResults:(state,action) =>{
            state.searchResults=action.payload.searchResults
        },
        setListings:(state,action)=>{
            state.listings = action.payload.listings
        },
        setFavorites:(state,action)=>{
            state.favorites = [...state.favorites,action.payload]
        },
        setInitialFavorites:(state,action)=>{
            state.favorites = action.payload
        },
        setResetFavorites:(state)=>{
            state.favorites=[]
        },
        setRemoveFavs:(state,action)=>{
            state.favorites = state.favorites.filter(fav=>fav.favorites!==action.payload.id)
        }
    }
})

export const {setMode, setLogin, setLogout, setCities, setSearch, setCity, setSearchResults, setListings, setFavorites, setRemoveFavs,setResetFavorites, setInitialFavorites} = authSlice.actions
export default authSlice.reducer