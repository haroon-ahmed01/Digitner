import { createContext, useContext } from 'react'

/** Shared state for the waitlist drawer, the toast and the saved agents. Provider: WorkspaceProvider.jsx */
export const Ctx = createContext(null)

export const useWorkspace = () => useContext(Ctx)

/** Just the toast function: `const toast = useToast(); toast('Saved')` */
export const useToast = () => useContext(Ctx).toast
