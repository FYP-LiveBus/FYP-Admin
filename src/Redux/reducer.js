import * as actions from './actionTypes';

const initialState = {
  totalNoOfDrivers: 0,
  totalNoOfConductors: 0,
  totalNoOfStudents: 0,
  totalNoOfBuses: 0,
  currentUser: localStorage.getItem('token'),
  isLoggedIn: false,
  user: {},
  drivers: [],
  students: [],
  bus: [],
  conductors: [],
  routes: [],
  stops: [],
  admins: [],
  subadmins: [],
  notifications: [],
  trips: [],
  feedbacks: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.COUNT_DRIVERS:
      return { ...state, totalNoOfDrivers: action.payload.value };
    case actions.COUNT_CONDUCTORS:
      return { ...state, totalNoOfConductors: action.payload.value };
    case actions.COUNT_STUDENTS:
      return { ...state, totalNoOfStudents: action.payload.value };
    case actions.COUNT_BUSES:
      return { ...state, totalNoOfBuses: action.payload.value };
    case actions.LOGIN:
      return { ...state, user: action.payload.user, isLoggedIn: true };
    case actions.SAVE_USER:
      return { ...state, user: action.payload.user };
    case actions.VIEW_BUS:
      return { ...state, bus: action.payload.bus };
    case actions.VIEW_DRIVER:
      return { ...state, drivers: action.payload.drivers };
    case actions.VIEW_CONDUCTOR:
      return { ...state, conductors: action.payload.conductors };
    case actions.VIEW_STUDENT:
      return { ...state, students: action.payload.students };
    case actions.VIEW_ADMIN:
      return { ...state, admins: action.payload.admins };
    case actions.VIEW_SUBADMIN:
      return { ...state, subadmins: action.payload.subadmins };
    case actions.VIEW_ROUTE:
      return { ...state, routes: action.payload.routes };
    case actions.VIEW_STOP:
      return { ...state, stops: action.payload.stops };
    case actions.VIEW_TRIPS:
      return { ...state, trips: action.payload.trips };
    case actions.ADD_ADMIN:
      return { ...state, admins: [...state.admins, action.payload.admin] };
    case actions.ADD_SUBADMIN:
      return {
        ...state,
        subadmins: [...state.subadmins, action.payload.subadmin]
      };
    case actions.ADD_DRIVER:
      return { ...state, drivers: [...state.drivers, action.payload.driver] };
    case actions.ADD_CONDUCTOR:
      return {
        ...state,
        conductors: [...state.conductors, action.payload.conductor]
      };
    case actions.ADD_STUDENT:
      return {
        ...state,
        students: [...state.students, action.payload.student]
      };
    case actions.ADD_BUS:
      return { ...state, bus: [...state.bus, action.payload.bus] };
    case actions.ADD_ROUTE:
      return { ...state, routes: [...state.routes, action.payload.route] };
    case actions.ADD_STOP:
      return { ...state, stops: [...state.stops, action.payload.stop] };
    case actions.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload.notification]
      };
    case actions.VIEW_NOTIFICATION:
      return {
        ...state,
        notifications: action.payload.notifications.reverse()
      };
    case actions.VIEW_FEEDBACK:
      return { ...state, feedbacks: action.payload.feedbacks };
    case actions.UPDATE_DRIVER:
      return { ...state, drivers: [...state.drivers, action.payload.driver] };
    case actions.LOGOUT:
      return { ...state, user: {}, isLoggedIn: false };
    default:
      return state;
  }
};

export default reducer;
