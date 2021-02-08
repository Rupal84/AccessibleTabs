import { fireEvent } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import '../localStorageMock'

require('iconv-lite').encodingExists('foo');

const options = {
  resources: 'usable',
  runScripts: 'dangerously',
};

describe('index.html', () => {
  it('renders a heading element', (done) => {
    JSDOM.fromFile('src/index.html', options)
      .then((dom) => {
        dom.window.addEventListener('load', () => {
          done();
          const container = dom.window.document.body;
          const btn = container.querySelector('#seabrook')
          fireEvent.click(btn);  
          expect(btn).toHaveAttribute('aria-selected', 'true');    
        })       
      })
  })
});