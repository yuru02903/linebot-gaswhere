import 'dotenv/config'
import place from './commands/place.js'
import price from './commands/price.js'
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
  } else if (event.message.type === 'text') {
    if (event.message.text === '直營加油站查詢') {
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
    } else if (event.message.text === '油價查詢') {
      console.log('油價查詢')
      event.reply({
        type: 'text',
        text: '請選擇欲查詢的項目',
        quickReply: {
          items: [
            {
              type: 'action',
              action: {
                // 傳訊息
                type: 'message',
                // 傳送的文字
                text: '98無鉛汽油',
                // 按鈕的文字
                label: '98無鉛汽油'
              }
            },
            {
              type: 'action',
              action: {
                // 傳訊息
                type: 'message',
                // 傳送的文字
                text: '95無鉛汽油',
                // 按鈕的文字
                label: '95無鉛汽油'
              }
            },
            {
              type: 'action',
              action: {
                // 傳訊息
                type: 'message',
                // 傳送的文字
                text: '92無鉛汽油',
                // 按鈕的文字
                label: '92無鉛汽油'
              }
            },
            {
              type: 'action',
              action: {
                // 傳訊息
                type: 'message',
                // 傳送的文字
                text: '超級柴油',
                // 按鈕的文字
                label: '超級柴油'
              }
            },
            {
              type: 'action',
              action: {
                // 傳訊息
                type: 'message',
                // 傳送的文字
                text: '酒精汽油',
                // 按鈕的文字
                label: '酒精汽油'
              }
            }
          ]
        }
      })
    } else if (event.message.text === '98無鉛汽油') {
      price(event)
    } else if (event.message.text === '95無鉛汽油') {
      price(event)
    } else if (event.message.text === '92無鉛汽油') {
      price(event)
    } else if (event.message.text === '超級柴油') {
      price(event)
    } else if (event.message.text === '酒精汽油') {
      price(event)
    }
  }
})

bot.on('postback', (event) => {
  if (process.env.DEBUG === 'true') {
    console.log(event)
  }
  place(event)
  console.log('開始計算')
  // }
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
