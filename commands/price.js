import axios from 'axios'

export default async (event) => {
  try {
    const id = event.message.text.replace('', '')
    let oilPrice = ''
    let date = ''
    console.log(id)

    const { data } = await axios.get('https://vipmbr.cpc.com.tw/openData/MainProdListPrice')
    console.log(data.length)
    console.log(data[0].產品名稱)

    for (let i = 0; i < data.length; i++) {

      if (id === data[i].產品名稱) {
        console.log(data[i].產品名稱)
        oilPrice = data[i].參考牌價
        date = data[i].牌價生效日期
      }
    }
    console.log('查詢結束')

    console.log(oilPrice)
    event.reply(id + '-參考牌價: ' + oilPrice + '\u000A'+ '牌價生效日期' + date)
  } catch (error) {
    console.log(error)
  }
}
