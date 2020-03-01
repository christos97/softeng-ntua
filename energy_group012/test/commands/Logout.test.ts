import {expect,test} from '@oclif/test'

describe ('Logout', () => {
  test
   .stdout()
   .command(['Logout'])
   .do(output => {
      expect(output.stdout).to.equal('Logout Succesful\n')
   })
   .it()
})
