/**
 * @jest-environment jsdom
 */

import { Clusterer } from '../Clusterer'

describe('Clusterer', () => {
  describe('CALCULATOR', () => {
    const elementMock = document.createElement('div')
    const mapMock = new window.google.maps.Map(elementMock)
    const markerMock = new google.maps.Marker()

    const clusterer = new Clusterer(mapMock)
    const { calculator } = clusterer

    it('should return index 1 for no markers', () => {
      const markers: google.maps.Marker[] = []
      const numStyles = 10
      const actual = calculator(markers, numStyles)

      expect(actual).toEqual({
        text: '0',
        index: 1,
        title: '',
      })
    })

    it('should return index 1 for single marker', () => {
      const markers = [markerMock]
      const numStyles = 10
      const actual = calculator(markers, numStyles)

      expect(actual).toEqual({
        text: '1',
        index: 1,
        title: '',
      })
    })

    it('should return index 1 for 1-digit number of markers', () => {
      const markers = Array.from({ length: 9 }, () => markerMock)
      const numStyles = 10
      const actual = calculator(markers, numStyles)

      expect(actual).toEqual({
        text: '9',
        index: 1,
        title: '',
      })
    })

    it('should return index 2 for 2-digit number of markers', () => {
      const markers = Array.from({ length: 99 }, () => markerMock)
      const numStyles = 50
      const actual = calculator(markers, numStyles)

      expect(actual).toEqual({
        text: '99',
        index: 2,
        title: '',
      })
    })

    it('should return index 3 for 3-digit number of markers', () => {
      const markers = Array.from({ length: 125 }, () => markerMock)
      const numStyles = 10
      const actual = calculator(markers, numStyles)

      expect(actual).toEqual({
        text: '125',
        index: 3,
        title: '',
      })
    })

    it('should return index = numStyles if it is smaller than calculated index', () => {
      const markers = Array.from({ length: 10_000 }, () => markerMock)
      const numStyles = 3
      const actual = calculator(markers, numStyles)

      expect(actual).toEqual({
        text: '10000',
        index: 3,
        title: '',
      })
    })
  })
})
