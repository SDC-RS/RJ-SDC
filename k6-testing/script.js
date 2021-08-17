import http from 'k6/http';
import { check, sleep } from 'k6';
import { getAll, getById, getRelated, getStyles } from './tests.js';

export let options = {
  vus: 1,
  duration: '10s',
};

export default function () {
  getStyles();
  getRelated();
  getById();
  getAll();
}

