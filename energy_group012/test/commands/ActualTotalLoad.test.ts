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
   .command(['ActualTotalLoad', '--area','Greece' ,'--timeres','test'])
   .do(output => expect(output.stdout).to.equal('Login Succesful\n') )
   .it()
})
