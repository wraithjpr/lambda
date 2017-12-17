/*
 * My experiments with lambda calculus
 * Sources:
 * Michaelson, Greg; An Introduction to Functional Programming Through Lambda Calculus; Dover; 2011
 */
/*
 * λ Expressions
 * -------------
 * <expression> ::= <name> | <function> | <application>
 * <name> ::= any sequence of non-blank characters
 * <function> ::= λ<name>.<body>
 * <body> ::= <expression>
 * <application> ::= (<function expression> <argument expression>)
 * <function expression> ::= <expression>
 * <argument expression> ::= <expression>
 *
 * def <name> = <function>
 *
 */
/* A λ function is an abstraction over a λ expression. The λ precedes and introduces a name used for abstraction. The name is called the function's 'bound variable'. The '.' separates the name from the expression in which the abstraction with that name takes place. This expression is called the function's 'body'.
 * A function application specialises an abstraction by providing a value for the name. The function expression contains the abstraction to be specialised with the argument expression. A function application is also known as a 'bound pair' and the function expression is said to be 'applied to' the argument expression.
 * We may define a name/function association, a 'def'. For convenience and clarity, we can use the <name> in expressions to stand for the <function>
 */
/*
 * Beta Reduction
 * --------------
 * A β reduction is the replacement of a bound variable with an argument in a function body.
 *   (<name> <argument>) == (<function> <argument>)
 *   (<function> <argument>) => <expression>
 */
/*
 * beta character lower case (β) in Linux is: ctrl+shift+U 03B2
 * beta character upper case (Β) in Linux is: ctrl+shift+U 0392
 * lambda character lower case (λ) in Linux is: ctrl+shift+U 03BB
 * lambda character upper case (Λ) in Linux is: ctrl+shift+U 039B
 */

/*
 * My Lambda Functions
 * -------------------
 */

// def identity = λx.x
const identity = x => x;

// def self_apply = λs.(s s)
const self_apply = s => s(s);

// def apply = λfunc.λarg.(func arg)
const apply = func => arg => func(arg);

// def select_first = λfirst.λsecond.first
const select_first = first => second => first;

// def select_second = λfirst.λsecond.second
const select_first = first => second => first;

// def make_pair = λfirst.λsecond.λfunc.((func first) second)
const make_pair = first => second => func => func(first)(second);

