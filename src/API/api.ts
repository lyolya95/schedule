import Axios from 'axios';

const instance = Axios.create({
  baseURL: 'https://rs-react-schedule.firebaseapp.com/api/team/44/',
});

export const scheduleAPI = {
  getDataEvents() {
    return instance.get('events').then((respons) => {
      return respons.data.data;
    });
  },
  getDataOrganizers() {
    return instance.get('organizers').then((respons) => {
      return respons.data.data;
    });
  },
};
