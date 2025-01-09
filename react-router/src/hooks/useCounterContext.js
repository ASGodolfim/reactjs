import { useContext } from 'react';
import { CounterContext } from '../context/CounterContext';

export const useCounterContext = () => {
    return useContext(CounterContext);
};