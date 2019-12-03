import { applyUpdaterToNextProps } from './../../utils/helper'

const updaterMap = {
  center: jest.fn(),
  radius: jest.fn()
}

describe("utils/helper", () => {
  describe('applyUpdaterToNextProps', () => {
    it("should invoke updater function if prop changed and not invoke if it hasn't", () => {
      applyUpdaterToNextProps(updaterMap, {}, {center: 1}, {})

      expect(updaterMap.center).toBeCalledTimes(1)
      expect(updaterMap.radius).not.toBeCalled()
    })
  })

})
