import { connect } from 'react-redux';
import App from './App.jsx';
import { getAllEvents } from '../../actions/EventActions';
import { viewEventDetails } from '../../actions/EventDetailViewActions'
import { getAllGuilds } from '../../actions/GuildActions';
import { handleGuildClick } from '../../actions/ActiveGuildsActions';
import { openAddEventForm } from '../../actions/AddEventViewActions'
import values from 'lodash/values';
import { getVisibleEvents, getCurrentEvent } from '../../store/selectors/EventsSelector'

const mapStateToProps = (state) => {
	return {
    events: getVisibleEvents(state),
		guilds: values(state.data.guilds),
		activeGuilds: state.activeGuilds,
		user: state.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    openAddEventForm: () => {
      dispatch(openAddEventForm())
    },
		getAllEvents: () => {
			dispatch(getAllEvents());
		},
		getAllGuilds: () => {
			dispatch(getAllGuilds());
		},
		handleGuildClick: (guild) => {
			dispatch(handleGuildClick(guild));
		},
    viewEventDetails: (event) => {
      dispatch(viewEventDetails(event._id));
    }
	}
}

const VisibleApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default VisibleApp
