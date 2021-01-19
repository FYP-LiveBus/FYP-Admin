import * as actions from './actionTypes';

export const countDrivers = value => ({
  type: actions.COUNT_DRIVERS,
  payload: {
    value
  }
});

export const countConductors = value => ({
  type: actions.COUNT_CONDUCTORS,
  payload: {
    value
  }
});

export const countStudents = value => ({
  type: actions.COUNT_STUDENTS,
  payload: {
    value
  }
});

export const countBuses = value => ({
  type: actions.COUNT_BUSES,
  payload: {
    value
  }
});

export const login = user => ({
  type: actions.LOGIN,
  payload: {
    user
  }
});

export const saveUser = user => ({
  type: actions.SAVE_USER,
  payload: {
    user
  }
});

export const viewBus = bus => ({
  type: actions.VIEW_BUS,
  payload: {
    bus
  }
});

export const viewDriver = driver => ({
  type: actions.VIEW_DRIVER,
  payload: {
    drivers: driver
  }
});

export const viewConductor = conductor => ({
  type: actions.VIEW_CONDUCTOR,
  payload: {
    conductors: conductor
  }
});

export const viewStudent = student => ({
  type: actions.VIEW_STUDENT,
  payload: {
    students: student
  }
});

export const viewAdmin = admins => ({
  type: actions.VIEW_ADMIN,
  payload: {
    admins
  }
});

export const viewSubAdmin = subadmins => ({
  type: actions.VIEW_SUBADMIN,
  payload: {
    subadmins
  }
});

export const viewRoute = routes => ({
  type: actions.VIEW_ROUTE,
  payload: {
    routes
  }
});

export const viewStop = stops => ({
  type: actions.VIEW_STOP,
  payload: {
    stops
  }
});

export const addAdmin = admin => ({
  type: actions.ADD_ADMIN,
  payload: {
    admin
  }
});

export const addSubAdmin = subadmin => ({
  type: actions.ADD_SUBADMIN,
  payload: {
    subadmin
  }
});

export const addDriver = driver => ({
  type: actions.ADD_DRIVER,
  payload: {
    driver
  }
});

export const addConductor = conductor => ({
  type: actions.ADD_CONDUCTOR,
  payload: {
    conductor
  }
});

export const addStudent = student => ({
  type: actions.ADD_STUDENT,
  payload: {
    student
  }
});

export const addBus = bus => ({
  type: actions.ADD_BUS,
  payload: {
    bus
  }
});

export const addRoute = route => ({
  type: actions.ADD_ROUTE,
  payload: {
    route
  }
});

export const addStop = stop => ({
  type: actions.ADD_STOP,
  payload: {
    stop
  }
});

export const addNotification = notification => ({
  type: actions.ADD_NOTIFICATION,
  payload: {
    notification
  }
});

export const viewNotification = notifications => ({
  type: actions.VIEW_NOTIFICATION,
  payload: {
    notifications
  }
});

export const viewFeedback = feedbacks => ({
  type: actions.VIEW_FEEDBACK,
  payload: {
    feedbacks
  }
});

export const viewTrips = trips => ({
  type: actions.VIEW_TRIPS,
  payload: {
    trips
  }
});

export const editBus = (bus, index) => ({
  type: actions.EDIT_BUS,
  payload: {
    bus,
    index
  }
});

export const editDriver = (driver, index) => ({
  type: actions.EDIT_DRIVER,
  payload: {
    driver,
    index
  }
});

export const editConductor = (conductor, index) => ({
  type: actions.EDIT_CONDUCTOR,
  payload: {
    conductor,
    index
  }
});

export const editRoute = (route, index) => ({
  type: actions.EDIT_ROUTE,
  payload: {
    route,
    index
  }
});

export const editStop = (stop, index) => ({
  type: actions.EDIT_STOP,
  payload: {
    stop,
    index
  }
});

export const editAdmin = (admin, index) => ({
  type: actions.EDIT_ADMIN,
  payload: {
    admin,
    index
  }
});

export const editSubAdmin = (subadmin, index) => ({
  type: actions.EDIT_SUBADMIN,
  payload: {
    subadmin,
    index
  }
});

export const deleteBus = bus => ({
  type: actions.DELETE_BUS,
  payload: {
    bus
  }
});

export const deleteStudent = student => ({
  type: actions.DELETE_STUDENT,
  payload: {
    student
  }
});

export const deleteDriver = driver => ({
  type: actions.DELETE_DRIVER,
  payload: {
    driver
  }
});

export const deleteConductor = conductor => ({
  type: actions.DELETE_CONDUCTOR,
  payload: {
    conductor
  }
});

export const deleteRoute = route => ({
  type: actions.DELETE_ROUTE,
  payload: {
    route
  }
});

export const deleteStop = stop => ({
  type: actions.DELETE_STOP,
  payload: {
    stop
  }
});

export const deleteAdmin = admin => ({
  type: actions.DELETE_ADMIN,
  payload: {
    admin
  }
});

export const deleteSubAdmin = subadmin => ({
  type: actions.DELETE_SUBADMIN,
  payload: {
    subadmin
  }
});

export const logOut = user => ({
  type: actions.LOGOUT
});
