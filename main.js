const TeleBot = require("node-telegram-bot-api")

const api = "6851344969:AAHvyVFNGhD8eAk_xfz11lNWLhjulKy00YE"
const option = {
    polling: true
}

const bmzbot = new TeleBot(api, option) 

const prefix = "/"

const start = new RegExp(`^${prefix}gempa$`)


bmzbot.onText(start, async(callback) => {
    const apiBMKG = "https://data.bmkg.go.id/DataMKG/TEWS/"

    const apiCall = await fetch(apiBMKG + "autogempa.json")
    const {Infogempa: { 
               gempa: {
                    Jam, Magnitude, Tanggal, Wilayah, Kedalaman, Shakemap, Coordinates, Lintang, Bujur
               }
            }
        } = await apiCall.json()

    const imgBMKG = apiBMKG + Shakemap

    const resultText = `
Waktu: ${Tanggal} | ${Jam}
Kuat : ${Magnitude} SR
Koordinat : ${Coordinates} | ${Lintang} | ${Bujur}  
Wilayah : ${Wilayah} 
Kedalaman: ${Kedalaman}
`

    bmzbot.sendPhoto(callback.from.id, imgBMKG, {
        caption: resultText
    })

})