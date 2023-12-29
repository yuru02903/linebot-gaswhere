import axios from 'axios'
// import fs from 'node:fs'

export default async (event) => {
  try {
    const { data } = await axios.get('https://vipmbr.cpc.com.tw/openData/SixtypeOilListPrice')
    console.log(data.length)
    // fs.writeFileSync('./gasPrice.json', JSON.stringify(data2, null, 2))
  } catch (error) {
    console.log(error)
  }
}
