import { OPERATORS } from "./App";

type PrattNode = {
    value: string, 
    leftChild?: PrattNode,
    rightChild?: PrattNode
}

enum TokenTypes {
    VALUE, OPERATOR
}

export function peek<T> (list: T[]): T {
    return list.slice(-1)[0]; 
}

function getBindingPower(operator: string) {
    switch (operator) {
        case "+":
        case "-":
            return 1; 
        case "*":
        case "/":
            return 2;
        case "^": return 3;
        default: return 0; 
    }
}

export default function calculate(tokens: string): string {
    if (tokens.length === 0) return tokens;  

    const traverseTree = (node: PrattNode): number => {
        if (node.value === "ERR") return NaN;
        
        switch (node.value) {
            case "+": return traverseTree(node.leftChild!) + traverseTree(node.rightChild!);
            case "-": return traverseTree(node.leftChild!) - traverseTree(node.rightChild!);
            case "*": return traverseTree(node.leftChild!) * traverseTree(node.rightChild!);
            case "/": return traverseTree(node.leftChild!) / traverseTree(node.rightChild!);
            case "^": return traverseTree(node.leftChild!) ** traverseTree(node.rightChild!);
            default:
                return node.value.includes(".") ? parseFloat(node.value) : parseInt(node.value); 
        }
    }


    const result = traverseTree(exprToTree(tokens.split(" ").reverse(), 0));
    return Number.isNaN(result) ? tokens : "" + result; 
}

function exprToTree(tokens: string[], rbp: number): PrattNode {
    let curr = tokens.pop()!;
    let left: PrattNode; 

    // we can't simply assign a binding power to parentheses because 
    // they're not an operator 
    if (curr === "(") {
        let substream: string[] = [];
        while (peek(substream) !== ")") {
            const top = tokens.pop();
            if (top === undefined) {
                alert("Expression error: unexpected end of expression"); 
                return { value: "ERR" };
            } 
            substream.push(top); 
        }        
        left = exprToTree(substream.slice(0, -1).reverse(), 0); 
    } else {
        if (expectToken(TokenTypes.VALUE, curr)) return { value: "ERR" }; 
        left = { value: curr }; 
    }
    
    while (getBindingPower(peek(tokens)) > rbp) {
        left = parse_left(left, tokens); 
    } 

    return left; 
}

function parse_left(left: PrattNode, tokens: string[]): PrattNode {
    let currentOperator = tokens.pop()!; 
    if (expectToken(TokenTypes.OPERATOR, currentOperator)) return { value: "ERR" }; 

    return { value: currentOperator, leftChild: left, rightChild: exprToTree(tokens, getBindingPower(currentOperator)) };
}


function expectToken(type: TokenTypes, value: string): boolean {
    if (type === TokenTypes.VALUE && Number.isNaN(parseInt(value))) {
        alert(`Expression error: expected a number, but got "${value}"`);
        return true; 
    } else if (type === TokenTypes.OPERATOR && !OPERATORS.includes(value)) {
        alert(`Expression error: expected an operator, but got "${value}"`);
        return true; 
    }

    return false; 
}