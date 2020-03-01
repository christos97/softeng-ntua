const fs = require('fs')

exports.add_csv = (req,res ) => {

  let collection  = db.collection(req.params.collection)
  let jsonArray = req.body
  let jsonChunks =[]
  let totalRecordsInFile = jsonArray.length
  let dbInfoPath = '../back-end/config/totalRecordsImported.txt'
  while(jsonArray.length > 0){
    jsonChunks.push(jsonArray.splice(0,1500))  
  }

  //Bulk Onordered Insert
  for (let chunk in jsonChunks){
    collection.insertMany(jsonChunks[chunk],{ordered: false})
  }
  
  let totalDocsImported = fs.readFileSync(dbInfoPath,'utf-8')
  let totalRecordsImported = Number(totalDocsImported)
  totalRecordsImported += totalRecordsInFile
  fs.writeFileSync(dbInfoPath,totalRecordsImported ,'utf-8')
  
  return res.status(200).json(
    {
      'totalRecordsInFile' : totalRecordsInFile,
      'totalRecordsImported' : totalRecordsImported
    }
  )
}
