import 'dotenv/config'
import place from './commands/place.js'
// import price from './commands/price.js'
import linebot from 'linebot'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', (event) => {
  if (process.env.DEBUG === 'true') {
    console.log(event)
  }
  if (event.message.type === 'location') {
    console.log('postback查詢')
    event.reply({
      type: 'text',
      text: '請點擊"開始查詢"',
      quickReply: {
        items: [
          {
            type: 'action',
            action: {
              type: 'postback',
              label: '開始查詢',
              data: `${event.message.latitude},${event.message.longitude}`
            }
          }
        ]
      }
    })
  } else if (event.message.text === '直營加油站查詢') {
    console.log('訊息查詢')
    event.reply({
      type: 'text',
      text: '請提供位置訊息',
      quickReply: {
        items: [
          {
            type: 'action',
            action: {
              type: 'location',
              label: '按我提供位置'
            }
          }
        ]
      }
    })
  }
})

bot.on('postback', (event) => {
  if (process.env.DEBUG === 'true') {
    console.log(event)
  }
  // const data = event.postback.label.split(',')
  // if (data === '中油直營加油站') {
  place(event)
  console.log('開始計算')
  // }
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
