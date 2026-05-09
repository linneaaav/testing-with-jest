import * as stack from './stack.js';

window.onload = function() {
    console.log("done");

    const pop = document.getElementById("pop");
    const push = document.getElementById("push");
    const peek = document.getElementById("peek");
    const display = document.getElementById("top-of-stack");

    pop.addEventListener("click", function() {
        let text = "Tog bort " + stack.pop();
        alert(text);
    });

    push.addEventListener("click", function() {
        let input = prompt("Vad ska vi lägga på stacken?");
        stack.push(input);
        display.innerHTML = input;
    });

    peek.addEventListener("click", function() {
        display.innerHTML = stack.peek();
    });
};