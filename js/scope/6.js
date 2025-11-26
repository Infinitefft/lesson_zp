function foo() {
    // for (var i = 0; i < 7; i++) {
    for (let i = 0; i < 7; i++) {

    }
    console.log(i);  // var: 7, let: ReferenceError: i is not defined
}
foo();