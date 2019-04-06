import React from "react"
import { render, fireEvent } from "react-testing-library";
import { LoadScript, GoogleMap } from "@react-google-maps/api"

describe("app", () => {
  it("should do something", () => {
    render(
    <LoadScript id="sdfsdf" googleMapsApiKey="AIzaSyAXY9iMqdva4rc7E4_BHhbm9jj_CXt2uNE"><GoogleMap
    id="circle-example"
    mapContainerStyle={{
      height: "400px",
      width: "800px"
    }}
    zoom={7}
    center={{
      lat: -3.745,
      lng: -38.523
    }}
  />
  </LoadScript>)
  })
})