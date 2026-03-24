module.exports = {
 PORT: process.env.PORT || 4000,
 DB: process.env.MONGODB || 'mongodb://127.0.0.1:27017/SD',
 SECRET: 'miclavesecretadetokens',
 TOKEN_EXP_TIME: 7*24*60 // 7 días expresados en minutos
}

