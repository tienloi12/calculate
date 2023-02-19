import { createAction, props } from '@ngrx/store';

export const EnterKey = createAction(
    '[Calculate] Enter Key',
    props<{ key: string, keyType: string}>()
)

export const PrintResult = createAction(
    '[Calculate] Result',
    props<{ result: string}>()
)