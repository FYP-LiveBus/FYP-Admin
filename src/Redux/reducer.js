import * as actions from './actionTypes'

const initialState = {
    isLoggedIn: false,
    user:{},
    drivers : [],
    students: [],
    bus:[],
    conductors:[],
    routes:[],
    admins:[],
    subadmins:[],
}

const reducer = ( state = initialState, action) => {
    switch(action.type)
    {
        case actions.LOGIN:
            return {
                ...state,
                user: action.payload.user,
                isLoggedIn : true
            };
        case actions.SAVE_USER:
            return {
                ...state,
                user: action.payload.user,
            };
        case actions.VIEW_BUS:
            return {
                ...state,
                bus: action.payload.bus,
            };        
        case actions.VIEW_DRIVER:
            return {
                ...state,
                drivers: action.payload.drivers,
            }; 
        case actions.VIEW_CONDUCTOR:
            return {
                ...state,
                conductors: action.payload.conductors,
            };        
        case actions.VIEW_STUDENT:
            return {
                ...state,
                students: action.payload.students,
            };
        case actions.VIEW_ADMIN:
            return {
                ...state,
                admins: action.payload.admins,
            };
        case actions.VIEW_SUBADMIN:
            return {
                ...state,
                subadmins: action.payload.subadmins,
            };    
        case actions.VIEW_ROUTE:
            return {
                ...state,
                routes: action.payload.routes,
            };    
        case actions.ADD_ADMIN:
            return {
                ...state,
                admins: [
                    ...state.admins,
                    action.payload.admin
                ],
            };    
        case actions.ADD_DRIVER:
            return {
                ...state,
                drivers: 
                [
                    ...state.drivers,
                    action.payload.driver
                ]
            };
        case actions.ADD_CONDUCTOR:
            return {
                ...state,
                conductors: 
                [
                    ...state.conductors,
                    action.payload.conductor
                ]
            };
        case actions.ADD_BUS:
            return {
                ...state,
                bus: 
                [
                    ...state.bus,
                    action.payload.bus
                ]
            };
        case actions.ADD_ROUTE:
            return {
                ...state,
                routes: 
                [
                    ...state.routes,
                    action.payload.route
                ]
            };
        // case actions.DELETE_DRIVER:
        //     return {
        //         // ...state,
        //         // drivers: 
        //         // [
        //         //     ...state.drivers,
        //         //     state.drivers.remove(action.payload.driver) 
        //         // ]
        //     };        
        case actions.LOGOUT:
            return {
                ...state,
                user:{},
                isLoggedIn : false,
            };
        default:
            return state
    }
}

export default reducer