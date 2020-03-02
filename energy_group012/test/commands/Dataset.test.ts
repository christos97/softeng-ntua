import {expect,test} from '@oclif/test'

describe ('Login', () => {
  test
   .stdout()
   .command(['Login', '--username','test' ,'--passw','test'])
   .do(output => expect(output.stdout).to.equal('Login Succesful\n') )
   .it()
})

describe ('ActualTotalLoad', () => {
  test
   .stdout()
   .command(['ActualTotalLoad', '--area','Germany' ,'--timeres','PT15M', '--date', '2018'])
   .do(output => {
      let log = '{"Source": "entso-e","Dataset": "ActualTotalLoad","AreaName": "Germany","AreaTypeCode": "CTY","MapCode": "DE","ResolutionCode": "PT15M","Year": "2018","Month": "1","ActualTotalLoadByMonthValue": "50502360.68"}'
      expect(output.stdout).to.contain(JSON.parse(log))
   })
   .it()
})

describe ('AggregatedGenerationPerType', () => {
  test
   .stdout()
   .command(['AggregatedGenerationPerType', '--area','Germany' ,'--timeres','PT15M', '--date', '2018','--prodtype','Waste'])
   .do(output => {
      let log = '{"Source": "entso-e","Dataset": "AggregatedGenerationPerType","AreaName": "Germany","AreaTypeCode": "CTY","MapCode": "DE","ResolutionCode": "PT15M","Year": 2018,"Month": 1,"ProductionType": "Waste","ActualGenerationOutputByMonthValue": 538547.45}'
      expect(output.stdout).to.contain(JSON.parse(log))
   })
   .it()
})

describe ('DayAheadTotalLoadForecast', () => {
  test
   .stdout()
   .command(['DayAheadTotalLoadForecast', '--area','Germany' ,'--timeres','PT15M', '--date', '2018'])
   .do(output => {
      let log = '{"Source": "entso-e","Dataset": "DayAheadTotalLoadForecast","AreaName": "Germany","AreaTypeCode": "CTY","MapCode": "DE","ResolutionCode": "PT15M","Year": 2018,"Month": 1,"DayAheadTotalLoadForecastByMonthValue": 48247498.13}'
      expect(output.stdout).to.contain(JSON.parse(log))
   })
   .it()
})
