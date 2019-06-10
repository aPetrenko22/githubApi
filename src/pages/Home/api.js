import axios from 'axios';

export const getUserInfo = searchValue => axios.get(`https://api.github.com/users/${searchValue}`);

export const getUserRepos = searchValue => axios.get(`https://api.github.com/users/${searchValue}/repos`);
