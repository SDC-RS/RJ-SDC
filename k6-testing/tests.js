import http from 'k6/http';
import { check, sleep } from 'k6';

exports.getRelated =  function () {
  let res = http.get('http://localhost:3020/products/1/related');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}

exports.getById  = function () {
  let res = http.get('http://localhost:3020/products/1/');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}

exports.getStyles = function () {
  let res = http.get('http://localhost:3020/products/1/styles');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}

exports.getAll = function () {
  let res = http.get('http://localhost:3020/products/');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}