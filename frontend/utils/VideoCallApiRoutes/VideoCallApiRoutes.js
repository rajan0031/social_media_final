// here we are defining the host of the main api
export const host = 'http://localhost:8080';


// api routes for the sending the video call requests to the database 


export const registerCallRequest = `${host}/registercallrequest`;

// api for getting all the call logs /// meanings all callls which have been done by me 

export const allCallLogs = `${host}/allcalllogs`;

// api routes for getting all the videocalls that is not done done by the local storage user but done by the others

export const allCallLogsFromOthers = `${host}/allcalllogsfromothers`;

// api routes for the deleting the call logs from your recent sections

export const deleteRecentCallLogs = `${host}/deleterecentcalllogs`;








