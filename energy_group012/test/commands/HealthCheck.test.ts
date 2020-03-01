import {expect,test} from '@oclif/test'

describe ('HealthCheck', () => {
  test
   .stdout()
   .command(['HealthCheck'])
   .do(output => {
     let log = '{ "status": "ok" }'
     expect(output.stdout).to.contain(JSON.parse(log))
  })
   .it()
})
