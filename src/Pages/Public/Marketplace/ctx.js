import { createContext, useContext } from 'react'

/** Shared state for the marketplace page: tenant data, toast, drawer, current page. */
export const MktCtx = createContext(null)
export const useMkt = () => useContext(MktCtx)
