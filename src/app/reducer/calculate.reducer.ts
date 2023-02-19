import { createReducer, on } from '@ngrx/store';
import * as calculateAction from '../action/calculate.action'
import { Calculate } from '../models/calculate.models';


let initialState = {num : 0};

export const calculateReducer = createReducer (
    initialState,
  
);