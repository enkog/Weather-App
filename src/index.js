import _ from 'lodash';
import { DateTime } from './luxon.js';
import './style.css';

document.getElementById('date-time').textContent = DateTime.now().toLocaleString(DateTime.DATETIME_MED).toString();