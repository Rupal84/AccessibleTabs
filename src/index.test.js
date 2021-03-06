import { fireEvent, getByRole } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import '../localStorageMock'

require('iconv-lite').encodingExists('foo');

const options = {
  resources: 'usable',
  runScripts: 'dangerously',
};

const loadHtml = () => {
  return new Promise((resolve, reject) => {
    JSDOM.fromFile('src/index.html', options)
      .then((dom) => {
        dom.window.addEventListener('load', () => {
          resolve(dom.window.document.body)
        })
      })
  })
}

describe('index.html', () => {
  it('renders a heading element', (done) => {
    loadHtml().then((container) => {
      done()
      const header = container.querySelector('#header')
      expect(header.textContent).toEqual('Accessible Tabs');
    })
  });

  it('selects a particular tab with mouse click', (done) => {
    loadHtml().then((container) => {
      done();
      const btn = container.querySelector('#seabrook');
      fireEvent.click(btn);
      expect(btn).toHaveAttribute('aria-selected', 'true');
    })
  });

  it('selects a value from listbox and activate tab', (done) => {
    loadHtml().then((container) => {
      done();
      const listBox = getByRole(container, 'listbox');
      fireEvent.change(listBox, { target: { value: 'pointcook' } });
      const tab = container.querySelector('#pointcook');
      expect(tab).toHaveAttribute('aria-selected', 'true');
    })
  });

  it('press end button and activate last tab', (done) => {
    loadHtml().then((container) => {
      done();
      const listBox = getByRole(container, 'listbox');
      fireEvent.change(listBox, { target: { value: 'pointcook' } });
      const pointCookTab = container.querySelector('#pointcook');
      fireEvent.keyDown(pointCookTab, { key: 'End', code: 'End', keyCode: 35, charCode: 35 });
      const springvaleTab = container.querySelector('#springvale');
      expect(springvaleTab).toHaveAttribute('aria-selected', 'true');
    })
  });

  it('press home button and activate first tab', (done) => {
    loadHtml().then((container) => {
      done();
      const listBox = getByRole(container, 'listbox');
      fireEvent.change(listBox, { target: { value: 'springvale' } });
      const springvaleTab = container.querySelector('#springvale');
      fireEvent.keyDown(springvaleTab, { key: 'Home', code: 'Home', keyCode: 36, charCode: 36 });
      const altonaTab = container.querySelector('#altona');
      expect(altonaTab).toHaveAttribute('aria-selected', 'true');
    })
  });

  it('press delete button and activate previous tab', (done) => {
    loadHtml().then((container) => {
      done();
      const listBox = getByRole(container, 'listbox');
      fireEvent.change(listBox, { target: { value: 'springvale' } });
      const springvaleTab = container.querySelector('#springvale');
      fireEvent.keyDown(springvaleTab, { key: 'Delete', code: 'Delete', keyCode: 46, charCode: 46 });
      const docklandsTab = container.querySelector('#docklands');
      expect(docklandsTab).toHaveAttribute('aria-selected', 'true');
    })
  }); 
});