# Assignment 5
# Emergency Service Directory — Bangladesh

A single-page web app that lists emergency hotlines as cards and shows a **Call History** panel. It implements the required UI and behaviors using 

## How to run
Just open `index.html` in any modern browser and run it

---

## Answers

### 1) `getElementById` vs `getElementsByClassName` vs `querySelector` / `querySelectorAll`

`getElementById(id)` returns one element by its ID, e.g., `const myDiv = document.getElementById("myDiv");`. `getElementsByClassName(className)` returns all elements with a class as an HTMLCollection, e.g., `const cards = document.getElementsByClassName("card");`. `querySelector(selector)` returns the first element matching a CSS selector, e.g., `const firstCard = document.querySelector(".card");`. `querySelectorAll(selector)` returns all elements matching a CSS selector as a NodeList, e.g., `const allCards = document.querySelectorAll(".card"); allCards.forEach(card => console.log(card));`.

### 2) How to create and insert a new element into the DOM?

To create and insert a new element into the DOM: `const newDiv = document.createElement("div"); newDiv.textContent = "Hello World!"; newDiv.className = "myDiv"; const parent = document.getElementById("container"); parent.appendChild(newDiv);` Other insertion options include `insertBefore(newNode, refNode)` or `prepend(newNode)`.

### 3)What is event bubbleing
Event Bubbling is when an event starts at the target element and moves up the DOM tree. For example, clicking a button inside a div triggers the button first, then the div, then the body, etc.


### 4)What is event deletion
Event Delegation involves attaching a single listener to a parent to handle events for its children. It uses event bubbling to detect child events and is useful for dynamic elements and better performance. 
Example: `document.getElementById("parent").addEventListener("click", (e) => { if(e.target && e.target.className === "child"){ console.log("Child clicked:", e.target.textContent); } });`.

### 5)preventDefault() and stopPropagation()
`preventDefault()` stops the default browser action, e.g., `event.preventDefault();`. `stopPropagation()` stops the event from bubbling up to parent elements, e.g., `event.stopPropagation();`.




