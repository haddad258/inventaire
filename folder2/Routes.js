import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Codelecteur from './Codelecteur.js'
import Formulaires from './Formulaires.js'
import Chooselocation from './Chooselocation.js'
import Listenewartice from './Listenewartice.js'

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "Chooselocation" component = {Chooselocation} title = "Chooselocation"  />
         <Scene key = "Codelecteur" component = {Codelecteur} title = "Codelecteur"  />
         <Scene key = "Formulaires" component = {Formulaires} title = "Formulaires"  />
         <Scene key = "Listenewartice" component = {Listenewartice} title = "Listenewartice" initial = {true} />




         

      </Scene>
   </Router>
)
export default Routes