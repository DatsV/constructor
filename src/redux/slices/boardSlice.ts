import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface Item {
  id: string;
  body: string;
  type: string;
}

interface BoardState {
  items: Item[] | null;
}

const initialState: BoardState = {
  items: null,
};

export const boardSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Item>) => {
      if (state.items) {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }

      return {
        ...state,
        items: [action.payload],
      };
    },
    overwriteItems: (state, action: PayloadAction<Item[]>) => {
      return {
        ...state,
        items: [...action.payload],
      };
    },
    deleteItem: (state, action: PayloadAction<Item['id']>) => {
      if (state.items) {
        return {
          ...state,
          items: [
            ...state.items.filter((element) => element.id !== action.payload),
          ],
        };
      }
    },
    updateItem: (state, action: PayloadAction<Pick<Item, 'id' | 'body'>>) => {
      if (state.items) {
        return {
          ...state,
          items: [
            ...state.items.map((el) => {
              if (el.id === action.payload.id) {
                const newEl = {
                  ...el,
                  body: action.payload.body,
                };
                return newEl;
              }
              return el;
            }),
          ],
        };
      }
    },
  },
});

export const { add, overwriteItems, deleteItem, updateItem } =
  boardSlice.actions;

export const boardItems = (state: RootState) => state.board.items;

export default boardSlice.reducer;
