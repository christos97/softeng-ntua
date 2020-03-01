import {expect,test} from '@oclif/test'

describe ('Login', () => {
  test
   .stdout()
   .command(['Login', '--username','admin' ,'--passw','321nimda'])
   .do(output => expect(output.stdout).to.equal('Login Succesful\n') )
   .it()
})
