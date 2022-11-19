export const CONTRACT_ADDRESS = '0xf5AFf55ce40adbDF9cE93A7420Eb241C67aa2817'

export const CONTRACT_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"string","name":"content","type":"string"},{"indexed":true,"internalType":"string","name":"tag","type":"string"}],"name":"NewPost","type":"event"},{"constant":true,"inputs":[],"name":"count","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"content","type":"string"},{"internalType":"string","name":"tag","type":"string"}],"name":"post","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"posts","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"user","type":"address"},{"internalType":"string","name":"content","type":"string"},{"internalType":"string","name":"tag","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]