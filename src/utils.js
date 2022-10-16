export const START_RENT = "book";
export const PRICE_INFO = "price";
export const END_RENT = "end_rent";
export const SHOW_LOCATION = "show_location";
export const AVAILABLE = "availability";

export const makeApiCall = async (path="",data={},methodType="GET", isAiCall = true)=>{
    const url= isAiCall?`http://52.20.176.178:5005/model/parse`:`https://chatbot-runtime-terror.herokuapp.com${path}`;
    const response = await fetch(url, {
        method: methodType, // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        
        ...(methodType === 'GET'?{}:{ body: JSON.stringify(data)}) // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
}


export const typeOfIntent = (intentObject={})=>{
   const intent = intentObject?.intent?.name || '';
   switch(intent){
     case START_RENT:{
        return {isAPICall:false,api:'',method:'',value:"for which dates?"};
     }
     case PRICE_INFO:{
        return {isAPICall:false,api:'',method:'',value:'$ 20/day'};
     }
     case END_RENT:{
        return {isAPICall:true,api:'',method:'',value:'Subscription Ended'};
     }
     case SHOW_LOCATION:{
        return {isAPICall:false,api:'',method:'',value:'Seventh Street, JP Nagar, Bengaluru - 560025'};
     }
     case AVAILABLE:{
      const {from='',to=''}  = intentObject?.entities[0]?.value || {};
      return {isAPICall:true,api:'/checkBooking',method:'POST',value:'',data:{from:from.split('T')[0],to:to.split('T')[0]}};
     }
     default:{
        return {isAPICall:false,api:'', method:'', value:'Unable to understand Query, Please Try again'};
     }
   } 
   
}
