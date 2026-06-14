import { useMemo, useReducer, createContext, useContext, useEffect } from 'react'

export const RoutingContext = createContext<any>(null);
export const RoutingDispatchContext = createContext<any>(null);

export function Router({ children }: any) {

    let initialPageStatus = window.location.pathname.slice(1).toLowerCase();

    const [pageStatus, dispatch] = useReducer<any, any>(pageStatusReducer, initialPageStatus);

    // reducer function
    function pageStatusReducer(state: string, action: { type: string, url: string }) {
        switch (action.type) {
            case 'update': {
                history.pushState({ id: action.url }, "", action.url);
                return action.url;
            }
            case 'navigate': {
                return action.url
            }
        }
    }

    // memoized page url string and reducer function
    const value = useMemo(() =>
        ({ pageStatus, pageStatusReducer }),
        [pageStatus, pageStatusReducer]
    );

    // call dispatch for navigation through browser history
    const historyState = () => {
        dispatch({
            type: 'navigate',
            url: window.location.pathname.slice(1).toLowerCase()
        })
    }

    useEffect(() => {
        window.addEventListener('popstate', historyState);
        return () => {
            window.removeEventListener('popstate', historyState);
        }
    }, []);

    return (
        <RoutingContext value={value} >
            <RoutingDispatchContext value={dispatch}>
                <title>{`Geopulse ${pageStatus}`}</title>
                {children}
            </RoutingDispatchContext>
        </RoutingContext>
    )
}

export function useRouting() {
    return useContext(RoutingContext);
}

export function useRoutingDispatch() {
    return useContext(RoutingDispatchContext);
}