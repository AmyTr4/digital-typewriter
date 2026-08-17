const stage = document.getElementById('stage');
const receipt = document.getElementById('receipt');
const printBtn = document.getElementById('printBtn');
const printerText = document.querySelector('.printer-text');
const receiptDate = document.getElementById('receiptDate');

const eventsList = document.getElementById('eventsList');
const todosList = document.getElementById('todosList');

const randomItem = (arr)=> arr[Math.floor(Math.random() * arr.length)]
