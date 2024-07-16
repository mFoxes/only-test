import { useSelector } from 'react-redux';
import { RootState } from '../types/store';

export const useAppSelector = useSelector.withTypes<RootState>();
