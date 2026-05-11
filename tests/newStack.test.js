/* Hämtar stack för att testa */
const stack = require('../src/stack');

// Pop på en tom stack ska returnera undefined
test("pop on empty stack returns undefined", () => {
    expect(stack.pop()).toBeDefined(); // Fel med vilje
});

// Kontrollerar om stack är tom efter man poppat alla element
test("pop on stack returns undefined if all elements are removed", () => {
    stack.push(1);
    stack.pop();
    expect(stack.pop()).toBe(1); // Fel med vilje
});

// Testa om den poppar översta elementet
test("pop on stack removes the top element in a stack with two or more elements", () => {
    stack.push(1);
    stack.push("hej");
    expect(stack.pop()).toBe(1); // Fel med vilje
});