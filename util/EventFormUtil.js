import toString from 'lodash/toString'
import isDate from 'lodash/isDate'
import includes from 'lodash/includes'
import fp from 'lodash/fp'
import moment from 'moment'

// Merge date and time object into one unified date object
const mergeDateAndTime = (date, time) => {
  date = moment(date.toISOString());
	time = moment(time.toISOString());
	let dateTime = date.add(time.hours(), 'hours');
	dateTime = date.add(time.minutes(), 'minutes');
	return dateTime.toISOString();
}

// Validate form data. Returns true if form is valid
export const validateFormData = (event, adminGuild) => {

  // Validate name
  if( toString(event.name).length < 1 ) {
    alert('You must enter a name')
    return false;
  }

  // Validate startDate
  if( !isDate(event.startDate) ) {
    alert('You must enter a start date')
    return false;
  }

  // Validate startTime
  if( !isDate(event.startTime) ) {
    alert('You must enter a start time')
    return false;
  }

  // Validate endDate
  if( !isDate(event.endDate) ) {
    alert('You must enter an end date')
    return false;
  }

  // Validate endTime
  if( !isDate(event.endTime) ) {
    alert('You must enter an end time')
    return false;
  }

  // Validate guilds
  if( !includes(event.guilds, adminGuild._id) ) {
    alert('You must enter your own guild')
    return false
  }

  return true
}

// Converts the Event form data to an Event Object
export const convertToEventObject = (event) => {
  const convertObject = fp.flow(
    fp.omit([ 'startTime', 'endTime' ]),
    fp.set('startDate', mergeDateAndTime(event.startDate, event.startTime)),
    fp.set('endDate', mergeDateAndTime(event.endDate, event.endTime))
  )
  return convertObject(event)
}

// Unpopulates an event object. Use this prior to loading the EventForm with data
export const unpopulateEventObject = (event) => {
  const replaceWithIds = fp.map(guild => guild._id)
  event.guilds = replaceWithIds(event.guilds)
  event.owner = event.owner._id
  return event
}
