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
 * Name/function association Definitions
 * -------------------------------------
 * def <name> = <function>
 *
 * Simplified Notations
 * --------------------
 * def <names> = λ<name>.<expresssion> ==
 * def <names> <name> = <expression>
 *
 * cond <true choice> <false choice> <condition> ==
 * if <condition>
 * then <true choice>
 * else <false choice>
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

// Helper for observing results of applying functions in node.js
makeNodeInspectHelper = fxn => fxnLabel => () => `${fxnLabel} as [${typeof fxn}: ${fxn.name}]`;
 
/* ==============================================================================================================
 * B O O L E A N S
 * ---------------
 */

// def true = select_first
const TRUE = select_first;
//TRUE.inspect = () => `TRUE as [${typeof TRUE}: ${TRUE.name}]`;
TRUE.inspect = makeNodeInspectHelper(TRUE)('TRUE');

// def false = select_second
const FALSE = select_second;
//FALSE.inspect = () => `FALSE as [${typeof FALSE}: ${FALSE.name}]`;
FALSE.inspect = makeNodeInspectHelper(FALSE)('FALSE');

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

// def nand = λx.λy.(((cond (not y)) true) x) => ... => λx.λy.((x (not y)) true)
const NAND = x => y => x(NOT(y))(TRUE);

//def or = λx.λy.(((cond true) y) x) => ... => λx.λy.((x true) y)
const OR = x => y => x(TRUE)(y);

// def xor = λx.λy.(((cond (not y)) y) x) => ... => λx.λy.((x (not y)) y)
const XOR = x => y => x(NOT(y))(y);

// def implies = λx.λy.(((cond y) true) x) => ... => λx.λy.((x y) true)
const IMPLIES = x => y => x(y)(TRUE);

// def equiv = λx.λy.(((cond y) (not y)) x) => ... => λx.λy.((x y) (not y))
const EQUIV = x => y => x(y)(NOT(y));

/* ==============================================================================================================
 * N A T U R A L  N U M B E R S
 * ----------------------------
 * The approach is to define natural numbers (i.e. non-negative integers) as successors of zero, and to define zero as the identity function.
 */

// def zero = identity
const zero = identity;

/*
 * A successor function creates numbers.
 * For any arbitrary number, n, then n+1 is represented by the function λs.((s false) n)
 *
 * 1 = successor of 0
 * 2 = successor of 1 = successor of successor of 0
 * 3 = successor of 2 = successor of successor of successor of 0
 */

// def succ = λn.λs.((s false) n)
const succ = n => s => s(FALSE)(n);

const ZERO  = zero;
const ONE   = succ(ZERO);
const TWO   = succ(ONE);
const THREE = succ(TWO);
const FOUR  = succ(THREE);
const FIVE  = succ(FOUR);
const SIX   = succ(FIVE);
const SEVEN = succ(SIX);
const EIGHT = succ(SEVEN);
const NINE  = succ(EIGHT);
const TEN   = succ(NINE);

/*
 * A number is represented by a function with an argument, s, which may be used as a selector.
 * Consider using select_first as that argument.
 * Apply zero to select_first: (zero select_first) == (λx.x select_first) => select_first == true
 * Apply a non-zero natural number, n+1, to select_first: (λs.((s false) n) select_first) => ((select_first false) n) => ... => false
 * Therefore, applying any number to select_first gives us a test for zero.
 */

//def iszero = λn.(n select_first)
const iszero = n => n(select_first);

/*
 * A number is represented by a function with an argument, s, which may be used as a selector.
 * Consider using select_second as that argument.
 * Apply a non-zero natural number, n+1, to select_second: (λs.((s false) n) select_second) => ((select_second false) n) => ... => n
 * Therefore, applying any number to select_second strips off an application of the successor to give us the predecessor, n, and:
 *
 * def pred = λn.(n select_second)
 *
 * However, applying zero to select_second: (zero select_second) == (λx.x select_second) => select_second == false
 * So then (pred zero) => ... => false, which is not a representation of a number, ie. undefined.
 * Now, rather than accept that the predecessor of zero is undefined, we define the predecessor of zero to be zero and check for it using iszero to give a robust predecessor function.
 *
 */

// def pred = λn.(((iszero n) zero) (n select_second))
const pred = n => (iszero(n)(zero))(n(select_second));

/* ==============================================================================================================
 * R E P I T I T I O N,  I T E R A T I O N  A N D  R E C U R S I O N
 * -----------------------------------------------------------------
 * 
 */
/*
 * The Y-combinator
 * ----------------
 * def recursive f = λs.(f (s s)) λs.(f (s s)) =>
 * def recursive = λf.(λs.(f (s s)) λs.(f (s s)))
 *
 * def Y = recursive
 */
//const recursive = f => (s => f(s(s)))(s => f(s(s)));
const recursive = f => (s => (f(s(s)))(s => (f(s(s)))));
//const Y = f => (s => f(n => s(s)(n)))(s => f(n => s(s)(n)));

/* ==============================================================================================================
 * ARITHMETIC
 * ----------
 */

/*
 * def add1 f x y =
 *   if iszero y
 *   then x
 *   else f (succ x) (pred y) =>
 *
 * def add1 = λf.λx.λy.(cond x (f (succ x) (pred y)) (iszero y)) =>
 * def add1 = λf.λx.λy.(λe1.λe2.λc.((c e1) e2) x (f (succ x) (pred y)) (iszero y)) => ... =>
 * def add1 = λf.λx.λy.(((iszero y) x) (f (succ x) (pred y)))
 *
 * def add = Y add1
 */
//const add1 = f => x => y => iszero(y) === TRUE ? x : f(succ(x))(pred(y));
//const add = recursive(add1);
//const add1 = f => x => y => ((iszero(y))(x)(f(succ(x))(pred(y))));
const add1 = f => x => y => (((iszero(y))(x))((f(succ(x))(pred(y)))));

/*
 * def mult x y =
 *   if iszero y
 *   then zero
 *   else add x (mult x (pred y)) =>
 *
 * def add = λx.λy.(cond zero (add x (mult x (pred y))) (iszero y)) =>
 * def add = λx.λy.(λe1.λe2.λc.((c e1) e2) zero (add x (mult x (pred y))) (iszero y)) => ... =>
 * def add = λx.λy.(((iszero y) zero) (add x (mult x (pred y)))
 */

