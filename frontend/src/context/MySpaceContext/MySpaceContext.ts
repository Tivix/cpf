import {createContext, useContext} from "react";
import {IMySpaceContext} from "./MySpaceProvider.interface";
import {initialState} from "./initialState";

export const MySpaceContext = createContext<IMySpaceContext>(initialState);

export const useMySpaceContext = () => useContext(MySpaceContext);
