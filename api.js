import express from 'express';
const router = express.Router()
import Data from './data.js'
const data=new Data()
import axios from 'axios';

const responses ={
    CHUCK_NORRIS: {index:1,text:'chuck-norris-joke'},
    NUM_SUM: {index:2,text:'num-sum'},
    KANYE_WEST: {index:3,text:'kanye-quote'}
}

const getChuckJoke = async ()=> {
    const joke = await axios.get('https://api.chucknorris.io/jokes/random')
    return joke.data.value
}


const getKanyeQuote=async ()=>{
    const quote= await axios.get('https://api.kanye.rest')
    const result=JSON.stringify(quote.data)
    const index=result.indexOf(':')
    const slicedResult=result.substring(index+1,result.length-1)
    return slicedResult
}

const getNumSum=(name)=>{
    const aChar='a';
    let char=name[0].toLowerCase()
    let sum=char.charCodeAt(0)-aChar.charCodeAt(0)+1

   for(let i=1; i<name.length; i++)
   {
       char=name[i].toLowerCase()
       if(char===' '){
           continue
       }
       sum+=char.charCodeAt(0)-aChar.charCodeAt(0)+1
   }

   let result= "The letters in your name sum up to "
   result=result + sum;
   return result
}


const getResponse =  async (responseNumber,name)=>{
    switch (responseNumber){
        case responses.CHUCK_NORRIS.index:
           const joke = getChuckJoke();
            return joke;
        case responses.KANYE_WEST.index:
            const quote= getKanyeQuote();
            return quote;
        case responses.NUM_SUM.index:
           const sum=getNumSum(name);
           return sum;
        default: return undefined
    }
}

const randomInteger=(min, max)=> {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getDate=()=> {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    return {day,month}
}

const parseHistoryEvent = (eventsArr) => {
    const range=eventsArr.length
    const randomNum=randomInteger(0,range-1)
    return `Did you know? On this day: ${eventsArr[randomNum].text}`
}

const getHistoryEvent=async ()=>{
    const {day,month}=getDate()
    return await axios.get(`http://history.muffinlabs.com/date/${month}/${day}`)

}

router.get('/surprise', (req,res)=> {
    const name = req.query.name
    const birth_year = req.query.birth_year;

    if (!name) {
        res.status(400).send('Please enter a name')
    }
    if (!birth_year) {
        res.status(400).send('Please enter a birth year')
    }

    const firstLetter = name.substring(0, 1)
    data.updateCount(0)

    if (birth_year <= 2000 && firstLetter == 'Q') {
        data.updateCount(1)
        getResponse(responses.CHUCK_NORRIS, name)
            .then(result => {
                getHistoryEvent().then(response2 => {
                    if (response2?.data?.data?.Events) {
                        res.status(200).json({
                            type: responses.CHUCK_NORRIS.text,
                            result,
                            HistoricalEvent: parseHistoryEvent(response2.data.data.Events)
                        })
                    }
                })
            })
    }
    else if (birth_year <= 2000 && firstLetter != 'Q') {
        const num = randomInteger(responses.CHUCK_NORRIS.index, responses.NUM_SUM.index)
        let type
        if (num === 1) {
            data.updateCount(1)
            type=responses.CHUCK_NORRIS.text
        } else {
            data.updateCount(2)
            type=responses.NUM_SUM.text
        }
        getResponse(num, name)
            .then(result => {
                getHistoryEvent().then(response2 => {
                    if (response2?.data?.data?.Events) {
                        res.status(200).json({
                            type: type,
                            result,
                            HistoricalEvent: parseHistoryEvent(response2.data.data.Events)
                        })
                    }
                })
            })
    }
    else if (birth_year > 2000 && firstLetter != 'A' && firstLetter != 'Z' && firstLetter != 'Q') {
        const num = randomInteger(responses.NUM_SUM.index, responses.KANYE_WEST.index)
        let type
        if (num === 3) {
            data.updateCount(3)
            type=responses.KANYE_WEST.text
        } else {
            data.updateCount(2)
            type=responses.NUM_SUM.text
        }
        getResponse(num, name)
            .then(result => {
                getHistoryEvent().then(response2 => {
                    if (response2?.data?.data?.Events) {
                        res.status(200).json({
                            type: type,
                            result,
                            HistoricalEvent: parseHistoryEvent(response2.data.data.Events)
                        })
                    }
                })
            })
    }
    else if (birth_year > 2000 && firstLetter != 'A' && firstLetter != 'Z' && firstLetter == 'Q') {
        data.updateCount(3)
        getResponse(responses.KANYE_WEST, name)
            .then(result => {
                getHistoryEvent().then(response2 => {
                    if (response2?.data?.data?.Events) {
                        res.status(200).json({
                            type: responses.KANYE_WEST.text,
                            result,
                            HistoricalEvent: parseHistoryEvent(response2.data.data.Events)
                        })
                    }
                })
            })
    }
    else if ((birth_year > 2000 && firstLetter == 'A') || (birth_year > 2000 && firstLetter == 'Z')) {
        data.updateCount(2)
        getResponse(responses.NUM_SUM, name)
            .then(result => {
                getHistoryEvent().then(response2 => {
                    if (response2?.data?.data?.Events) {
                        res.status(200).json({
                            type: responses.NUM_SUM.text,
                            result,
                            HistoricalEvent: parseHistoryEvent(response2.data.data.Events)
                        })
                    }
                })
            })
    }
})

router.get('/stats', (req,res)=>{
    if(data.getRequests()===0) {
        res.status(200).json({
            "requests": data.getRequests(),
            "distribution": []
        })
    }

    else {
        res.status(200).json({
            "requests": data.getRequests(),
            "distribution": [
                {
                    "type": "chuck-norris-joke",
                    "count": data.getChuck()
                },
                {
                    "type": "kanye-quote",
                    "count": data.getKanye()
                },
                {
                    "type": "name-sum",
                    "count": data.getSum()
                }
            ]


        })
    }
})

export default router;