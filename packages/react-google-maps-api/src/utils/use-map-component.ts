// import { useState, useEffect, useContext } from "react"

// import MapContext from "../map-context"

// import {
//   unregisterEvents,
//   applyUpdatersToPropsAndRegisterEvents
// } from "./helper"

// export default function useMapComponent(props) {
//   const [instance, setInstance] = useState(null)
//   const context = useContext(MapContext)

//   let tempInstance

//   console.log({ context })

//   if (!instance) {
//     console.log(props.className, new google.maps[props.className]())

//     tempInstance = new google.maps[props.className]()

//     setInstance(tempInstance)

//     tempInstance.setMap(context)
//   }

//   console.log({ tempInstance })

//   useEffect(() => {
//     console.log(props, tempInstance)
//     const registeredEvents = applyUpdatersToPropsAndRegisterEvents({
//       ...props,
//       instance: tempInstance
//     })

//     return () => {
//       unregisterEvents(registeredEvents)
//     }
//   })

//   return "was here"
// }
