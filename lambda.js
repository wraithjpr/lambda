// lambda character lower case (λ) in Linux is: ctrl+shift+U 03BB
// lambda character upper case (Λ) in Linux is: ctrl+shift+U 039B

// def identity = lamda λx.x
const identity = x => x;

// def self_apply = λs.(s s)
const self_apply = s => s(s);

// def apply = λfunc.λarg.(func arg)
const apply = func => arg => func(arg);

