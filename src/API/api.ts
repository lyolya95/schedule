import Axios from 'axios';

const instance = Axios.create({
  baseURL: 'https://rs-react-schedule.firebaseapp.com/api/team/44/',
});

export const scheduleAPI = {
  getDataEvents() {
    return instance.get('events').then((response) => {
      return response.data.data;
    });
  },
  getDataOrganizers() {
    return instance.get('organizers').then((response) => {
      return response.data.data;
    });
  },
};
