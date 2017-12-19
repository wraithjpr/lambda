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
const select_second = first => second => second;

// def make_pair = λfirst.λsecond.λfunc.((func first) second)
const make_pair = first => second => func => func(first)(second);

// def true = select_first
const TRUE = select_first;
TRUE.inspect = () => `TRUE as [${typeof TRUE}: ${TRUE.name}]`;

// def false = select_second
const FALSE = select_second;
FALSE.inspect = () => `FALSE as [${typeof FALSE}: ${FALSE.name}]`;

/*
 * λe1.λe2.λc.((c e1) e2) implements the conditional (ternary) operator in JavaScript, condition ? expr1 : expr2
 * If c is true, then it is select_first and ((c e1) e2) == ((select_first e1) e2) => ... => e1. 
 * If c is false, then it is select_second and ((c e1) e2) == ((select_second e1) e2) => ... => e2. 
 */
// def cond = λe1.λe2.λc.((c e1) e2)
const cond = make_pair;

// def not = λx.(((cond false) true) x) => ... => λx.((x false) true)
const NOT = x => x(FALSE)(TRUE);

// def and = λx.λy.(((cond y) false) x) => ... => λx.λy.((x y) false)
const AND = x => y => x(y)(FALSE);

//def or = λx.λy.(((cond true) y) x) => ... => λx.λy.((x true) y)
const OR = x => y => x(TRUE)(y);




