let a = 1;
console.log(a);

(function() {
    console.log(a);
})();

(function() {
    let a = 3;
    console.log(a);
    (function() {
        console.log(a);
    })();

    (function(a) {
        console.log(a);
    })(4);
})();



module.exports = {
    a: a
}