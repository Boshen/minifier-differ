import './style.css'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    hi
  </div>
`

setupCounter(document.querySelector('#counter'))
