import { Loader } from '@googlemaps/js-api-loader'
import { injectScript } from '../../utils/injectscript'

describe('utils/injectScript', () => {

  describe('injectScript', () => {
    beforeEach(() => {
      // reset singleton Loader
      Loader['instance'] = null;
      // clear document between tests
      document.getElementsByTagName('html')[0].innerHTML = '';
    });

    it('adds a script to the page with id and src attributes that correspond to the id and url properties', () => {
      const url = `http://localhost/script1.js`
      const value = injectScript({
        id: 'injectScript-test1',
        url,
        apiKey: ''
      })

      Loader['instance'].callback();

      const element = document.querySelector('#injectScript-test1') as HTMLScriptElement
      expect(element).toBeTruthy()
      expect(element.src).toMatch(url)
      return value
    })

    it('returns a promise which resolves when the script loads', async () => {
      const id = 'injectScript-test2'
      const url = `http://localhost/script2.js`

      const promise = injectScript({
        id,
        url,
        apiKey: ''
      });

      Loader['instance'].callback();

      await expect(promise).resolves.toBe(id);
    })

    describe('duplicate calls with matching id and url properties', () => {
      it('do not add another script element to the page', async () => {
        const id = 'injectScript-test4'
        const url = 'http://localhost/script4.js'

        const promise = Promise.all([
          injectScript({
            id,
            url,
            apiKey: ''
          }),
          injectScript({
            id,
            url,
            apiKey: ''
          })
        ]);

        Loader['instance'].callback();

        expect(document.querySelectorAll(`script`)).toHaveProperty('length', 1)
        await promise;
      })
    })
  })
})
