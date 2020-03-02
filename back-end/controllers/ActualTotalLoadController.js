const ActualLoadQuerries =  require('../Querries/ActualLoadQuerries');
const {Parser}           =  require('json2csv')

exports.GetDate= (req, res) => {
  if( (/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(req.params._date_str)) == false ){
    return res.status(400).json({"Bad request":"Date should be in YYYY-MM-DD format" })}
    let _AreaName   = req.params.AreaName
    let _Resolution = req.params.Resolution 
    let _date_str   = req.params._date_str.split("-")
    let _Year       = _date_str[0]
    let _Month      = _date_str[1]
    let _Day        = _date_str[2] 
    if (_Day[0] == 0 ) _Day = _Day[1]
    if(_Month[0] == 0) _Month = _Month[1]
    let collection  = db.collection('ActualTotalLoad')
    let agg         = ActualLoadQuerries.Get_Date_Querry(_AreaName,_Resolution,_Year,_Month,_Day)
    let cursor      = collection.aggregate(agg)
    let format      = req.query.format

    if(!format){ format = 'json' }

    /* send a csv response here */
    if(format =='csv'){  
        res.setHeader('Content-Type', 'text/csv');       
        let fields = ['Source', 'Dataset','AreaName',"AreaTypeCode","MapCode","ResolutionCode","Year",
                    "Month","Day","DateTimeUTC","ActualTotalLoadValue","UpdateTimeUTC"];//all field names
        
       let json2csvParser = new Parser({ fields });

        cursor.toArray((error, result) => {
          if(result.length==0) {
            return res.status(403).send('Error 403 : No data')} 
          res.send(json2csvParser.parse(result));
      });
    }   
/* JSON response here*/
    else{ // format will be equal to json or undefined or random string
      res.setHeader('Content-Type', 'application/json');
      cursor.toArray((error, result) => {
        //console.log(result)

        if(result.length==0) {
          return res.status(403).send('Error 403 : No data')} 
        res.send(result);
    });
  }
}

  exports.GetCurrentDate=(req, res) => {
   
      let _AreaName  = req.params.AreaName
      let _Resolution= req.params.Resolution
      let dateObj   =  new Date();
      let _Year     =  dateObj.getUTCFullYear();
      let _Month    =  dateObj.getUTCMonth() + 1; //months from 1-12
      let _Day      =  dateObj.getUTCDate();
      if (_Day[0] == 0 ) _Day = _Day[1]
      if(_Month[0] == 0) _Month = _Month[1]
    
     
          let collection = db.collection('ActualTotalLoad')
          const agg = ActualLoadQuerries.Get_Date_Querry(_AreaName,_Resolution,_Year,_Month,_Day)
          let cursor = collection.aggregate(agg)
    
/* send a csv response here */
    if(req.query.format=='csv'){
      res.setHeader('Content-Type', 'text/csv');
     
      let fields = ['Source', 'Dataset','AreaName',"AreaTypeCode","MapCode","ResolutionCode","Year",
                  "Month","Day","DateTimeUTC","ActualTotalLoadValue","UpdateTimeUTC"];//all field names
      
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
      console.log(result)
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
   
  if( (/([12]\d{3}-(0[1-9]|1[0-2]))/.test(req.params._date_str)) == false ){
    return res.status(400).json({" Bad request":"Date should be in YYYY-MM format" })}
    
    let _date_str   = req.params._date_str.split("-")
    let _Year       = _date_str[0]
    let _Month      = _date_str[1]
    let _AreaName   = req.params.AreaName
    let _Resolution = req.params.Resolution
    if(_Month[0] == 0) _Month = _Month[1]
    
    let collection  = db.collection('ActualTotalLoad')
    let agg         = ActualLoadQuerries.Get_Month_Querry(_AreaName,_Resolution,_Year,_Month)
    let cursor      = collection.aggregate(agg)
    
/* send a csv response here */
    if(req.query.format=='csv'){
      res.setHeader('Content-Type', 'text/csv');
      
      let fields = ['Source', 'Dataset','AreaName',"AreaTypeCode","MapCode","ResolutionCode","Year",
                  "Month","Day","ActualTotalLoadByDayValue"];//all field names
      
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
        return res.status(403).json({'Error 403' : 'No data'})} 
      res.send(result);
      });
    }
}

  


  exports.GetYear = (req, res) => {
 
    const _Year = req.params.Year
    
    if (_Year.length > 4 ) return res.status(400).send()
    const _AreaName=req.params.AreaName
    const _Resolution=req.params.Resolution
    const collection = db.collection('ActualTotalLoad')
    const agg = ActualLoadQuerries.Get_Year_Querry(_AreaName,_Resolution,_Year)
    const cursor = collection.aggregate(agg)
  
 /* send a csv response here */
      if(req.query.format=='csv'){
        res.setHeader('Content-Type', 'text/csv');
        
        let fields = ['Source', 'Dataset','AreaName',"AreaTypeCode","MapCode","ResolutionCode","Year",
                    "Month","ActualTotalLoadByMonthValue"];//all field names
        
        let json2csvParser = new Parser({ fields });

        cursor.toArray((error, result) => {
          if(result.length==0) {
            return res.status(403).json({
                error:'Error 403 : No data'
                });
            } 
          res.send(json2csvParser.parse(result));
      });
      }   
/* JSON response here*/
      else{ // format will be json or undefined or random string
      res.setHeader('Content-Type', 'application/json');
      console.log(cursor)
      cursor.toArray((error, result) => {
        if(result.length==0) {
          return res.status(403).send('Error 403 : No data')} 
        res.send(result);
        });
      }
}