import { RouteProps } from 'react-router-dom';
import { ROLES } from './constants';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    roles?: ROLES[];
};