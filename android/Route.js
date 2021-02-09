import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Home from './Home.js'
import About from './About.js'
import Camera from './Camera'


const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "home" component = {Home} title = "Qrcode lecteur" initial = {true} />
         <Scene key = "about" component = {About} title = "formulaire" />
         <Scene key = "Camera" component = {Camera} title = "Camera" />




         
      </Scene>
   </Router>
)
export default Routes