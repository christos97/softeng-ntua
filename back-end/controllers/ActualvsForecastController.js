const Querries = require('../Querries/ActualvsForecastQuerries')
const {Parser}           =  require('json2csv')


exports.GetDate =(req,res,next)=>{

if( (/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(req.params._date_str)) == false ){
  return res.status(400).json({" Bad request":"Date should be in YYYY-MM-DD format" })}

    let _date_str = req.params._date_str.split("-")
    let _Year =  _date_str[0]
    let _Month = _date_str[1]
    let _Day =   _date_str[2]
    if( (!_Month) || ( !_Day)){
      return res.status(400).json({"Error 400":"Bad request" })
    }
    if (_Day[0] == 0 ) _Day = _Day[1]
    if(_Month[0] == 0) _Month = _Month[1]
    let _AreaName = req.params._AreaName
    let _Resolution=req.params._Resolution

    
    console.log(_Year,_Month,_Day)

          let collection = db.collection('DayAheadTotalLoadForecast')
          const agg = Querries.Get_Date_Querry(_AreaName,_Resolution,_Year,_Month,_Day)
          let cursor = collection.aggregate(agg)
    
/* send a csv response here */
    if(req.query.format=='csv'){
      res.setHeader('Content-Type', 'text/csv');
      //res.setHeader('Content-Disposition', 'attachment; filename=\"' + 'download-' + Date.now() + '.csv\"');
     
      let fields = ['Source', 'Dataset','AreaName',"AreaTypeCode","MapCode","ResolutionCode","Year",
                  "Month","Day","DateTimeUTC","DayAheadTotalLoadForecastValue","ActualTotalLoadValue"];//all field names
      
     let json2csvParser = new Parser({ fields });

      cursor.toArray((error, result) => {
        if(result.length==0) {
          return res.status(403).send('Error 403 : No data')} 
        res.send(json2csvParser.parse(result));
    });
  }   
/* JSON response here*/
  else{ // format will be json or undefined or random string
        res.setHeader('Content-Type', 'application/json');
        cursor.toArray((error, result) => {
          if(result.length==0) {
            return res.status(403).json({
                error:'Error 403 : No data'
                });
            } 
          res.send(result);
  });
}
}
    
      

    exports.GetMonth = (req, res) => {
        

        const _AreaName=req.params.AreaName
        const _Resolution=req.params.Resolution
        let _date_str = req.params._date_str.split("-")
        let _Year =  _date_str[0]
        let _Month = _date_str[1]
        if( !_Month){
          return res.status(400).json({"Error 400":"Bad request" })
        }
        if(_Month[0] == 0) _Month = _Month[1]

      
            let collection = db.collection('DayAheadTotalLoadForecast')
            const agg = Querries.Get_Month_Querry(_AreaName,_Resolution,_Year,_Month)

      
            let cursor = collection.aggregate(agg)
      
  /* send a csv response here */
        if(req.query.format=='csv'){
          res.setHeader('Content-Type', 'text/csv');
        
          let fields = ['Source', 'Dataset','AreaName',"AreaTypeCode","MapCode","ResolutionCode","Year",
                      "Month","Day","DayAheadTotalLoadForecastByDayValue","ActualTotalLoadByDayValue"];//all field names
          
        let json2csvParser = new Parser({ fields });

          cursor.toArray((error, result) => {
            if(result.length==0) {
              return res.status(403).send('Error 403 : No data')} 
            res.send(json2csvParser.parse(result));
        });
        }   
  /* JSON response here*/
        else{ // format will be json or undefined or random string
        res.setHeader('Content-Type', 'application/json');
        cursor.toArray((error, result) => {
          if(result.length==0) {
            return res.status(403).json({
                error:'Error 403 : No data'
                });
            } 
          res.send(result);
        });
    }
}


    exports.GetYear = (req, res) => {
       
      const _Year =req.params._Year
       if (_Year.length > 4 ) return res.status(400).send()

        const _AreaName=req.params.AreaName
        const _Resolution=req.params.Resolution      
        const collection = db.collection('DayAheadTotalLoadForecast')
        const agg = Querries.Get_Year_Querry(_AreaName,_Resolution,_Year)
        const cursor = collection.aggregate(agg)
      
        /* send a csv response here */
        if(req.query.format=='csv'){
          res.setHeader('Content-Type', 'text/csv');
          //res.setHeader('Content-Disposition', 'attachment; filename=\"' + 'download-' + Date.now() + '.csv\"');
        
          let fields = ['Source', 'Dataset','AreaName',"AreaTypeCode","MapCode","ResolutionCode","Year",
          "Month","Day","DayAheadTotalLoadForecastByMonthValue","ActualTotalLoadByMonthValue"];//all field names
          
        let json2csvParser = new Parser({ fields });

          cursor.toArray((error, result) => {
            if(result.length==0) {
                return res.status(403).send('Error 403 : No data')} 
            res.send(json2csvParser.parse(result));
        });
        }   
        /* JSON response here*/
        else{ // format will be json or undefined or random string
        res.setHeader('Content-Type', 'application/json');
        cursor.toArray((error, result) => {
          if(result.length==0) {
            return res.status(403).json({
                error:'Error 403 : No data'
                });
            } 
          res.send(result);
        });
        }
}