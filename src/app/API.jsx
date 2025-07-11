import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.iconify.design/'
})



export const getData = async () => {
    return api.get('/collection?prefix=fluent-emoji-flat')
}



export const getSvg = async (iconName) => {
  return api.get(`/fluent-emoji-flat/${iconName}.svg`, {
    responseType: 'text', // This is the key!
  });
};