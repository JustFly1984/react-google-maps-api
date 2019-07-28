import { injectScript } from '../../utils/injectscript'

interface WindowWithGoogleMap extends Window {
  initMap?: () => void;
}

// interface ScriptWithOnErrorHandler extends Element {
//     onerror?: (err: Error) => void;
// }

describe('utils/injectScript', () => {
  // let urls: string[] = [];

  // function createScriptUrl(script = '(function(){ var a = 1; })()') {
  //     const b = new Blob([script], { type: 'text/javascript' });
  //     const url = URL.createObjectURL(b);
  //     urls.push(url)
  //     return url;
  // }

  // afterAll(() => urls.forEach(url => URL.revokeObjectURL(url)));

  describe('injectScript', () => {
    it('adds a script to the page with id and src attributes that correspond to the id and url properties', () => {
      const url = `http://localhost/script1.js`
      const value = injectScript({
        id: 'injectScript-test1',
        url,
      })


      setTimeout(() => {
        const win: WindowWithGoogleMap = window
        if(win.initMap) {
          win.initMap()
        }
      }, 0)

      const element = document.querySelector('#injectScript-test1')
      expect(element).toBeTruthy()
      expect(element).toHaveProperty('src', url)
      return value
    })

    it('returns a promise which resolves when the script loads', () => {
      const id = 'injectScript-test2'
      const url = `http://localhost/script2.js`

      setTimeout(() => {
        const win: WindowWithGoogleMap = window
        if(win.initMap) {
          win.initMap()
        }
      }, 0)

      return injectScript({
        id,
        url,
      })
        .then(value => expect(value).toBeTruthy())
    })


    // it('returns a promise which rejects if the script does not load', () => {
    //     const id = 'injectScript-test3'
    //     const url = `http://localhost/script3.js`

    //     setTimeout(() => {
    //         const script: ScriptWithOnErrorHandler | null = document.querySelector(id);
    //         console.log(script && script.onerror);
    //         console.log('onerror');
    //         if(script && script.onerror) {
    //             script.onerror(new Error());
    //         }
    //     }, 0)

    //     return injectScript({
    //         id,
    //         url,
    //     })
    //         .then(() => expect('This then should not run').toBe(''))
    //         .catch(value => expect(value).toBeInstanceOf(Error))
    // })

    describe('duplicate calls with matching id and url properties', () => {
      it('do not add another script element to the page', () => {
        const id = 'injectScript-test4'
        const url = 'http://localhost/script4.js'

        injectScript({
          id,
          url,
        })

        const value = injectScript({
          id,
          url,
        })


        setTimeout(() => {
          const win: WindowWithGoogleMap = window
          if(win.initMap) {
            win.initMap()
          }
        }, 0)

        expect(document.querySelectorAll(`script[src="${url}"]`)).toHaveProperty('length', 1)
        return value
      })

      it('do not resolve in successive calls unless the script has actually loaded from the first call', () => {
        const id = 'injectScript-test5'
        const url = 'http://localhost/script5.js'
        let initMapCalled = false

        const value1 = injectScript({
          id,
          url,
        })

        const value2 = injectScript({
          id,
          url
        })

        setTimeout(() => {
          const win: WindowWithGoogleMap = window
          if(win.initMap) {
            initMapCalled = true
            win.initMap()
          }
        }, 50)

        return value2.then(() => {
          expect(initMapCalled).toBe(true)
          return value1
        })
      })

    })
  })
})