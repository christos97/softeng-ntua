import {expect,test} from '@oclif/test'

describe ('Admin --newuser', () => {
  test
   .stderr()
   .command([
      'Admin', '--newuser','test1' ,
      '--passw','test','--email', 'test@test.com', '--quota', '20'
    ])
   .do(output => expect(output.stderr).to.equal('Error 401 : Authorization Failed\n') )
   .it()
})
