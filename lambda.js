// def identity = lamda x.x
const identity = x => x;

// def self_apply = lambda s.(s s)
const self_apply = s => s(s);

// def apply = lambda func.lambda arg.(func arg)
const apply = func => arg => func(arg);


