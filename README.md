# M1 Dividend Table
Userscript for Tampermonkey scrapes the activities page into an HTML table onto the clipboard to easily paste onto any spreadsheet.

## Table of Content

-   [Process](https://github.com/sauld95/M1_Dividend_Table/blob/main/README.md#process)
-   [Styling](https://github.com/sauld95/M1_Dividend_Table/blob/main/README.md#Styling)
## Process
```javascript
// Checks if the class provided in the argument loads on the page first before running the code
waitForKeyElements ( 'div.eBXlUG', initiateBtn)
``` 

`initiateBtn()` runs two functions, the first function, `creatBtn()`, creates and styles the button on the DOM. The second function, `copyData()`, scrapes the data and converts the data into an HTML table and is gsent to the system clipboard.

#### Input
```javascript
let tblRows = ''

set.forEach(item => {
  let [date, info, ticker, amount] = item.children

  ticker = ticker.textContent.match(/\S+/)[0]
  amount = parseFloat(amount.textContent.replace(/[$+]+/g, ''))
  
  // Data is concatenated and added to tblRows
  tblRows += `<tr><td>`+date.textContent+`</td><td>`+ticker+`</td><td>`+amount+`</td></tr>`
})

let table = `<table><tbody>`+tblRows+`</tbody></table>`

// Format is set to text/html so HTML tags are not pasted
GM_setClipboard(table, {mimetype: 'text/html'})
```
#### Output
|    | A            | B     | C    |  |
|:--:|:--:          |:--:   |:--:  |--|
|1   | Feb 1, 2022  | QYLD  |13.72 |  |
|2   | Feb 1, 2022  | T     |10.51 |  |
|3   | Jan 31, 2022 | LTC   |3.76  |  |
|4   | Jan 18, 2022 | STAG  |1.65  |  |
|    |              |       |      |  |


## Styling
createBtn() created the button using the same class as M1.
```javascript
let span = setElement('span', {class: ['ihURts', 'eqIqlk'], 'font-size': '14px', 'font-weight': '600'})
let text = document.createTextNode('Copy Table')
span.appendChild(text)
```
The first parameter takes an element as its argument, and the second parameter takes an object. The class uses an array in the object, while any other attribute uses a string.
```javascript
const setElement = (el, obj) => {
  let element = document.createElement(el)
  obj.class ? element.classList.add(...obj.class) : null

  let objArr = Object.keys(obj)
  let index = objArr.indexOf('class')

  // Removes the class property
  if (index > -1) objArr.splice(index, 1)
  
  // Checks if any other attributes are available
  if (objArr.length > 0) {
    objArr.forEach(function (key) {
      element.setAttribute(key, obj[key])
    })
  }
  return element
}
```
