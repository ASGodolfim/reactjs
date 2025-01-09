import { useState, useEffect, useReducer } from 'react';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

const initialState = {
  loading: false,
  error: null,
};

const updateReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { loading: true, error: null };
    case 'UPDATED_DOC':
      return { loading: false, error: null };
    case 'ERROR':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useUpdateDocument = (collection) => {
  const [response, dispatch] = useReducer(updateReducer, initialState);

  const updateDocument = async (id, updatedData) => {
    dispatch({ type: 'LOADING' });

    try {
      const db = getFirestore();
      const docRef = doc(db, collection, id);
      await updateDoc(docRef, updatedData);
      dispatch({ type: 'UPDATED_DOC' });
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.message });
    }
  };

  return { updateDocument, response };
};