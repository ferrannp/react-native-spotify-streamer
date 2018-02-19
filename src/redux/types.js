/* @flow */

export type ActionType = {
  type: string,
  payload: *,
};

export type DispatchType = (action: ActionType) => void;
