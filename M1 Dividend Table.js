// ==UserScript==
// @name         M1 Dividend Button
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Copy a table of the dividend
// @author       Saul D
// @match        https://dashboard.m1finance.com/d/invest/activity
// @icon         https://www.google.com/s2/favicons?sz=64&domain=m1finance.com
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant        none
// ==/UserScript==
/* globals jQuery, waitForKeyElements */

/* Button designed to match the M1 Theme*/
const setElement = (el, obj) => {
  let element = document.createElement(el)
  obj.class ? element.classList.add(...obj.class) : null

  let objArr = Object.keys(obj)
  let index = objArr.indexOf('class')

  if (index > -1) objArr.splice(index, 1)
  if (objArr.length > 0) {
    objArr.forEach(function (key) {
      element.setAttribute(key, obj[key])
    })
  }
  return element
}

const processBtn = () => {
  /* Create button on the DOM */
  let style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = `.replacementCSS { background-color: rgb(217, 222, 245); border-radius: 16px; padding: 6px 16px; }`
  document.querySelector('head').appendChild(style)

  let span = setElement('span', {class: ['ihURts', 'eqIqlk'], 'font-size': '14px', 'font-weight': '600'})
  let text = document.createTextNode('Copy This Text')
  span.appendChild(text)

  let subDiv = setElement('div', {class: ['replacementCSS', 'ikdNEJ'], id: 'subDiv', display: 'flex'})
  subDiv.appendChild(span)

  let mainDiv = setElement('div', {class: ['iptKJC'], id: 'TMbutton'})
  mainDiv.appendChild(subDiv)

  let btn = document.querySelectorAll('.iptKJC')
  let btnLen = Array.from(btn).length
  btn[btnLen-1].after(mainDiv)

  /* On click function */
  let divBtn = document.querySelector('#TMbutton')

  divBtn.addEventListener('copy', e => {
    let set = Array.from(document.querySelectorAll('.gMuZof'))
    let tblRows = ''
    let divTotal = 0

    set.forEach(item => {
      let [date, info, ticker, amount] = item.children

      ticker = ticker.textContent.match(/\S+/)[0]
      amount = parseFloat(amount.textContent.replace(/[$+]+/g, ''))

      tblRows += `<tr><td>`+date.textContent+`</td><td>`+ticker+`</td><td>`+amount+`</td></tr>`
      divTotal += amount
    })

    alert('Total Dividends $'+divTotal.toFixed(2))
    let table = `<table><tbody>`+tblRows+`</tbody></table>`
    /*  Can't use because Google Chrome does not support the ClipboardItem constructor
    let dat = new Blob()
    let data = [new ClipboardItem({ "text/html": new Blob([table], { type: "text/html" }) })]
    navigator.clipboard.write(data).then(function() {
      console.log("Copied to clipboard successfully!");
    }, function() {
      console.error("Unable to write to clipboard. :-(");
    })*/

    e.clipboardData.setData('text/html', table)
    e.preventDefault()
  })
}

waitForKeyElements ( 'div.eBXlUG', processBtn)
