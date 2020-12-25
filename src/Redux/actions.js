import * as actions from './actionTypes'

export const countDrivers = (value) => ({
    type: actions.COUNT_DRIVERS,
    payload: {
        value,
    }
});

export const countConductors = (value) => ({
    type: actions.COUNT_CONDUCTORS,
    payload: {
        value,
    }
});

export const countStudents = (value) => ({
    type: actions.COUNT_STUDENTS,
    payload: {
        value,
    }
});

export const countBuses = (value) => ({
    type: actions.COUNT_BUSES,
    payload: {
        value,
    }
});

export const login = (user) => ({
    type: actions.LOGIN,
    payload: {
        user,
    }
});

export const saveUser = (user) => ({
    type: actions.SAVE_USER,
    payload: {
        user,
    }
});

export const viewBus = (bus) => ({
    type: actions.VIEW_BUS,
    payload:{
        bus,
    }
});

export const viewDriver = (driver) => ({
    type: actions.VIEW_DRIVER,
    payload: {
        drivers: driver,
    }
});

export const viewConductor = (conductor) => ({
    type: actions.VIEW_CONDUCTOR,
    payload:{
        conductors: conductor,
    }
});

export const viewStudent = (student) => ({
    type: actions.VIEW_STUDENT,
    payload: {
        students: student,
    }
});

export const viewAdmin = (admins) => ({
    type: actions.VIEW_ADMIN,
    payload: {
        admins,
    }
});

export const viewSubAdmin = (subadmins) => ({
    type: actions.VIEW_SUBADMIN,
    payload: {
        subadmins,
    }
});

export const viewRoute = (routes) => ({
    type: actions.VIEW_ROUTE,
    payload: {
        routes,
    }
});

export const viewStop = (stops) => ({
    type: actions.VIEW_STOP,
    payload: {
        stops,
    }
});

export const addAdmin = (admin) => ({
    type: actions.ADD_ADMIN,
    payload: {
        admin
    }
});

export const addSubAdmin = (subadmin) => ({
    type: actions.ADD_SUBADMIN,
    payload: {
        subadmin
    }
});

export const addDriver = (driver) => ({
    type: actions.ADD_DRIVER,
    payload: {
        driver
    }
});

export const addConductor = (conductor) => ({
    type: actions.ADD_CONDUCTOR,
    payload: {
        conductor
    }
});

export const addStudent = (student) => ({
    type: actions.ADD_STUDENT,
    payload: {
        student
    }
});

export const addBus = (bus) => ({
    type: actions.ADD_BUS,
    payload: {
        bus
    }
});

export const addRoute = (route) => ({
    type: actions.ADD_ROUTE,
    payload: {
        route
    }
});

export const addStop = (stop) => ({
    type: actions.ADD_STOP,
    payload: {
        stop
    }
});

export const addNotification = (notification) => ({
    type: actions.ADD_NOTIFICATION,
    payload: {
        notification
    }
});

export const viewNotification = (notifications) => ({
    type: actions.VIEW_NOTIFICATION,
    payload: {
        notifications
    }
});


export const updateDriver = (driver) => ({
    type: actions.UPDATE_DRIVER,
    payload: {
        driver
    }
});


export const logOut = (user) => ({
    type: actions.LOGOUT,
});






