import { createReducer, on, State } from '@ngrx/store';
import * as calculateAction from '../action/calculate.action'
import { Calculate } from 'src/models/calculate.models';


const initialState = <Calculate>{
    currentNumber: '0',
    previousNumber: '0',
    operator: '',
    result: '0',
};

export const calculateReducer = createReducer (
    initialState,
    on(calculateAction.EnterKey, (state, action) => {
        if (action.keyType == 'number') {
            
            let newState = { ...state };
            if (action.key == '.' && !state.currentNumber.includes(`${state.currentNumber}.`)) {
                if (!state.currentNumber.includes('.')) {
                    newState.currentNumber = state.currentNumber + '.';
                }
                console.log(newState)
                return newState;
            }
            if (state.currentNumber == '0') {
                newState.currentNumber = action.key;
                console.log(newState);
                if (state.operator != '' && state.previousNumber != '0') {
                    let result = 0;
                    switch (state.operator) {
                        case '+':
                            result =
                                parseFloat(state.previousNumber) + parseFloat(newState.currentNumber);
                            console.log(result);
                            break;
                        case '-':
                            result =
                                parseFloat(state.previousNumber) - parseFloat(newState.currentNumber);
                            break;
                        case '*':
                            result =
                                parseFloat(state.previousNumber) * parseFloat(newState.currentNumber);
                            break;
                        case '/':
                            result =
                                parseFloat(state.previousNumber) / parseFloat(newState.currentNumber);
                            break;
                    }
                    newState.result = result.toString();
                }
                console.log(newState);

            } else {
                newState.currentNumber = state.currentNumber + action.key;
                let result = 0;
                if (state.currentNumber != '0' && state.previousNumber != '0') {
                    switch (state.operator) {
                        case '+':
                            
                            result =
                                parseFloat(state.previousNumber) + parseFloat(newState.currentNumber);
                                
                            break;
                        case '-':
                            result =
                                parseFloat(state.previousNumber) - parseFloat(newState.currentNumber);
                            break;
                        case '*':
                            result =
                                parseFloat(state.previousNumber) * parseFloat(newState.currentNumber);
                            break;
                        case '/':
                            result =
                                parseFloat(state.previousNumber) / parseFloat(newState.currentNumber);
                            break;
                    }
                    newState.result = result.toString();
                }
                console.log(newState);
            }
            return newState;
        } else if (action.keyType == 'operator') {
            if (action.key == '+/-') {
                return {
                    ...state,
                    currentNumber: (parseFloat(state.currentNumber) * -1).toString(),
                };
            }
            if (action.key == '%') {
                return {
                    ...state,
                    currentNumber: (parseFloat(state.currentNumber) / 100).toString(),
                };
            }
            if (action.key == 'C') {
                return {
                    ...state,
                    currentNumber: '0',
                    previousNumber: '0',
                    operator: '',
                    result: '0',
                };
            }
            if (action.key == 'DEL') {
                let newState = { ...state };
                newState.currentNumber = 
                state.
                currentNumber.
                slice(0,state.currentNumber.length - 1) == '' ? '0' : state.
                currentNumber.
                slice(0,state.currentNumber.length - 1);
                if (state.operator != '' && state.previousNumber != '0') {
                    let result = 0;
                    switch (state.operator) {
                        case '+':
                            result =
                                parseFloat(state.previousNumber) + parseFloat(newState.currentNumber);
                            console.log(result);
                            break;
                        case '-':
                            result =
                                parseFloat(state.previousNumber) - parseFloat(newState.currentNumber);
                            break;
                        case '*':
                            result =
                                parseFloat(state.previousNumber) * parseFloat(newState.currentNumber);
                            break;
                        case '/':
                            result =
                                parseFloat(state.previousNumber) / parseFloat(newState.currentNumber);
                            break;
                    }
                    newState.result = result.toString();
                }
                console.log(newState);
                return newState;
            }
            if (action.key == '=') {
                let result = 0;
                switch (state.operator) {
                    case '+':
                        result =
                            parseFloat(state.previousNumber) + parseFloat(state.currentNumber);
                        break;
                    case '-':
                        result =
                            parseFloat(state.previousNumber) - parseFloat(state.currentNumber);
                        break;
                    case '*':
                        result =
                            parseFloat(state.previousNumber) * parseFloat(state.currentNumber);
                        break;
                    case '/':
                        result =
                            parseFloat(state.previousNumber) / parseFloat(state.currentNumber);
                        break;
                }
                return {
                    ...state,
                    currentNumber: result.toString(),
                    previousNumber: '0',
                    operator: '',
                    result: result.toString(),
                };
            } else {
                if(state.result != '0' && state.currentNumber!='0'){
                    return {
                        ...state,
                        previousNumber: state.result,
                        currentNumber: '0',
                        operator: action.key,
                        // result: result.toString(),
                    };
                }
                return {
                    ...state,
                    previousNumber: state.currentNumber,
                    currentNumber: '0',
                    operator: action.key,
                    // result: result.toString(),
                };
            }
        }
        return state;
    })
);