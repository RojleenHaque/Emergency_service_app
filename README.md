# Assignment 5
# Emergency Service Directory — Bangladesh (Vanilla JS)

A single-page web app that lists emergency hotlines as cards and shows a **Call History** panel. It implements the required UI and behaviors using **HTML, CSS, and Vanilla JavaScript**.

## How to run
Just open `index.html` in any modern browser.

---

## Answers

### 1) `getElementById` vs `getElementsByClassName` vs `querySelector` / `querySelectorAll`

- `getElementById(id)` → returns **one element** with that exact id. Super fast; no CSS selectors.
- `getElementsByClassName(class)` → returns a **live HTMLCollection** of elements that have the class. It updates automatically if the DOM changes.
- `querySelector(css)` → returns the **first match** for a CSS selector (e.g., `'#box'`, `'.card .btn'`).
- `querySelectorAll(css)` → returns a **static NodeList** of **all matches** for a CSS selector; it does **not** update when DOM changes unless you call it again.

Use `querySelector/All` when you want the flexibility of CSS selectors. Use `getElementById` for a single known element. Use `getElementsByClassName` if you specifically need that live collection (which is rare).

---

### 2) How to create and insert a new element into the DOM?

```js
const li = document.createElement('li');   // 1) create
li.textContent = 'Hello';                  // 2) configure
li.classList.add('item');

const list = document.querySelector('#list');
list.appendChild(li);                      // 3) insert as last child
// Alternatives: list.prepend(li), parent.insertBefore(li, ref), node.after(newNode)

