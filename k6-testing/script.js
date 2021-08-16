import http from 'k6/http';
import { check, sleep } from 'k6';
import { getAll, getById, getRelated, getStyles } from './tests.js';

export let options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  // getStyles();
  getRelated();
  //getById();
  // getAll();
}

