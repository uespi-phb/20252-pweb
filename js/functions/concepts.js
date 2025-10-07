/*
 * First-Class Citizens
 *
 * No paradigma funcional, funções são tratadas como valores — ou seja:
 * - Podem ser atribuídas a variáveis ou constantes
 * - Podem ser passadas como argumentos para outras funções
 * - Podem ser retornadas de outras funções
 * - Podem ser armazenadas em estruturas de dados (como arrays ou objetos)
 */

const sayHello = () => console.log('Hello')

const executor = (fn) => fn()

executor(sayHello) // Executa a função passada

/*
 * Higher-Order Functions
 *
 * São funções que:
 * - Recebem uma ou mais funções como argumento, e/ou
 * - Retornam uma nova função como resultado
 *
 * Essas funções promovem reuso, composição e abstração.
 */

const applyTwice = (fn) => (value) => fn(fn(value))

const double = (x) => x * 2

const doubleTwice = applyTwice(double)

console.log(doubleTwice(5)) // 20

/*
 * Function Composition
 *
 * É o processo de combinar funções menores para formar funções maiores
 * e mais poderosas. O resultado de uma função vira a entrada da próxima.
 */

const add = (x) => x + 1
const square = (x) => x * x

const composed = (x) => square(add(x)) // composição de add e square

console.log(composed(2)) // (2 + 1)^2 = 9

/*
 * Call Chaining
 *
 * É a técnica de encadear várias operações onde cada uma retorna
 * um valor compatível com a próxima
 * - comum em métodos como map, filter, reduce.
 */

const numbers = [1, 2, 3, 4, 5]

const result = numbers
  .map((n) => n * 2)
  .filter((n) => n > 5)
  .reduce((acc, curr) => acc + curr, 0)

console.log(result) // 18
