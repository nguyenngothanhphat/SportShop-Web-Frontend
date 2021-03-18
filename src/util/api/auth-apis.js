import axios from "axios";
import {API} from '../../config';

export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    `${API}/api/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
